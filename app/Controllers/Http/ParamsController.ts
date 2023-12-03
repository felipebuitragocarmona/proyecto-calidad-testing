import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Param from 'App/Models/Param';
import ParamValidator from 'App/Validators/ParamValidator';

export default class ParamsController {
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        const subTaskId = request.input("sub_task_id");
        let params: Param[];
        if(subTaskId==null){
            params = await Param.query().paginate(page, perPage)
        }else{
            params = await Param.query().where("sub_task_id",subTaskId).paginate(page, perPage)
        }
        return params;
    }
    public async store({ request }: HttpContextContract) {
        await request.validate(ParamValidator)
        const body = request.body();
        const theParam = await Param.create(body);
        return theParam;

    }
    public async show({ params }: HttpContextContract) {
        return Param.findOrFail(params.id);
    }
    public async update({ params, request, response }: HttpContextContract) {
        await request.validate(ParamValidator)
        const body = request.body();
        const theParam: Param = await Param.findOrFail(params.id);
        theParam.name = body.name;
        theParam.type = body.type;
        theParam.optional = body.optional;
        theParam.default_value = body.default_value;
        theParam.sub_task_id = body.sub_task_id;
        return theParam.save();
    }

    public async destroy({ params, response }: HttpContextContract) {
        const theParam: Param = await Param.findOrFail(params.id);
        response.status(204);
        return theParam.delete();
    }
}
