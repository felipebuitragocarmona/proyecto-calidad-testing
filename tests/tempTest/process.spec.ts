import { test } from '@japa/runner'
import Process from 'App/Models/Process'

test.group('Process', () => {
  test("ProcessIndex", async ({ client }) => {
    const response = await client.get("/processes")
    response.assertStatus(200)
    response.assertBodyContains({
      data: [
        {
          name: "Pipe Line V01",
          description: "Primera versión de pipeline",
        }
      ]
    }
    )
  })

  test("getProcess", async ({ client }) => {
    let theProcess = await Process.query().orderBy('id', 'asc').first()
    const response = await client.get(`/processes/${theProcess?.id}`)
    response.assertStatus(200)
    response.assertBodyContains({
      name: "Pipe Line V01",
      description: "Primera versión de pipeline",
    })
  })

  test("createProcess", async ({ client, assert }) => {
    const response = await client.post("/processes")
      .json({
        name: "Test",
        description: "test",
      })
    response.assertStatus(200)
    let theProcess = await Process.query().orderBy('id', 'desc').first()
    response.assertBodyContains({
      id: theProcess?.id,
      name: "Test",
      description: "test",
    })
  })

  test("updateProcess", async ({ client, assert }) => {
    let theProcess = await Process.query().orderBy('id', 'asc').first()
    const response = await client.put(`/processes/${theProcess?.id}`)
      .json(
        {
          name: "Update Test",
          description: "Update Test",
        }
      )
    response.assertStatus(200)

    let updatedProcess = await Process.query().orderBy('id', 'asc').first()
    assert.equal(updatedProcess?.name, "Update Test")
  })

  test("deleteProcess", async ({ client, assert }) => {
    let processQuery = await Process.query().count("* as total")
    let numberProcess = processQuery[0].$extras.total

    const response = await client.delete("/processes/"+numberProcess)
    response.assertStatus(204)

    let newQuery = await Process.query().count("* as total")
    let newProcess = newQuery[0].$extras.total
    assert.equal(numberProcess - 1, newProcess)
  }).setup(async () => {
    let theProcess: object = {
      name: "Test",
      description: "test",
    }
    await Process.create(theProcess);
  })


})
