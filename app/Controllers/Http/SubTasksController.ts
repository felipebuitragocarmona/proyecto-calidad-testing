import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Param from 'App/Models/Param';
import SubTask from 'App/Models/SubTask';
import SubTaskExam from 'App/Models/SubTaskExam';
import Task from 'App/Models/Task';
import SubTaskValidator from 'App/Validators/SubTaskValidator';

export default class SubTasksController {
    /**
     * Lista todas las sub tareas
     */
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        const taskId = request.input("task_id");
        let subTasks: SubTask[];
        if (taskId == null) {
            subTasks = await SubTask.query().paginate(page, perPage)
        } else {
            subTasks = await SubTask.query().where("task_id", taskId).paginate(page, perPage)
        }

        return subTasks;
    }
    /**
     * Almacena la información de una sub tarea
     */
    public async store({ request }: HttpContextContract) {
        await request.validate(SubTaskValidator)
        const body = request.body();
        const newSubTask = await SubTask.create(body);
        return newSubTask;
    }
    /**
     * Muestra la información de una sola subtarea
     */
    public async show({ params }: HttpContextContract) {
        let theSubTask: SubTask = await SubTask.findOrFail(params.id);
        return await this.loadingOrganizationParameters(theSubTask);
    }
    public async loadingOrganizationParameters(theSubTask: SubTask) {
        await theSubTask.load("params");
        let inputParams: object[] = []
        let outputParams: object[] = []
        for (const theParam of theSubTask.params) {
            if (theParam.$extras.pivot_type === "input") {
                let tempParam = theParam.toJSON()
                tempParam.default_value = theParam.$extras.pivot_default_value;
                inputParams.push(tempParam)
            } else {
                outputParams.push(theParam)
            }
        }
        let theFinalSubTask = theSubTask.toJSON();
        delete theFinalSubTask["params"];
        return { ...theFinalSubTask, "input_params": inputParams, "output_params": outputParams };
    }
    /**
     * Actualiza la información de una sub tarea basado
     * en el identificador y nuevos parámetros
     */
    public async update({ params, request }: HttpContextContract) {
        await request.validate(SubTaskValidator)
        const body = request.body();
        const theSubTask = await SubTask.findOrFail(params.id);
        theSubTask.name = body.name;
        theSubTask.description = body.description;
        theSubTask.order = body.order;
        theSubTask.command = body.command;
        theSubTask.task_id = body.task_id;
        return theSubTask.save();
    }
    /**
     * Elimina a una tarea basado en el identificador
     */
    public async destroy({ params, response }: HttpContextContract) {
        const theSubTask = await SubTask.findOrFail(params.id);
        response.status(204)
        return theSubTask.delete();
    }
    public async getNext({ params, response }: HttpContextContract) {
        let dataResponse: object = {}
        let theSubtaskExam: SubTaskExam[] = await SubTaskExam.query().where("subtask_id", params.id).where("exam_id", params.exam_id)
        let theActualSubTask = await SubTask.findOrFail(params.id);
        let nextOrder = theActualSubTask.order + 1;
        let theNextSubTasks: SubTask[] = await SubTask.query().where("task_id", theActualSubTask.task_id).where("order", nextOrder);
        let nextSubtasks: object[] = []
        if (theNextSubTasks.length > 0) {
            for (const theActualNextSubTask of theNextSubTasks) {
                nextSubtasks.push(await this.loadingOrganizationParameters(theActualNextSubTask))
            }
        } else {
            await theActualSubTask.load("task")
            let theActualTask = theActualSubTask["task"]
            let orderNextTask = theActualTask.order + 1;
            let nextTask = await Task.findBy("order", orderNextTask)
            if (!nextTask) {
                response.status(204)
            }
            else {
                await nextTask.load("subTasks", (subTaskExamQuery) => {
                    subTaskExamQuery.where('order', 1)
                })
                for (const theActualNextSubTask of nextTask["subTasks"]) {
                    nextSubtasks.push(await this.loadingOrganizationParameters(theActualNextSubTask))
                }
            }
        }
        dataResponse["previous"] = theSubtaskExam
        dataResponse["next_subtasks"] = nextSubtasks;
        return dataResponse;
    }

}
