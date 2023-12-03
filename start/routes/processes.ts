import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/processes", "ProcessesController.index");
    Route.post("/processes", "ProcessesController.store");
    Route.get("/processes/:id", "ProcessesController.show");
    Route.put("/processes/:id", "ProcessesController.update");
    Route.delete("/processes/:id", "ProcessesController.destroy");
})