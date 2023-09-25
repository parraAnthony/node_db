const request = require('supertest');
const app = require('../app.js');
require('../models')
let id 

test("Get /genres", async()=>{
    const res = await request(app).get("/genres")
    expect(res.status).toBe(200)
})
test("Post /genres", async()=>{
    const genre = {
        name: "miedo"
    }
    const res = await request(app).post("/genres").send(genre)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toMatchObject(genre)
    expect(res.body.id).toBeDefined()
})
test("Put /genres", async()=>{
    const genre = {
        name: "terror"
    }
    const res = await request(app).put(`/genres/${id}`).send(genre)
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject(genre)
    expect(res.body.id).toBeDefined()
})
test("Delete /genres", async()=>{
    const res = await request(app).delete(`/genres/${id}`)
    expect(res.status).toBe(204)
})