'use strict';

const should = require('should');
const request = require('supertest');
const app = require('../../../');
const models = require('../../../models');
const helper = require('../../../components/test-helper');
const errors = require('../../../components/errors');

describe('/v1/types', () => {
  before('Sync database', () => helper.syncDb());

  describe('GET /v1/types', () => {
    let types = [{name: 'QCM' }];
    before('Insert seed data', () => helper.insertSeed(models['Type'], types));
    after('Delete seed data', () => helper.deleteSeed(models['Type'], types));

    it('should return 200 status code and array', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/types'))
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.be.instanceOf(Array);
          res.body.length.should.be.equal(2);
          res.body[0].name.should.be.equal("FREE");
          res.body[1].name.should.be.equal("QCM");
          done();
        });
    });
  });

  describe('GET /v1/types/:id', () => {
    let types = [{ id: 2, name: 'QCM' }];
    before('Insert seed data', () => helper.insertSeed(models['Type'], types));
    after('Delete seed data', () => helper.deleteSeed(models['Type'], types));

    it('should return 200 status code and an object', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/types/2'))
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.be.instanceOf(Object);
          res.body.name.should.be.equal("QCM");
          done();
        });
    });

    it('should return 400 status code on invalid id', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/types/abc'))
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('BadRequest');
          done();
        });
    });

    it('should return 404 status code on no id', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/types/999'))
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('NotFound');
          done();
        });
    });
  });

  describe('POST /v1/types', () => {
    let types = [{name: 'QCM' }];
    after('Delete seed data', () => helper.deleteSeed(models['Type'], types));

    it('should return 201 status code and new id', done => {
      request(app)
        .post(helper.bindAccessToken('/v1/types'))
        .send(types[0])
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
        .post(helper.bindAccessToken('/v1/types'))
        .send({ name: ' ' })
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].should.have.property('errorCode', 'NameLength');
          done();
        });
    });

    it('should return 409 status code on duplicated name', done => {
      request(app)
        .post(helper.bindAccessToken('/v1/types'))
        .send(types[0])
        .expect(409)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].should.have.property('errorCode', errors.code('Conflict'));
          done();
        });
    });
  });

  describe('PUT /v1/types/:id', () => {
    let types = [{ id: 2, name: 'QCM' }];
    before('Insert seed data', () => helper.insertSeed(models['Type'], types));
    after('Delete seed data', () => helper.deleteSeed(models['Type'], types));

    it('should return 200 status code and an updated object', done => {
      request(app)
        .put(helper.bindAccessToken('/v1/types/2'))
        .send({ name: 'NEW' })
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.be.property('name', 'NEW');
          res.body.should.be.property('id', 2);
          done();
        });
    });

    it('should return 400 status code on invalid id', done => {
      request(app)
        .put(helper.bindAccessToken('/v1/types/abc'))
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('BadRequest');
          done();
        });
    });

    it('should return 404 status code on no id', done => {
      request(app)
        .put(helper.bindAccessToken('/v1/types/999'))
        .send({ name: 'foo' })
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('NotFound');
          done();
        });
    });
  });

  describe('DELETE /v1/types/:id', () => {
    let types = [{ id: 100, name: 'QCM' }];
    before('Insert seed data', () => helper.insertSeed(models['Type'], types));
    after('Delete seed data', () => helper.deleteSeed(models['Type'], types));

    it('should return 400 status code on invalid id', done => {
      request(app)
        .delete(helper.bindAccessToken('/v1/types/abc'))
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('BadRequest');
          done();
        });
    });

    it('should return 404 status code on no id', done => {
      request(app)
        .delete(helper.bindAccessToken('/v1/types/999'))
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('NotFound');
          done();
        });
    });

    it('should return 204 status code', done => {
      request(app)
        .delete(helper.bindAccessToken('/v1/types/100'))
        .expect(204)
        .end(done);
    });
  });
});
