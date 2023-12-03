import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/subtasks", "SubTasksController.index");
    Route.post("/subtasks", "SubTasksController.store");
    Route.get("/subtasks/:id", "SubTasksController.show");
    Route.put("/subtasks/:id", "SubTasksController.update");
    Route.delete("/subtasks/:id", "SubTasksController.destroy");
    Route.get("/next-subtasks/:id/exam/:exam_id", "SubTasksController.getNext");
})