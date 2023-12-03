import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Patient from 'App/Models/Patient';
import PatientCreateValidator from 'App/Validators/PatientCreateValidator';
import PatientValidator from 'App/Validators/PatientValidator';

export default class PatientsController {
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        let patients: Patient[] = await Patient.query().paginate(page, perPage)
        return patients;
    }
    public async store({ request }: HttpContextContract) {
        await request.validate(PatientCreateValidator)
        const body = request.body();
        const thePatient = await Patient.create(body);
        return thePatient;

    }
    public async show({ params }: HttpContextContract) {
        const thePatient=await Patient.findOrFail(params.id);
        await thePatient.load("exams")
        return thePatient;
    }
    public async update({ params, request, response }: HttpContextContract) {
        await request.validate(PatientValidator)
        const body = request.body();
        const thePatient: Patient = await Patient.findOrFail(params.id);
        thePatient.name = body.name;
        thePatient.lastname = body.lastname;
        thePatient.birth_year = body.birth_year;
        return thePatient.save();
    }

    public async destroy({ params, response }: HttpContextContract) {
        const thePatient: Patient = await Patient.findOrFail(params.id);
        response.status(204);
        return thePatient.delete();
    }
}
