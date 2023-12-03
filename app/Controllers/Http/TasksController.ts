 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task';
import TaskValidator from 'App/Validators/TaskValidator';

export default class TasksController {
    /**
     * Lista todas las tareas
     */
    public async index({request}: HttpContextContract) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page",20);
        let tasks:Task[]=await Task.query().paginate(page, perPage)
        return tasks;
    }
    /**
     * Almacena la información de una tarea
     */
    public async store({ request }: HttpContextContract) {
        await request.validate(TaskValidator)
        const body = request.body();
        const newTask = await Task.create(body);
        return newTask;
    }
    /**
     * Muestra la información de una sola
     */
    public async show({ params }: HttpContextContract) {
        return Task.findOrFail(params.id);
    }
    /**
     * Actualiza la información de una tarea basado
     * en el identificador y nuevos parámetros
     */
    public async update({ params, request }: HttpContextContract) {
        await request.validate(TaskValidator)
        const body = request.body();
        const theTask = await Task.findOrFail(params.id);
        theTask.name = body.name;
        theTask.description = body.description;
        theTask.order = body.order;
        theTask.process_id = body.process_id;
        return theTask.save();
    }
    /**
     * Elimina a una tarea basado en el identificador
     */
    public async destroy({ params,response }: HttpContextContract) {
        const theTask = await Task.findOrFail(params.id);
        response.status(204)
        return theTask.delete();
    }
}
