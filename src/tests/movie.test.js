const request = require('supertest');
const app = require('../app.js');
require('../models')
let id
test("Post /movies create", async()=>{
    const movie = {
        name: "Edén",
        image: "https://es.web.img3.acsta.net/pictures/22/08/01/10/27/4985647.jpg",
        synopsis: "Cuatro personas comparten techo en Edén, un hermoso paraje perdido en la naturaleza. Todos ellos han contactado con una empresa clandestina con el mismo objetivo, acabar con sus vidas",
        releaseYear: "2022-10-28"
    }
    const res = await request(app).post("/movies").send(movie)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toMatchObject(movie)
    expect(res.body.id).toBeDefined()
})

test("Put /movies", async()=>{
    const movie = {
        name: "Edén",
        image: "https://es.web.img3.acsta.net/pictures/22/08/01/10/27/4985647.jpg",
        synopsis: "Cuatro personas comparten techo en Edén, un hermoso paraje perdido en la naturaleza. Todos ellos han contactado con una empresa clandestina con el mismo objetivo, acabar con sus vidas",
        releaseYear: "2022-10-14"
    }
    const res = await request(app).put(`/movies/${id}`).send(movie)
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject(movie)
    expect(res.body.id).toBeDefined()
})

test("Put /movies", async()=>{
    const movie = {
        name: "Edén",
        image: "https://es.web.img3.acsta.net/pictures/22/08/01/10/27/4985647.jpg",
        synopsis: "Cuatro personas comparten techo en Edén, un hermoso paraje perdido en la naturaleza. Todos ellos han contactado con una empresa clandestina con el mismo objetivo, acabar con sus vidas",
        releaseYear: "2022-10-14"
    }
    const res = await request(app).put(`/movies/${id}`).send(movie)
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject(movie)
    expect(res.body.id).toBeDefined()
})

test("Post /movies/:id/actors", async()=>{
    const actor = await Actor.create({
        firstName: "Charlotte",
        lastName: "Vegas",
        nationality:"Madrid",
        image:"https://www.lavanguardia.com/peliculas-series/images/profile/1994/2/w300/legWa5GpB82M3KunyFjXPopkSc7.jpg",
        birthday:"1994-02-10"
    })
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id])
    await actor.destroy()
    expect(res.status).toBe(201)

})

test("Post /movies/:id/directors", async()=>{
    const director = await Director.create({
        firstName: "Charlotte",
        lastName: "Vegas",
        nationality:"Madrid",
        image:"https://www.lavanguardia.com/peliculas-series/images/profile/1994/2/w300/legWa5GpB82M3KunyFjXPopkSc7.jpg",
        birthday:"1994-02-10"
    })
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id])
    await director.destroy()
    expect(res.status).toBe(201)

})

test("Post /movies/:id/genres", async()=>{
    const genre =  {
        name: "miedo"
    }
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id])
    await genre.destroy()
    expect(res.status).toBe(201)

})

test("Get /movies", async()=>{
    const res = await request(app).get("/movies")
    expect(res.status).toBe(200)
})

test("Delete /movies", async()=>{
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204)
})