const request = require('supertest');
const app = require('../app.js');
require('../models')
let id
test("Post /actors", async()=>{
    const actor = {
        firstName: "Charlotte",
        lastName: "Vega",
        nationality:"Madrid",
        image:"https://www.lavanguardia.com/peliculas-series/images/profile/1994/2/w300/legWa5GpB82M3KunyFjXPopkSc7.jpg",
        birthday:"1994-02-10"
    }
    const res = await request(app).post("/actors").send(actor)
    id = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toMatchObject(actor)
    expect(res.body.id).toBeDefined()
})

test("Put /actors", async()=>{
    const actor = {
        firstName: "Charlotte",
        lastName: "Vegas",
        nationality:"Madrid",
        image:"https://www.lavanguardia.com/peliculas-series/images/profile/1994/2/w300/legWa5GpB82M3KunyFjXPopkSc7.jpg",
        birthday:"1994-02-10"
    }
    const res = await request(app).put(`/actors/${id}`).send(actor)

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject(actor)
    expect(res.body.id).toBeDefined()
})

test("Get /actors", async()=>{
    const res = await request(app).get("/actors")
    expect(res.status).toBe(200)
})

test("Delete /actors", async()=>{
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204)
})