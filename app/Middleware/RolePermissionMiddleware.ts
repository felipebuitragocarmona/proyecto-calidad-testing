import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission';
import RolePermission from 'App/Models/RolePermission';
import User from 'App/Models/User';

export default class RolePermissionMiddleware {
  public async handle({ request, ally, response }: HttpContextContract, next: () => Promise<void>) {
    const method = request.method();
    const url = this.processURL(request.url());
    let token = request.headers().authorization
    if (token != undefined) {
      token = token.replace("Bearer ", "")
      try {
        const user = await ally.use('google').userFromToken(token)
        //console.log("google "+JSON.stringify(user))
        let theUsers: User[] = await User.query().where('email', user.email ? user.email : "")
        
        //console.log(JSON.stringify(theUsers))
        let thePermission: Permission | null = await this.getPermission(url, method);
        //console.log("Permiso "+JSON.stringify(thePermission))
        if (theUsers[0].role_id && thePermission != null) {
          let theRolePermission: RolePermission | null = await this.getRolePermission(theUsers[0].role_id, thePermission.id)
          if (theRolePermission == null) {
            return response.status(401)
          } else {
            await next()
          }
        } else {
          return response.status(401)
        }
      } catch (error) {
        return response.status(401)
      }
    }
  }

  public processURL(url) {
    url = url.substring(1, url.length)
    const parts = url.split('/');
    parts.forEach(thePart => {
      if (thePart.match('\\d')) {
        url = url.replace(`/${thePart}`, '/?');
      }
    });
    return url;
  }
  public async getPermission(url: string, method: string) {
    //console.log("url "+url+" method "+method)
    let thePermission: Permission | null;
    try {
      thePermission = await Permission.query()
        .where('url', "/" + url)
        .where('method', method)
        .firstOrFail();
    } catch {
      thePermission = null;
    }
    return thePermission;
  }
  public async getRolePermission(roleId: number, permissionId: number) {
    let theRolePermission: RolePermission | null;
    //console.log("Role id "+roleId+" permission "+permissionId)
    try {
      theRolePermission = await RolePermission.query().where({
        role_id: roleId, permission_id: permissionId,
      }).first();
    } catch {
      theRolePermission = null;
    }
    //console.log("permiso rol ->"+theRolePermission)
    return theRolePermission;
  }
}
