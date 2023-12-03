import Route from '@ioc:Adonis/Core/Route'
Route.post("/login","UsersController.login");
Route.group(() => {
    Route.get("/users","UsersController.index");
    Route.put("/users/:id","UsersController.update");
    Route.delete("/users/:id","UsersController.destroy");
})
//.middleware(['auth','rolePermission'])