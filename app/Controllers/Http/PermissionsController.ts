import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission';
import PermissionValidator from 'App/Validators/PermissionValidator';

export default class PermissionsController {
    public async index({request}: HttpContextContract) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page",20);
        let permissions: Permission[] = await Permission.query().paginate(page, perPage)
        return permissions;
    }
    public async store({ request,response }: HttpContextContract) {
        await request.validate(PermissionValidator)
        const body = request.body();
        let thePermissions: Permission[]= await Permission.query()
                                                        .where('url', body.url)
                                                        .where('method', body.method);
        if(thePermissions.length==0){
            const thePermission = await Permission.create(body);
            return thePermission;
        }else{
            response.status(422);
            return {
                "message":"Permission already exist"
            };
        }
        
    }
    public async show({ params }: HttpContextContract) {
        return Permission.findOrFail(params.id);
    }
    public async update({ params, request,response }: HttpContextContract) {
        await request.validate(PermissionValidator)
        const body = request.body();
        const thePermission: Permission = await Permission.findOrFail(params.id);
        thePermission.name = body.name;
        thePermission.description = body.description;
        thePermission.url = body.url;
        thePermission.method = body.method;
        thePermission.menu_path = body.menu_path;
        let thePermissions: Permission[]= await Permission.query()
                                                        .where('url', body.url)
                                                        .where('method', body.method);
        if(thePermissions.length==0){
            return thePermission.save();
        }else{
            response.status(422);
            return {
                "message":"Permission already exist"
            };
        }

        
    }

    public async destroy({ params, response }: HttpContextContract) {
        const thePermission: Permission = await Permission.findOrFail(params.id);
        response.status(204);
        return thePermission.delete();
    }
}
