import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/data", "DataController.index");
    Route.post("/data", "DataController.store");
    Route.post("/data/files/patient/:patientId/subtask/:subtaskId", "DataController.uploadFiles");
    Route.get("/data/:id", "DataController.show");
    Route.put("/data/:id", "DataController.update");
    Route.delete("/data/:id", "DataController.destroy");
})