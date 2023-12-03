import { test } from '@japa/runner'
import Process from 'App/Models/Process'
import Task from 'App/Models/Task'


test.group('Task', () => {

  test("TasksIndex", async ({ client }) => {
    const response = await client.get("tasks")
    response.assertStatus(200)
    response.assertBodyContains({
      data:
        [
          {
            name: "Filtrado",
            description: "",
            order: 1,
            process_id: 1
          },
          {
            name: "Mapeo",
            description: "",
            order: 2,
            process_id: 1
          },
          {
            name: "Filtrado BAM",
            description: "",
            order: 3,
            process_id: 1
          }
        ]
    })

    test("getTasks", async ({ client }) => {
      let theTasks = await Task.query().orderBy('id', 'asc').first()
      const response = await client.get(`/tasks/${theTasks?.id}`)
      response.assertStatus(200)
      response.assertBodyContains(
        {
          name: "Filtrado",
          description: "",
          order: 1,
          process_id: 1
        }
      )
    })

    test("createTasks", async ({ client, assert }) => {
      let theProcess = await Process.query().orderBy('id', 'asc').first()
      let response = await client.post("/tasks")
        .json({
          name: "Test",
          description: "test",
          order: 3,
          process_id: 1
        })
      response.assertStatus(200)
      let theTasks = await Task.query().orderBy('id', 'desc').first()
      response.assertBodyContains({
        id: theTasks?.id,
        name: "Test",
        description: "test",
        order: 3,
        process_id: 1
      })
    })
    test("updateTasks", async ({ client, assert }) => {
      let theTask = await Task.query().orderBy('id', 'asc').first()
      const response = await client.put(`/tasks/${theTask?.id}`)
        .json(
          {
            name: "Update Test",
            description: "update test",
            order: 4,
            process_id: 1
          }
        )
      response.assertStatus(200)

      let updatedTask = await Task.query().orderBy('id', 'asc').first()
      assert.equal(updatedTask?.name, "Update Test")
    })

    test("deleteTasks", async ({ client, assert }) => {
      let tasksQuery = await Task.query().count("* as total")
      let numberTasks = tasksQuery[0].$extras.total

      const response = await client.delete("tasks/"+numberTasks)
      response.assertStatus(204)

      let newQuery = await Task.query().count("* as total")
      let newTasks = newQuery[0].$extras.total
      assert.equal(numberTasks - 1, newTasks)
    }).setup(async () => {
      let theTask:object = {
        name: "Update Test",
        description: "update test",
        order: 4,
        process_id: 1
      }
      await Task.create(theTask);
    })
  })
})
