import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/tasks", "TasksController.index");
    Route.post("/tasks", "TasksController.store");
    Route.get("/tasks/:id", "TasksController.show");
    Route.put("/tasks/:id", "TasksController.update");
    Route.delete("/tasks/:id", "TasksController.destroy");
})