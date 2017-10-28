'use strict';

const should = require('should');
const request = require('supertest');
const app = require('../../../');
const models = require('../../../models');
const helper = require('../../../components/test-helper');
const errors = require('../../../components/errors');

describe('/v1/responses', () => {
  before('Sync database', () => helper.syncDb());

  describe('GET /v1/users/1/responses', () => {
    let responses = [{ response: '1 2 3 SOLEIL !', user_id: 1, question_id: 1 }];
    before('Insert seed data', () => helper.insertSeed(models['Response'], responses));
    after('Delete seed data', () => helper.deleteSeed(models['Response'], responses));

    it('should return 200 status code and array', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/users/1/responses'))
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.be.instanceOf(Array);
          res.body.length.should.be.equal(2);
          res.body[0].response.should.be.equal("Lille");
          res.body[1].response.should.be.equal("1 2 3 SOLEIL !");
          done();
        });
    });
  });

  describe('GET /v1/responses/:id', () => {
    let responses = [{ id: 2, response: '1 2 3 SOLEIL !', user_id: 1 , question_id: 1 }];
    before('Insert seed data', () => helper.insertSeed(models['Response'], responses));
    after('Delete seed data', () => helper.deleteSeed(models['Response'], responses));

    it('should return 200 status code and an object', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/users/1/responses/1'))
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.be.instanceOf(Object);
          res.body.response.should.be.equal("1 2 3 SOLEIL !");
          done();
        });
    });

    it('should return 400 status code on invalid id', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/users/1/responses/abc'))
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('NotFound');
          done();
        });
    });

    it('should return 404 status code on no id', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/users/1/responses/999'))
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('NotFound');
          done();
        });
    });
  });

  describe('POST /v1/responses', () => {
    let responses = [{ response: '1 2 3 SOLEIL !', user_id: 1 }];
    after('Delete seed data', () => helper.deleteSeed(models['Response'], responses));

    it('should return 201 status code and new id', done => {
      request(app)
        .post(helper.bindAccessToken('/v1/users/1/responses'))
        .send(responses[0])
        .expect(201)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.property('id');
          res.body.id.should.be.not.empty;
          done();
        });
    });

    it('should return 400 status code on empty name', done => {
      request(app)
        .post(helper.bindAccessToken('/v1/users/1/responses'))
        .send({ response: ' ' })
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].should.have.property('errorCode', 'NameLength');
          done();
        });
    });
  });
});
