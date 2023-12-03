import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DatumSubTaskExam from 'App/Models/DatumSubTaskExam';
import DatumSubTaskExamValidator from 'App/Validators/DatumSubTaskExamValidator';

export default class DataSubTaskExamsController {
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        const subtaskExamId = request.input("subtask_exam_id");
        const datumId = request.input("datum_id");
        let data: DatumSubTaskExam[] ;
        if(subtaskExamId!=null){
            data= await DatumSubTaskExam.query().where("subtask_exam_id",subtaskExamId).paginate(page, perPage)
        }else if(datumId!=null){
            data= await DatumSubTaskExam.query().where("datum_id",datumId).paginate(page, perPage)
        }else{
            data= await DatumSubTaskExam.query().paginate(page, perPage)
        }
        return data;
    }
    public async store({ request }: HttpContextContract) {
        await request.validate(DatumSubTaskExamValidator)
        const body = request.body();
        const theDatumSubTaskExam = await DatumSubTaskExam.create(body);
        return theDatumSubTaskExam;

    }
    public async show({ params }: HttpContextContract) {
        return DatumSubTaskExam.findOrFail(params.id);
    }
    public async update({ params, request, response }: HttpContextContract) {
        await request.validate(DatumSubTaskExamValidator)
        const body = request.body();
        const theDatumSubTaskExam: DatumSubTaskExam = await DatumSubTaskExam.findOrFail(params.id);
        theDatumSubTaskExam.type = body.type;
        theDatumSubTaskExam.subtask_exam_id = body.subtask_exam_id;
        theDatumSubTaskExam.datum_id = body.datum_id;
        return theDatumSubTaskExam.save();
    }
    public async destroy({ params, response }: HttpContextContract) {
        const theDatumSubTaskExam: DatumSubTaskExam = await DatumSubTaskExam.findOrFail(params.id);
        response.status(204);
        return theDatumSubTaskExam.delete();
    }
}
