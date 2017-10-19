'use strict';

const should = require('should');
const request = require('supertest');
const app = require('../../../');
const models = require('../../../models');
const helper = require('../../../components/test-helper');
const errors = require('../../../components/errors');

describe('/v1/categories', () => {
  before('Sync database', () => helper.syncDb());

  describe('GET /v1/categories', () => {
    let categories = [{  name: 'RH' },];
    before('Insert seed data', () => helper.insertSeed(models['Category'], categories));
    after('Delete seed data', () => helper.deleteSeed(models['Category'], categories));

    it('should return 200 status code and array', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/categories'))
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.be.instanceOf(Array);
          res.body.length.should.be.equal(2);
          res.body[0].name.should.be.equal("FONDATION");
          res.body[1].name.should.be.equal("RH");
          done();
        });
    });
  });

  describe('GET /v1/categories/:id', () => {
    let categories = [{ id:3, name: 'RH' },];
    before('Insert seed data', () => helper.insertSeed(models['Category'], categories));
    after('Delete seed data', () => helper.deleteSeed(models['Category'], categories));

    it('should return 200 status code and an object', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/categories/3'))
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
        .get(helper.bindAccessToken('/v1/categories/abc'))
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('BadRequest');
          done();
        });
    });

    it('should return 404 status code on no id', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/categories/999'))
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('NotFound');
          done();
        });
    });
  });

  describe('POST /v1/categories', () => {
    let categories = [{ "name": "Toronto" }];
    after('Delete seed data', () => helper.deleteSeed(models['Category'], categories));

    it('should return 201 status code and new id', done => {
      request(app)
        .post(helper.bindAccessToken('/v1/categories'))
        .send(categories[0])
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
        .post(helper.bindAccessToken('/v1/categories'))
        .send({ name: ' ' })
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].should.have.property('errorCode', 'NameLength');
          done();
        });
    });
  });

  describe('PUT /v1/categories/:id', () => {
    let categories = [{ "id": 2, "name": "Paris" }];
    before('Insert seed data', () => helper.insertSeed(models['Category'], categories));
    after('Delete seed data', () => helper.deleteSeed(models['Category'], categories));

    it('should return 200 status code and an updated object', done => {
      request(app)
        .put(helper.bindAccessToken('/v1/categories/2'))
        .send({ name: 'Nantes' })
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.be.property('name', 'Nantes');
          res.body.should.be.property('id', 2);
          done();
        });
    });

    it('should return 400 status code on invalid id', done => {
      request(app)
        .put(helper.bindAccessToken('/v1/categories/abc'))
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('BadRequest');
          done();
        });
    });

    it('should return 404 status code on no id', done => {
      request(app)
        .put(helper.bindAccessToken('/v1/categories/999'))
        .send({ name: 'foo' })
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('NotFound');
          done();
        });
    });
  });

  describe('DELETE /v1/categories/:id', () => {
    let categories = [{ "id": 100, "name": "Paris" }];
    before('Insert seed data', () => helper.insertSeed(models['Category'], categories));
    after('Delete seed data', () => helper.deleteSeed(models['Category'], categories));

    it('should return 400 status code on invalid id', done => {
      request(app)
        .delete(helper.bindAccessToken('/v1/categories/abc'))
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('BadRequest');
          done();
        });
    });

    it('should return 404 status code on no id', done => {
      request(app)
        .delete(helper.bindAccessToken('/v1/categories/999'))
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('NotFound');
          done();
        });
    });

    it('should return 204 status code', done => {
      request(app)
        .delete(helper.bindAccessToken('/v1/categories/100'))
        .expect(204)
        .end(done);
    });
  });
});
