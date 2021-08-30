const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const mongooseConnect = require('../../core');
const mongoose = require('mongoose');

describe('User CRUD operation tests', () => {
  before((done) => {
    mongooseConnect.dbConnect()
      .once('open', () => done())
      .on('error', (error) => done(error));
  });

  beforeEach((done) => {
    mongoose.connection.db.listCollections({ name: 'users' })
      .next((error, collection) => {
        if (collection) {
          mongoose.connection.db.dropCollection('users')
            .then(() => done())
            .catch((err) => done(err));
        } else {
          done(error);
        }
      });
  });

  after((done) => {
    mongooseConnect.dbClose()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('POST create user record in database, when a new user register request comes', (done) => {
    const payload = { _id: 1, name: 'testuser', email: 'test@test.com', password: 'testpassword' };
    request(app)
      .post('/api/users')
      .send(payload)
      .then((res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).haveOwnProperty('token');
        done();
      })
      .catch((err) => done(err));
  });

  it('GET fetch user record from the database for the given valida userID', (done) => {
    const requestParam = 'test@test1.com';
    request(app)
      .get(`/api/users/${requestParam}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEyZDJmNDMzYmE1MDA1OGVjZTJmMDBjIn0sImV4cCI6MTYzMDM1ODQzMSwiaWF0IjoxNjMwMzUxMjMxfQ.5sGErlHXRKhl5M54XqrrAKaUoRi_EGAC6AxFyYvDLk4')
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        console.log(res.body);
        done();
      })
      .catch((err) => done(err));
  });

  it.skip('Should throw error when try to create a duplicate user record with same email ID', (done) => {
    const payload = { name: 'testuser', email: 'test@test.com', password: 'testpassword' };
    request(app)
      .post('/api/users')
      .send(payload)
      .then((res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).haveOwnProperty('errors');
        done();
      })
      .catch((err) => done(err));
  });
});
