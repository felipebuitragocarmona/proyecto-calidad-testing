import { test } from '@japa/runner'
import Param from 'App/Models/Param'


test.group('Params', () => {

  test("ParamsIndex", async ({ client }) => {
    const response = await client.get("/params")
    response.assertStatus(200)
    response.assertBodyContains({
      data: [{
        name: "ntasks",
        type: "integer",
        optional: true,
      }
      ]
    }
    )
  }).setup(async () => {
    let theParam: object = {
      name: "ntasks",
      type: "integer",
      optional: true,
    }
    await Param.create(theParam);
  })

  // test("ParamsIndexBySubTask", async ({ client }) => {
  //   let sub_task_id = 1
  //   const response = await client.get("/params?sub_task_id=" + sub_task_id)
  //   response.assertStatus(200)
  //   response.assertBodyContains({
  //     data: [{
  //       sub_task_id: 1,
  //       name: "Parametro prueba 2",
  //       type: "integer",
  //       optional: 1,
  //       default_value: "0"
  //     }
  //     ]
  //   }
  //   )
  // }).setup(async () => {
  //   let theParam: object = {
  //     sub_task_id: 1,
  //     name: "Parametro prueba 2",
  //     type: "integer",
  //     optional: 1,
  //     default_value: "0"
  //   }
  //   await Param.create(theParam);
  // })

  // test("getParam", async ({ client }) => {
  //   let theParam = await Param.query().orderBy('id', 'asc').first()
  //   const response = await client.get(`/params/${theParam?.id}`)
  //   response.assertStatus(200)
  //   response.assertBodyContains(
  //     {
  //       sub_task_id: 1,
  //       name: "ejemplo parámetro 1",
  //       type: "integer",
  //       optional: 1,
  //       default_value: "0"
  //     }
  //   )
  // })

  // test("createParam", async ({ client, assert }) => {
  //   const response = await client.post("/params")
  //     .json({
  //       sub_task_id: 1,
  //       name: "ejemplo parámetro 2",
  //       type: "integer",
  //       optional: 1,
  //       default_value: "0"
  //     })
  //   response.assertStatus(200)
  //   let theParam = await Param.query().orderBy('id', 'desc').first()
  //   response.assertBodyContains({
  //     id: theParam?.id,
  //     sub_task_id: 1,
  //     name: "ejemplo parámetro 2",
  //     type: "integer",
  //     optional: 1,
  //     default_value: "0"
  //   })
  // })

  // test("updateParam", async ({ client, assert }) => {
  //   let theParam = await Param.query().orderBy('id', 'asc').first()
  //   const response = await client.put(`/params/${theParam?.id}`)
  //     .json(
  //       {
  //         sub_task_id: 1,
  //         name: "ejemplo parámetro 3",
  //         type: "boolean",
  //         optional: 1,
  //         default_value: "true"
  //       }
  //     )
  //   response.assertStatus(200)

  //   //let updatedParam = await Param.query().orderBy('id', 'asc').first()
  //   response.assertBodyContains(
  //     {
  //       id: theParam?.id,
  //       sub_task_id: 1,
  //       name: "ejemplo parámetro 3",
  //       type: "boolean",
  //       optional: 1,
  //       default_value: "true"
  //     }
  //   )
  // })

  // test("deleteParam", async ({ client, assert }) => {
  //   let paramsQuery = await Param.query().count("* as total")
  //   let numberParams = paramsQuery[0].$extras.total

  //   const response = await client.delete("/params/" + numberParams)
  //   response.assertStatus(204)

  //   let newQuery = await Param.query().count("* as total")
  //   let newNumberParams = newQuery[0].$extras.total
  //   assert.equal(numberParams - 1, newNumberParams)
  // }).setup(async () => {
  //   let theParam = {
  //     sub_task_id: 1,
  //     name: "Parametro prueba eliminacion",
  //     type: "integer",
  //     optional: true,
  //     default_value: "0"
  //   }
  //   await Param.create(theParam);
  // })
})
