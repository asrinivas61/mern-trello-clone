const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const mongooseConnect = require('../../core');
const mongoose = require('mongoose');
const { set } = require('../../app');

describe('List CRUD operation tests', () => {
  before((done) => {
    mongooseConnect.dbConnect()
      .once('open', () => done())
      .on('error', (error) => done(error));
  });

  beforeEach((done) => {
    mongoose.connection.db.listCollections({ name: 'lists' })
      .next((error, collection) => {
        if (collection) {
          mongoose.connection.db.dropCollection('lists')
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

  it('POST create a new list under the given board ID and title', (done) => {
    const payload = { title: 'test title' };
    request(app)
      .post('/api/lists/')
      .send(payload)
      .set('boardId', '612d3a9457b8b7618a2fbc21')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEyZDM4OWIzZGI3ODQ1ZmRmMjUyNjZiIn0sImV4cCI6MTYzMDM2MTMxMCwiaWF0IjoxNjMwMzU0MTEwfQ.dpJrDlctE0ljj9IrsoTXt3WzoiRVi5fJfio2sEBxO3w')
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).haveOwnProperty('cards');
        done();
      })
      .catch((err) => done(err));
  });

//   it('GET fetch user record from the database for the given valida userID', (done) => {
//     const requestParam = 'test@test1.com';
//     request(app)
//       .get(`/api/users/${requestParam}`)
//       .set('Content-Type', 'application/json')
//       .set('Accept', 'application/json')
//       .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEyZDJmNDMzYmE1MDA1OGVjZTJmMDBjIn0sImV4cCI6MTYzMDM1ODQzMSwiaWF0IjoxNjMwMzUxMjMxfQ.5sGErlHXRKhl5M54XqrrAKaUoRi_EGAC6AxFyYvDLk4')
//       .then((res) => {
//         expect(res.statusCode).to.equal(200);
//         console.log(res.body);
//         done();
//       })
//       .catch((err) => done(err));
//   });

//   it.skip('Should throw error when try to create a duplicate user record with same email ID', (done) => {
//     const payload = { name: 'testuser', email: 'test@test.com', password: 'testpassword' };
//     request(app)
//       .post('/api/users')
//       .send(payload)
//       .then((res) => {
//         expect(res.statusCode).to.equal(400);
//         expect(res.body).haveOwnProperty('errors');
//         done();
//       })
//       .catch((err) => done(err));
//   });
});
