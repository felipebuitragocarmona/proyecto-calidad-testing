import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/patients", "PatientsController.index");
    Route.post("/patients", "PatientsController.store");
    Route.get("/patients/:id", "PatientsController.show");
    Route.put("/patients/:id", "PatientsController.update");
    Route.delete("/patients/:id", "PatientsController.destroy");
})