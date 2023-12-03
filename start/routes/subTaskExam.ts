import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/subtasks-exam", "SubTaskExamsController.index");
    Route.post("/subtasks-exam", "SubTaskExamsController.store");
    Route.get("/subtasks-exam/:id", "SubTaskExamsController.show");
    Route.put("/subtasks-exam/:id", "SubTaskExamsController.update");
    Route.delete("/subtasks-exam/:id", "SubTaskExamsController.destroy");
})