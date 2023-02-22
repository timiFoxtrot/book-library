import mongoose from "mongoose"
import app from "./src/app"
import request from "supertest"
import { MongoMemoryServer } from 'mongodb-memory-server';
import { describe } from "node:test";

describe("create a book", () => {
  let mongoServer: MongoMemoryServer
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), {})
  })
  afterAll(async () => {
    if(mongoServer) {
      await mongoServer.stop()
      await mongoose.disconnect()
    }
  })

  it('should create a book', async () => {
    const res = await request(app).post('/books/add-book').send({
      Title: "Annihilation",
      Author: "Timi Foxtrot",
      datePublished: "date",
      Description: "This is just a dummy description",
      pageCount: 12,
      Genre: "War",
      bookId: 2,
      Publisher: "Tim Prints"
    })

    expect(res.status).toEqual(201)
    expect(res.body).toHaveProperty('data')
  })
})