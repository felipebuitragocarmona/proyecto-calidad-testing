import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Datum from 'App/Models/Datum';
import DatumValidator from 'App/Validators/DatumValidator';
import Application from '@ioc:Adonis/Core/Application'

export default class DataController {
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        const paramId = request.input("param_id");
        let data: Datum[];
        if(paramId==null){
            data= await Datum.query().paginate(page, perPage)
        }else{
            data= await Datum.query().where("param_id",paramId).paginate(page, perPage)
        }
        return data;
    }
    public async store({ request }: HttpContextContract) {
        await request.validate(DatumValidator)
        const body = request.body();
        const theDatum = await Datum.create(body);
        return theDatum;

    }
    public async uploadFiles({ request,params }: HttpContextContract) {
        //console.log("filaes ",request.files('cover_image'))
        const images = request.files('cover_image')
        const body = request.body();
        let patientId=params.patientId;
        let subtask_id=params.subtaskId;
        const patientFolderPath = `patient-${patientId}-subtask-${subtask_id}`;
        

        for (let image of images) {
            //await image.move(Application.tmpPath('uploads'))
            await image.moveToDisk('./'+patientFolderPath)
        }
        return {
            "message":"Ok carga"
        }
    }

    /*
    public async uploadFiles({ request }: HttpContextContract) {
        console.log("filaes ",request.files('cover_image'))
        const images = request.files('cover_image')

        console.log("imagenes "+JSON.stringify(images))
        for (let image of images) {
            await image.move(Application.tmpPath('uploads'))
        }
        return {
            "message":"Ok carga"
        }
    }
    */
   /*
    public async uploadFiles({ request }: HttpContextContract) {
        const coverImage = request.file('cover_image')

        if (coverImage) {
            await coverImage.move(Application.tmpPath('uploads'))
        }
    }
    */



    public async show({ params }: HttpContextContract) {
        return Datum.findOrFail(params.id);
    }
    public async update({ params, request, response }: HttpContextContract) {
        await request.validate(DatumValidator)
        const body = request.body();
        const theDatum: Datum = await Datum.findOrFail(params.id);
        theDatum.value = body.value;
        theDatum.param_id = body.param_id;

        return theDatum.save();
    }

    public async destroy({ params, response }: HttpContextContract) {
        const theDatum: Datum = await Datum.findOrFail(params.id);
        response.status(204);
        return theDatum.delete();
    }
}
