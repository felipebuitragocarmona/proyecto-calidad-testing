import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RolePermission from 'App/Models/RolePermission';
import RolePermissionValidator from 'App/Validators/RolePermissionValidator';

export default class RolePermissionsController {
    public async index({request}: HttpContextContract) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page",20);
        let theRolePermissions: RolePermission[] = await RolePermission.query().paginate(page, perPage)
        return theRolePermissions;
    }
    public async showByRole({params}:HttpContextContract) {
        let theRolePermissions: RolePermission[]= await RolePermission.query()
                                                                        .where('role_id', params.role_id)
        return theRolePermissions;        
    }

    public async store({ request,response }: HttpContextContract) {
        await request.validate(RolePermissionValidator)
        const body = request.body();
        let theRolePermissions: RolePermission[] = await RolePermission.query()
                                                        .where('role_id', body.role_id)
                                                        .where('permission_id', body.permission_id);
        if (theRolePermissions.length == 0) {
            const theRolePermission: RolePermission = await RolePermission.create(body);
            return theRolePermission;
        }else{
            response.status(422);
            return {
                "message":"Permission already exist for this role"
            };
        }
    }
    public async destroy({ params, response }: HttpContextContract) {
        const theRolePermission: RolePermission = await RolePermission.findOrFail(params.id);
        response.status(204);
        return theRolePermission.delete();
    }
}
