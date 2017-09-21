'use strict';

const should = require('should');
const request = require('supertest');
const app = require('../../../');
const models = require('../../../models');
const helper = require('../../../components/test-helper');
const errors = require('../../../components/errors');

describe('/v1/quizzs', () => {
  before('Sync database', () => helper.syncDb());

  describe('GET /v1/quizzs', () => {
    let quizzs = [{ name: 'RH' }];
    before('Insert seed data', () => helper.insertSeed(models['Quizz'], quizzs));
    after('Delete seed data', () => helper.deleteSeed(models['Quizz'], quizzs));

    it('should return 200 status code and array', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/quizzs'))
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.be.instanceOf(Array);
          res.body.length.should.be.equal(2);
          res.body[0].name.should.be.equal("INTEGRATION");
          res.body[1].name.should.be.equal("RH");
          done();
        });
    });
  });

  describe('GET /v1/quizzs/:id', () => {
    let quizzs = [{id:2, name: 'RH' }];
    before('Insert seed data', () => helper.insertSeed(models['Quizz'], quizzs));
    after('Delete seed data', () => helper.deleteSeed(models['Quizz'], quizzs));

    it('should return 200 status code and an object', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/quizzs/2'))
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.be.instanceOf(Object);
          res.body.name.should.be.equal("RH");
          done();
        });
    });

    it('should return 400 status code on invalid id', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/quizzs/abc'))
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('BadRequest');
          done();
        });
    });

    it('should return 404 status code on no id', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/quizzs/999'))
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('NotFound');
          done();
        });
    });
  });

  describe('POST /v1/quizzs', () => {
    let quizzs = [{ name: 'RESOURCES HUMAINE' }];
    after('Delete seed data', () => helper.deleteSeed(models['Quizz'], quizzs));

    it('should return 201 status code and new id', done => {
      request(app)
        .post(helper.bindAccessToken('/v1/quizzs'))
        .send(quizzs[0])
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
        .post(helper.bindAccessToken('/v1/quizzs'))
        .send({ name: ' ' })
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].should.have.property('errorCode', 'NameLength');
          done();
        });
    });
  });

  describe('PUT /v1/quizzs/:id', () => {
    let quizzs = [{ id: 2, name: 'RH' }];
    before('Insert seed data', () => helper.insertSeed(models['Quizz'], quizzs));
    after('Delete seed data', () => helper.deleteSeed(models['Quizz'], quizzs));

    it('should return 200 status code and an updated object', done => {
      request(app)
        .put(helper.bindAccessToken('/v1/quizzs/2'))
        .send({ name: 'VIE' })
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.be.property('name', 'VIE');
          res.body.should.be.property('id', 2);
          done();
        });
    });

    it('should return 400 status code on invalid id', done => {
      request(app)
        .put(helper.bindAccessToken('/v1/quizzs/abc'))
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('BadRequest');
          done();
        });
    });

    it('should return 404 status code on no id', done => {
      request(app)
        .put(helper.bindAccessToken('/v1/quizzs/999'))
        .send({ name: 'foo' })
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('NotFound');
          done();
        });
    });
  });

  describe('DELETE /v1/quizzs/:id', () => {
    let quizzs = [{ id: 100, name: 'RH' }];
    before('Insert seed data', () => helper.insertSeed(models['Quizz'], quizzs));
    after('Delete seed data', () => helper.deleteSeed(models['Quizz'], quizzs));

    it('should return 400 status code on invalid id', done => {
      request(app)
        .delete(helper.bindAccessToken('/v1/quizzs/abc'))
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('BadRequest');
          done();
        });
    });

    it('should return 404 status code on no id', done => {
      request(app)
        .delete(helper.bindAccessToken('/v1/quizzs/999'))
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('NotFound');
          done();
        });
    });

    it('should return 204 status code', done => {
      request(app)
        .delete(helper.bindAccessToken('/v1/quizzs/100'))
        .expect(204)
        .end(done);
    });
  });
});
