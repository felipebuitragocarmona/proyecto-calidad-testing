import { test } from '@japa/runner'
import SubTask from 'App/Models/SubTask'

test.group('Sub_task', () => {
  test("SubTasksIndex", async ({ client }) => {
    const response = await client.get("subtasks")
    response.assertStatus(200)
    response.assertBodyContains({
      data:
        [
          {
            "id": 1,
            "name": "Ejecución llamado de bases",
            "description": "",
            "order": 1,
            "command": "sh command",
            "task_id": 1
          }
        ]
    })
    test("SubTasksIndexByTask", async ({ client }) => {
      const response = await client.get("subtasks?task_id=1")
      response.assertStatus(200)
      response.assertBodyContains({
        data:
          [
            {
              "id": 1,
              "name": "Ejecución llamado de bases",
              "description": "",
              "order": 1,
              "command": "sh command",
              "task_id": 1
            }
          ]
      })

      test("SubTasksShow", async ({ client }) => {
        const response = await client.get("subtasks/1")
        response.assertStatus(200)
        response.assertBodyContains(
          {
            "id": 1,
            "name": "Ejecución llamado de bases",
            "description": "",
            "order": 1,
            "command": "sh command",
            "task_id": 1
          }
        )
      })

      test("createSubTasks", async ({ client, assert }) => {
        let response = await client.post("/subtasks")
          .json({
            name: "Indexado Prueba",
            description: "Pruebas",
            order: 2,
            command: "sh command",
            task_id: 1
          })
        response.assertStatus(200)
        let theSubTasks = await SubTask.query().orderBy('id', 'desc').first()
        response.assertBodyContains({
          id: theSubTasks?.id,
          name: "Indexado Prueba",
          description: "Pruebas",
          order: 2,
          command: "sh command",
          task_id: 1
        })
      })

      test("updateSubTasks", async ({ client, assert }) => {
        let theSubTask = await SubTask.query().orderBy('id', 'asc').first()
        const response = await client.put(`/subtasks/${theSubTask?.id}`)
          .json(
            {
              name: "Indexado Prueba Modificado",
              description: "Pruebas",
              order: 2,
              command: "sh command modificado",
              task_id: 1
            }
          )
        response.assertStatus(200)

        let updatedSubTask = await SubTask.query().orderBy('id', 'asc').first()
        assert.equal(updatedSubTask?.command, "sh command modificado")
      })

      test("deleteSubTasks", async ({ client, assert }) => {
        let SubTasksQuery = await SubTask.query().count("* as total")
        let numberSubTasks = SubTasksQuery[0].$extras.total

        const response = await client.delete("subtasks/" + numberSubTasks)
        response.assertStatus(204)

        let newQuery = await SubTask.query().count("* as total")
        let newTasks = newQuery[0].$extras.total
        assert.equal(numberSubTasks - 1, newTasks)
      }).setup(async () => {
        let theSubTask: object = {
          name: "Indexado Prueba Modificado",
          description: "Pruebas",
          order: 2,
          command: "sh command modificado",
          task_id: 1
        }
        await SubTask.create(theSubTask);
      })
    })
  })
  test("SubTasksNext (Only one next_subtasks)", async ({ client }) => {
    const response = await client.get("next-subtasks/1/exam/1")
    response.assertStatus(200)
    response.assertBodyContains(
      {
        "previous": [],
        "next_subtasks": [
          {
            "id": 2,
            "name": "Mapeo",
            "description": "",
            "order": 1,
            "command": "sh command",
            "task_id": 2,
            "input_params": [
              {
                "id": 1,
                "name": "ntasks",
                "type": "integer",
                "optional": 1,
                "default_value": "32"
              },
              {
                "id": 2,
                "name": "mem",
                "type": "integer",
                "optional": 1,
                "default_value": "200"
              }
            ],
            "output_params": [
              {
                "id": 15,
                "name": "Archivo mapeo",
                "type": "file",
                "optional": 0,

              }
            ]
          }
        ]
      }
    )

  })
  test("SubTasksNext (Multiple  next_subtasks)", async ({ client }) => {
    const response = await client.get("next-subtasks/2/exam/1")
    response.assertStatus(200)
    response.assertBodyContains(
      {
        "previous": [],
        "next_subtasks": [
            {
                "id": 3,
                "name": "Organizar",
                "description": "",
                "order": 2,
                "command": "sh command",
                "task_id": 2,

                "input_params": [
                    {
                        "id": 1,
                        "name": "ntasks",
                        "type": "integer",
                        "optional": 1,

                        "default_value": "32"
                    },
                    {
                        "id": 2,
                        "name": "mem",
                        "type": "integer",
                        "optional": 1,

                        "default_value": "200"
                    },
                    {
                        "id": 3,
                        "name": "job-name",
                        "type": "string",
                        "optional": 1,

                        "default_value": "task2_subtask2"
                    },
                    {
                        "id": 4,
                        "name": "time",
                        "type": "time",
                        "optional": 1,

                        "default_value": "6:00:00"
                    },
                    {
                        "id": 11,
                        "name": "m",
                        "type": "string",
                        "optional": 1,

                        "default_value": "minimap2"
                    },
                    {
                        "id": 15,
                        "name": "Archivo mapeo",
                        "type": "file",
                        "optional": 0,

                        "default_value": null
                    }
                ],
                "output_params": [
                    {
                        "id": 16,
                        "name": "Archivo mapeo organizado",
                        "type": "file",
                        "optional": 0,

                    }
                ]
            }
        ]
    }
    )

  })

  test("SubTasksNext (Empty next_subtasks)", async ({ client }) => {
    const response = await client.get("next-subtasks/10/exam/1")
    response.assertStatus(204)
  })

})
