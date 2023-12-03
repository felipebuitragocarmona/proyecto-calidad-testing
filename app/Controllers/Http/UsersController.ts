import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role';
import User from 'App/Models/User';
import UserValidator from 'App/Validators/UserValidator';
import { validator, schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
    public async login({ request, ally, response }, ctx: HttpContextContract) {
        try {
            let token = request.request.headers.authorization.replace("Bearer ", "")
            const userBody = await ally.use('google').userFromToken(token)
            let theUsers: User[] = await User.query().where('email', userBody.email)
            if (theUsers.length == 0) {
                return this.createUser(response, userBody, ctx);
            } else {
                let theUser: User = theUsers[0];
                await theUser.load("role")
                await theUser.role.load("permissions")
                return theUser;
            }
        } catch (error) {
            response.status(400)
        }

    }
    public async createUser(response, userBody, ctx) {
        userBody["nick_name"] = userBody["nickName"]
        delete userBody["nickName"];
        let data = await validator.validate({
            schema: new UserValidator(ctx).schema,
            data: userBody
        })
        let defaultIndex: Role[] = await Role.query().where('name', "Visitante");
        if (defaultIndex.length > 0) {
            data["role_id"] = defaultIndex[0].id;
            let newUser: User = await User.create(data);
            await newUser.load("role")
            await newUser.role.load("permissions")
            return newUser;
        } else {
            response.status(500);
            return {
                "message": "Default role not configured"
            }
        }
    }

    public async index({ request}) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page",20);
        let users: User[] = await User.query().preload("role").paginate(page, perPage);
        return users;
    }
    public async update({ params, request, response }: HttpContextContract) {
        const theUser: User = await User.findOrFail(params.id);
        const body = request.body();
        let theRoles: Role[] = await Role.query().where('id', body.role_id);
        if (theRoles.length == 0) {
            response.status(422);
            return {
                "message": "The role no exist"
            };
        } else {
            theUser.role_id = body.role_id;
            return theUser.save();

        }
    }
    public async destroy({ params, response }: HttpContextContract) {
        const theUser: User = await User.findOrFail(params.id);
        response.status(204);
        return theUser.delete();
    }

}
