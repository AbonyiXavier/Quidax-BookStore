import fs from 'fs';
import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import server from "../../server";
import User from "../../Models/user";
import Book from "../../Models/book";
import { user, user2, rating, } from "./test.data";


chai.use(chatHttp);
const { expect } = chai;

const url = "/api/v1";

let accessToken;
let bookId;

  describe("it should register a user", () => {
    before(async () => {
     await User.deleteMany({ })
    //  await Book.deleteMany({ })

    const data = await Book.find({})
    for (const {_id } of data) {
      bookId = _id
    }
    });

  it("it should register a user successfully", async() => {
    const result = await chai.request(server)
      .post(`${url}/register`)
      .set('Accept', 'application/json')
      .send(user)
      expect(result.status).to.equal(201);
      expect(result.body.message).to.be.equal('User created successfully!');
  });

  it('It should not signup a user with duplicate details', async() => {
    const result = await chai.request(server)
      .post(`${url}/register`)
      .set('Accept', 'application/json')
      .send(user)
      expect(result.status).to.equal(400);
      expect(result.body.message).to.be.equal('email already in use.');
  });

  
  it('It should generate token when user logs in', async() => {
    const result = await chai.request(server)
      .post(`${url}/login`)
      .set('Accept', 'application/json')
      .send(user2)
      expect(result.status).to.equal(200);
      accessToken = result.body.data.accessToken
  });

  it('It should Add book', ( done ) => {
    const result =  chai.request(server)
      .post(`${url}/books`)
      .set('Authorization', accessToken)
      .set('content-type', 'multipart/form-data')
      .field('title', 'magic book')
      .field('description', 'best description')
      .field('author', 'XAvier Francis')
      .field('author_year', '2011')
      .field('price', 3000)
      .field('genere', 'love')
      .field('stockQuantity', 2)
      .attach('photo', fs.readFileSync(`${__dirname}/carbon.png`), 'test/controllers/carbon.png')
      done();
  });

  it('It should update book', ( done ) => {
    const result =  chai.request(server)
      .put(`${url}/books/${bookId}`)
      .set('Authorization', accessToken)
      .set('content-type', 'multipart/form-data')
      .field('title', 'magic book updated')
      .field('description', 'best description')
      .field('author', 'XAvier Francis')
      .field('author_year', '2020')
      .field('price', 3000)
      .field('genere', 'love')
      .field('stockQuantity', 2)
      .attach('photo', fs.readFileSync(`${__dirname}/carbon.png`), 'test/controllers/carbon.png')
      done();
  });

  it('It should fetch a book', async() => {
    const result = await chai.request(server)
      .get(`${url}/books/${bookId}`)
      .set('Authorization', accessToken)
      expect(result.body.message).to.be.equal('Book fetched successfully!');
  });

  it('It should list books', ( done ) => {
    const result = chai.request(server)
      .get(`${url}/books`)
      .set('Authorization', accessToken)
      done();
  });

  it('It should like a book', async() => {
    const result = await chai.request(server)
      .patch(`${url}/books/likes/${bookId}`)
      .set('Authorization', accessToken)
      expect(result.body.message).to.be.equal('likes was successfully');
  });

  it('It should post rating', async() => {
    const result = await chai.request(server)
      .post(`${url}/rating/${bookId}`)
      .set('Authorization', accessToken)
      .send(rating)
      expect(result.body.message).to.be.equal('Reviews added successfully');
  });

  it('It should display rating', async() => {
    const result = await chai.request(server)
      .get(`${url}/rating/${bookId}`)
      .set('Authorization', accessToken)
      expect(result.body.message).to.be.equal('Reviews fetched successfully');
  });

  it('It should add to cart', async() => {
    const result = await chai.request(server)
      .post(`${url}/books/cart`)
      .set('Authorization', accessToken)
      .send({
        bookId: bookId,
        quantity: 2
      })
      expect(result.body.message).to.be.equal('Book added successfully');
  });
  });

