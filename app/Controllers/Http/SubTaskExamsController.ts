import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Datum from 'App/Models/Datum';
import DatumSubTaskExam from 'App/Models/DatumSubTaskExam';
import SubTask from 'App/Models/SubTask';
import SubTaskExam from 'App/Models/SubTaskExam';
import Task from 'App/Models/Task';
import DatumSubTaskExamValidator from 'App/Validators/DatumSubTaskExamValidator';
import DatumValidator from 'App/Validators/DatumValidator';
import SubTaskExamValidator from 'App/Validators/SubTaskExamValidator';

export default class SubTaskExamsController {
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        const examId = request.input("exam_id");
        const subTaskId = request.input("subtask_id");
        const previousSubtaskExamId = request.input("previous_subtask_exam_id");
        let subTasksExams: SubTaskExam[];
        if(examId!=null){
            subTasksExams= await SubTaskExam.query().where("exam_id",examId).paginate(page, perPage)
        }else if(subTaskId!=null){
            subTasksExams= await SubTaskExam.query().where("subtask_id",subTaskId).paginate(page, perPage)
        }else if(previousSubtaskExamId!=null){
            subTasksExams= await SubTaskExam.query().where("previous_subtask_exam_id",previousSubtaskExamId).paginate(page, perPage)
        }else{
            subTasksExams= await SubTaskExam.query().paginate(page, perPage)
        }
        return subTasksExams;
    }
    public async store({ request,response }: HttpContextContract) {
        await request.validate(SubTaskExamValidator)
        const body = request.body();
        const theSubTask=await SubTask.findOrFail(body["subtask_id"]);
        const theTask=await Task.findOrFail(theSubTask.id)
        if (!body.hasOwnProperty("previous_subtask_exam_id") && theTask["order"]==1 && theSubTask["order"]==1 || (body.hasOwnProperty("previous_subtask_exam_id") && body["previous_subtask_exam_id"]==0) && theTask["order"]==1 && theSubTask["order"]==1){
            body["previous_subtask_exam_id"]=null
        }else if(!body.hasOwnProperty("previous_subtask_exam_id") && theSubTask["order"]>1){
            response.status(400)
            response.json({"message":"previous_subtask_exam_id invalid"})
            return response;
        }else{
            await SubTaskExam.findOrFail(body["previous_subtask_exam_id"])
        }
        let theSubTaskExam = await SubTaskExam.create(body);
        let theData=await this.createDataToSubTaskExam(body);
        await this.attachDataToSubtaskExam(theSubTaskExam.id,theData)
        return this.loadRelationship(theSubTaskExam);
        
    }
    async loadRelationship(theSubTaskExam:SubTaskExam){
        const theData = await theSubTaskExam.related('dataSubTaskExam').query()
        let inputs:any=[];
        let outputs:any=[];
        for (const datum of theData) {
            if (datum.$extras.pivot_type === "input") {
                await datum.load("param");
                inputs.push(datum.toJSON());
            } else {
                outputs.push(datum.toJSON());
            }
        }
        return { ...theSubTaskExam.toJSON(), "inputs": inputs,"outputs":outputs };
    }
    public async createDataToSubTaskExam(body:object){
        /*
        body["dataSubTaskExam"].forEach(datum => {
            datum.validate(DatumValidator)    
        });
        */
       console.log("aqui ",body["dataSubTaskExam"])
        let data=await Datum.createMany(body["dataSubTaskExam"])
        console.log("nueva ",JSON.stringify(data))
        return data;
    }
    public async attachDataToSubtaskExam(subtask_exam_id:number,theData:Datum[]){
        theData.forEach(async datum => {
           let newDatumSubTaskExam={
            "subtask_exam_id":subtask_exam_id,
            "datum_id":datum["id"],
            "type":"input"
           }
           const theNewDatumSubTaskExam= await DatumSubTaskExam.create(newDatumSubTaskExam);
           console.log(JSON.stringify(theNewDatumSubTaskExam))
        });
    }
    public async show({ params }: HttpContextContract) {
        let theSubTaskExam=await SubTaskExam.findOrFail(params.id);
        return this.loadRelationship(theSubTaskExam);
    }
    public async update({ params, request, response }: HttpContextContract) {
        await request.validate(SubTaskExamValidator)
        const body = request.body();
        const theSubTaskExam: SubTaskExam = await SubTaskExam.findOrFail(params.id);
        theSubTaskExam.previous_subtask_exam_id = body.previous_subtask_exam_id;
        theSubTaskExam.exam_id = body.exam_id;
        theSubTaskExam.subtask_id = body.subtask_id;
        theSubTaskExam.finished_at = body.finished_at;
        return theSubTaskExam.save();
    }

    public async destroy({ params, response }: HttpContextContract) {
        const theSubTaskExam: SubTaskExam = await SubTaskExam.findOrFail(params.id);
        response.status(204);
        return theSubTaskExam.delete();
    }
}
