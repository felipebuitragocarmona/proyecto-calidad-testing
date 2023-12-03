import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Process from 'App/Models/Process';
import ProcessValidator from 'App/Validators/ProcessValidator';

export default class ProcessesController {
    /**
     * Lista todos los procesos
     */
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        let processes: Process[] = await Process.query().paginate(page, perPage)
        return processes;
    }
    /**
     * Almacena la información de un proceso
     */
    public async store({ request }: HttpContextContract) {
        await request.validate(ProcessValidator)
        const body = request.body();
        const newProcess = await Process.create(body);
        return newProcess;
    }
    /**
     * Muestra la información de un solo proceso
     */
    public async show({ params }: HttpContextContract) {
        return Process.findOrFail(params.id);
    }
    /**
     * Actualiza la información de un proceso basado
     * en el identificador y nuevos parámetros
     */
    public async update({ params, request }: HttpContextContract) {
        await request.validate(ProcessValidator)
        const body = request.body();
        const theProcess = await Process.findOrFail(params.id);
        theProcess.name = body.name;
        theProcess.description = body.description;
        return theProcess.save();
    }
    /**
     * Elimina a un proceso basado en el identificador
     */
    public async destroy({ params, response }: HttpContextContract) {
        if (params.id != 1) {
            const theProcess = await Process.findOrFail(params.id);
            response.status(204)
            return theProcess.delete();
        }else{
            response.status(400)
            response.json({"message":"This process cannot be eliminated"});
        }
    }
}

