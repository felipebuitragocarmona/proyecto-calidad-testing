import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'

export default class extends BaseSeeder {
  public static environment = ['development', 'test']
  public async run() {
    await Permission.createMany([
      //Users
      {
        url: 'users',
        method: 'POST',
        menu_path: 'store-users'
      },
      {
        url: 'users',
        method: 'GET',
        menu_path: 'show-users'
      },
      {
        url: 'users/?',
        method: 'GET',
        menu_path: 'list-users'
      },
      {
        url: 'users/?',
        method: 'PUT',
        menu_path: 'update-users'
      },
      {
        url: 'users/?',
        method: 'DELETE',
        menu_path: 'delete-users'
      },
      //Roles
      {
        url: 'roles',
        method: 'POST',
        menu_path: 'store-roles'
      },
      {
        url: 'roles',
        method: 'GET',
        menu_path: 'show-roles'
      },
      {
        url: 'roles/?',
        method: 'GET',
        menu_path: 'list-roles'
      },
      {
        url: 'roles/?',
        method: 'PUT',
        menu_path: 'update-roles'
      },
      {
        url: 'roles/?',
        method: 'DELETE',
        menu_path: 'delete-roles'
      },
      //Permissions
      {
        url: 'permissions',
        method: 'POST',
        menu_path: 'store-permissions'
      },
      {
        url: 'permissions',
        method: 'GET',
        menu_path: 'show-permissions'
      },
      {
        url: 'permissions/?',
        method: 'GET',
        menu_path: 'list-permissions'
      },
      {
        url: 'permissions/?',
        method: 'PUT',
        menu_path: 'update-permissions'
      },
      {
        url: 'permissions/?',
        method: 'DELETE',
        menu_path: 'delete-permissions'
      },
    ])
  }
}
