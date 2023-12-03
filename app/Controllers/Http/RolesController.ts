import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role';
import User from 'App/Models/User';
import { schema } from '@ioc:Adonis/Core/Validator'
import RoleValidator from 'App/Validators/RoleValidator';

export default class RolesController{
    public async index({request}:HttpContextContract){
        const page = request.input('page', 1);
        const perPage = request.input("per_page",20);
        let roles:Role[]=await Role.query().paginate(page, perPage)
        return roles;
    }
    public async store({request}:HttpContextContract){
        await request.validate(RoleValidator)
        const body=request.body();
        const theRole:Role=await Role.create(body);
        return theRole;
    }
    public async show({params}:HttpContextContract) {
            return Role.findOrFail(params.id);        
    }
    public async update({params,request}:HttpContextContract) {
        const body=await request.validate(RoleValidator)
        const theRole:Role=await Role.findOrFail(params.id);
        theRole.name=body.name;
        return theRole.save();
    }
    
    public async destroy({params,response}:HttpContextContract) {
        await User.query().where('role_id',params.id)
        const theRole:Role=await Role.findOrFail(params.id);
        await theRole.load("users");
        if(theRole.users.length>0){
            response.status(422);
            return {
                "error":"El rol tiene usuarios asociados",
                "usuarios":theRole.users
            }
        }else{
            response.status(204);
            return theRole.delete();
            
        }
    } 
}
