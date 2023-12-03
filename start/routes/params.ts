import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/params", "ParamsController.index");
    Route.post("/params", "ParamsController.store");
    Route.get("/params/:id", "ParamsController.show");
    Route.put("/params/:id", "ParamsController.update");
    Route.delete("/params/:id", "ParamsController.destroy");
})