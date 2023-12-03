import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class AuthMiddleware {
  public async handle({ request, ally, response }: HttpContextContract, next: () => Promise<void>) {

    let token = request.headers().authorization
    if (token != undefined) {
      token = token.replace("Bearer ", "")
      try {
        const user = await ally.use('google').userFromToken(token)
        let theUsers: User[] = await User.query().where('email', user.email ? user.email : "")
        if (theUsers.length == 0) {
          return response.status(401)
        }else{
          await next()
        }
      } catch (error) {
        return response.status(401)
      }
    }
    
  }
}
