const request = require('supertest');
const app = require('../app.js');
require('../models')
let id
test("Post /directors", async()=>{
    const director = {
        firstName: "Charlotte",
        lastName: "Vega",
        nationality:"Madrid",
        image:"https://www.lavanguardia.com/peliculas-series/images/profile/1994/2/w300/legWa5GpB82M3KunyFjXPopkSc7.jpg",
        birthday:"1994-02-10"
    }
    const res = await request(app).post("/directors").send(director)
    id = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toMatchObject(director)
    expect(res.body.id).toBeDefined()
})

test("Put /directors", async()=>{
    const director = {
        firstName: "Charlotte",
        lastName: "Vegas",
        nationality:"Madrid",
        image:"https://www.lavanguardia.com/peliculas-series/images/profile/1994/2/w300/legWa5GpB82M3KunyFjXPopkSc7.jpg",
        birthday:"1994-02-10"
    }
    const res = await request(app).put(`/directors/${id}`).send(director)

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject(director)
    expect(res.body.id).toBeDefined()
})

test("Get /directors", async()=>{
    const res = await request(app).get("/directors")
    expect(res.status).toBe(200)
})

test("Delete /directors", async()=>{
    const res = await request(app).delete(`/directors/${id}`)
    expect(res.status).toBe(204)
})