import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get('/google/redirect', async ({ ally }) => {
        return ally.use('google').redirect()
    })
    Route.get('/google/user', async ({ ally }) => {
        const token = await ally.use('google').accessToken()
        return {token:token}
        // const user = await ally
        //   .use('github')
        //   .userFromToken(token)
    })
    Route.get('/welcome', async ({ ally }) => {
        const google = ally.use('google')

        /**
         * User has explicitly denied the login request
         */
        if (google.accessDenied()) {
            return 'Access was denied'
        }

        /**
         * Unable to verify the CSRF state
         */
        if (google.stateMisMatch()) {
            return 'Request expired. Retry again'
        }

        /**
         * There was an unknown error during the redirect
         */
        if (google.hasError()) {
            return google.getError()
        }

        /**
         * Finally, access the user
         */
        const user = await google.user()
        //console.log("el usuario es ",user);
        //console.log("el usuario es ",JSON.stringify(user));
        return { hello: user }
    })
})