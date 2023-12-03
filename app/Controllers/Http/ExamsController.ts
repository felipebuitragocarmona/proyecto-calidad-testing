import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Exam from 'App/Models/Exam';
import ExamValidator from 'App/Validators/ExamValidator';

export default class ExamsController {
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        const patiendId = request.input('patient_id');
        let exams: Exam[];
        if(patiendId==null){
            exams=await Exam.query().paginate(page, perPage)
        }else{
            exams= await Exam.query().where("patient_id",patiendId).paginate(page, perPage)
        }
        
        return exams;
    }
    public async store({ request }: HttpContextContract) {
        await request.validate(ExamValidator)
        const body = request.body();
        if (!body.hasOwnProperty("process_id")){
            body["process_id"]=1
        }
        const theExam = await Exam.create(body);
        return theExam;

    }
    public async show({ params }: HttpContextContract) {
        const theExam = await Exam.findOrFail(params.id)
        /*
        await theExam.load("subtasks",(query) => {
            query.pivotColumns(['previous_subtask_exam_id'])
        })
        */
        await theExam.load('theProcess', (processQuery) => {
            processQuery.preload('tasks', (tasksQuery) => {
                tasksQuery.preload('subTasks',(subTasksQuery) => {
                    subTasksQuery.preload('subTaskExam',(subTaskExamQuery) => {
                        subTaskExamQuery.where('exam_id',params.id)
                    })
                })
          })
        })
        return theExam;
    }
    public async update({ params, request, response }: HttpContextContract) {
        await request.validate(ExamValidator)
        const body = request.body();
        const theExam: Exam = await Exam.findOrFail(params.id);
        theExam.name = body.name;
        theExam.patient_id = body.patient_id;
        return theExam.save();
    }

    public async destroy({ params, response }: HttpContextContract) {
        const theExam: Exam = await Exam.findOrFail(params.id);
        response.status(204);
        return theExam.delete();
    }
}
