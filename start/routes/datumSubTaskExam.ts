import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/datum_sub_task_exam", "DataSubTaskExamsController.index");
    Route.post("/datum_sub_task_exam", "DataSubTaskExamsController.store");
    Route.get("/datum_sub_task_exam/:id", "DataSubTaskExamsController.show");
    Route.put("/datum_sub_task_exam/:id", "DataSubTaskExamsController.update");
    Route.delete("/datum_sub_task_exam/:id", "DataSubTaskExamsController.destroy");
})