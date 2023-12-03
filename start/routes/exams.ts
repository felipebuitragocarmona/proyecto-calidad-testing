import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/exams", "ExamsController.index");
    Route.post("/exams", "ExamsController.store");
    Route.get("/exams/:id", "ExamsController.show");
    Route.put("/exams/:id", "ExamsController.update");
    Route.delete("/exams/:id", "ExamsController.destroy");
})