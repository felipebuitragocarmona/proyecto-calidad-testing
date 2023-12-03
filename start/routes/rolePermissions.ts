import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/role-permissions", "RolePermissionsController.index");
    Route.post("/role-permissions", "RolePermissionsController.store");
    Route.get("/role-permissions/role/:role_id", "RolePermissionsController.showByRole"); 
    Route.delete("/role-permissions/:id", "RolePermissionsController.destroy");
})