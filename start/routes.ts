/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

import './routes/security'
import './routes/users'
import './routes/roles'
import './routes/permissions'
import './routes/rolePermissions'
import './routes/processes'
import './routes/tasks'
import './routes/subtasks'
import './routes/params'
import './routes/data'
import './routes/patients'
import './routes/exams'
import './routes/subTaskExam'
import './routes/datumSubTaskExam'