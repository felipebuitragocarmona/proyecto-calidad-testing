import { test } from '@japa/runner'
import Patient from 'App/Models/Patient'

test.group('Patients', () => {
  test("PatientsIndex", async ({ client }) => {
    const response = await client.get("/patients")
    response.assertStatus(200)
    response.assertBodyContains({
      data: [
        {
          document: "10539988",
          name: "Paciente 1",
          lastname: "Apellido P1",
        },
        {
          document: "75003344",
          name: "Paciente 2",
          lastname: "Apellido P2",
        }
      ]
    }
    )
  })


  test("getPatient", async ({ client }) => {
    let thePatient = await Patient.query().orderBy('id', 'asc').first()
    const response = await client.get(`/patients/${thePatient?.id}`)
    response.assertStatus(200)
    response.assertBodyContains(
      {
        document: "10539988",
        name: "Paciente 1",
        lastname: "Apellido P1",
      }
    )
  })

  test("createPatient", async ({ client, assert }) => {
    const response = await client.post("/patients")
      .json({
        document: "111222",
        name: "Paciente Prueba",
        lastname: "Apellido P3",
        birth_year:"2000-01-01"
      })
    response.assertStatus(200)
    let thePatient = await Patient.query().orderBy('id', 'desc').first()
    response.assertBodyContains({
      document: "111222",
      name: "Paciente Prueba",
      lastname: "Apellido P3",
      birth_year:"2000-01-01"
    })
  })

  test("updatePatient", async ({ client, assert }) => {
    let thePatient = await Patient.query().orderBy('id', 'asc').first()
    const response = await client.put(`/patients/${thePatient?.id}`)
      .json(
        {
          name: "Paciente Prueba",
          lastname: "Apellido P3",
          birth_year:"2000-01-01"
        }
      )
    response.assertStatus(200)

    //let updatedPatient = await Patient.query().orderBy('id', 'asc').first()
    response.assertBodyContains(
      {
        id:thePatient?.id,
        name: "Paciente Prueba",
        lastname: "Apellido P3",
        birth_year:"2000-01-01"
      }
    )
  })

  test("deletePatient", async ({ client, assert }) => {
    let patientsQuery = await Patient.query().count("* as total")
    let numberPatients = patientsQuery[0].$extras.total

    const response = await client.delete("/patients/" + numberPatients)
    response.assertStatus(204)

    let newQuery = await Patient.query().count("* as total")
    let newNumberPatients = newQuery[0].$extras.total
    assert.equal(numberPatients - 1, newNumberPatients)
  }).setup(async () => {
    let thePatient:object = {
      document: "123",
      name: "Paciente Prueba",
      lastname: "Apellido P3",
      birth_year:new Date("2000-01-01")
    }
    await Patient.create(thePatient);
  })
})
