import { test } from '@japa/runner'
import Exam from 'App/Models/Exam'

test.group('Exams', () => {
  test("ExamsIndex", async ({ client }) => {
    const response = await client.get("/exams")
    response.assertStatus(200)
    response.assertBodyContains({
      data: [{
        name: "Examen 1",
        patient_id: 1
      },
      {
        name: "Examen 1",
        patient_id: 2
      }
      ]
    }
    )
  })

  test("ExamsIndexByPatient", async ({ client }) => {
    let patient_id = 1
    const response = await client.get("/exams?patient_id=" + patient_id)
    response.assertStatus(200)
    response.assertBodyContains({
      data: [{
        name: "Examen 1",
        patient_id: 1
      },
      {
        name: "Examen 3",
        patient_id: 1
      }
      ]
    }
    )
  }).setup(async () => {
    let theExam: object = {
      name: "Examen 3",
      patient_id: 1
    }
    await Exam.create(theExam);
  })

  test("getExam", async ({ client }) => {
    let theExam = await Exam.query().orderBy('id', 'asc').first()
    const response = await client.get(`/exams/${theExam?.id}`)
    response.assertStatus(200)
    response.assertBodyContains(
      {
        name: "Examen 1",
        patient_id: 1
      }
    )
  })

  test("createExam", async ({ client, assert }) => {
    const response = await client.post("/exams")
      .json({
        name: "Examen 3",
        patient_id: 1
      })
    response.assertStatus(200)
    let theExam = await Exam.query().orderBy('id', 'desc').first()
    response.assertBodyContains({
      id: theExam?.id,
      name: "Examen 3",
      patient_id: 1
    })
  })

  test("updateExam", async ({ client, assert }) => {
    let theExam = await Exam.query().orderBy('id', 'asc').first()
    const response = await client.put(`/exams/${theExam?.id}`)
      .json(
        {
          name: "Examen 3",
          patient_id: 2
        }
      )
    response.assertStatus(200)

    //let updatedExam = await Exam.query().orderBy('id', 'asc').first()
    response.assertBodyContains(
      {
        id: theExam?.id,
        name: "Examen 3",
        patient_id: 2
      }
    )
  })

  test("deleteExam", async ({ client, assert }) => {
    let examnsQuery = await Exam.query().count("* as total")
    let numberExams = examnsQuery[0].$extras.total

    const response = await client.delete("/exams/" + numberExams)
    response.assertStatus(204)

    let newQuery = await Exam.query().count("* as total")
    let newNumberExams = newQuery[0].$extras.total
    assert.equal(numberExams - 1, newNumberExams)
  }).setup(async () => {
    let theExam = {
      name: "Examen 3",
      patient_id: 2
    }
    await Exam.create(theExam);
  })
})
