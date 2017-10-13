'use strict';

const should = require('should');
const request = require('supertest');
const app = require('../../../');
const models = require('../../../models');
const helper = require('../../../components/test-helper');
const errors = require('../../../components/errors');

describe('/v1/questions', () => {
  before('Sync database', () => helper.syncDb());

  describe('GET /v1/questions', () => {
    let questions = [{ category_id: 1, question: 'Le projet qui te semble le plus interessant', response: 'toto', isEnable: true, type_id: 1 }];
    before('Insert seed data', () => helper.insertSeed(models['Question'], questions));
    after('Delete seed data', () => helper.deleteSeed(models['Question'], questions));

    it('should return 200 status code and array', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/questions'))
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.be.instanceOf(Array);
          res.body.length.should.be.equal(2);
          res.body[0].question.should.be.equal("C'est la saint xxx, A toi de jouer en trouvant un collaborateur et en lui souhaitant sa fête ?");
          res.body[1].question.should.be.equal("Le projet qui te semble le plus interessant");
          done();
        });
    });
  });

  describe('GET /v1/questions/:id', () => {
    let questions = [{id:2, category_id: 1, question: 'Le projet qui te semble le plus interessant', response: 'toto', isEnable: true, type_id: 1 }];
    before('Insert seed data', () => helper.insertSeed(models['Question'], questions));
    after('Delete seed data', () => helper.deleteSeed(models['Question'], questions));

    it('should return 200 status code and an object', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/questions/2'))
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.be.instanceOf(Object);
          res.body.response.should.be.equal("toto");
          done();
        });
    });

    it('should return 400 status code on invalid id', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/questions/abc'))
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('BadRequest');
          done();
        });
    });

    it('should return 404 status code on no id', done => {
      request(app)
        .get(helper.bindAccessToken('/v1/questions/999'))
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('NotFound');
          done();
        });
    });
  });

  describe('POST /v1/questions', () => {
    let questions = [{ category_id: 1, question: 'Le projet qui te semble le plus interessant', response: 'toto', isEnable: true, type_id: 1 }];
    after('Delete seed data', () => helper.deleteSeed(models['Question'], questions));

    it('should return 201 status code and new id', done => {
      request(app)
        .post(helper.bindAccessToken('/v1/questions'))
        .send(questions[0])
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
        .post(helper.bindAccessToken('/v1/questions'))
        .send({ question: ' ' })
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].should.have.property('errorCode', 'NameLength');
          done();
        });
    });
  });

  describe('PUT /v1/questions/:id', () => {
    let questions = [{id:2, category_id: 1, question: 'Le projet qui te semble le plus interessant', response: 'toto', isEnable: true, type_id: 1 }];
    before('Insert seed data', () => helper.insertSeed(models['Question'], questions));
    after('Delete seed data', () => helper.deleteSeed(models['Question'], questions));

    it('should return 200 status code and an updated object', done => {
      request(app)
        .put(helper.bindAccessToken('/v1/questions/2'))
        .send({ question: 'Le projet le plus cool ?' })
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.be.property('question', 'Le projet le plus cool ?');
          res.body.should.be.property('id', 2);
          done();
        });
    });

    it('should return 400 status code on invalid id', done => {
      request(app)
        .put(helper.bindAccessToken('/v1/questions/abc'))
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('BadRequest');
          done();
        });
    });

    it('should return 404 status code on no id', done => {
      request(app)
        .put(helper.bindAccessToken('/v1/questions/999'))
        .send({ question: 'foo' })
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('NotFound');
          done();
        });
    });
  });

  describe('DELETE /v1/questions/:id', () => {
    let questions = [{id:100, category_id: 1, question: 'Le projet qui te semble le plus interessant', response: 'toto', isEnable: true, type_id: 1 }];
    before('Insert seed data', () => helper.insertSeed(models['Question'], questions));
    after('Delete seed data', () => helper.deleteSeed(models['Question'], questions));

    it('should return 400 status code on invalid id', done => {
      request(app)
        .delete(helper.bindAccessToken('/v1/questions/abc'))
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('BadRequest');
          done();
        });
    });

    it('should return 404 status code on no id', done => {
      request(app)
        .delete(helper.bindAccessToken('/v1/questions/999'))
        .expect(404)
        .end((err, res) => {
          if (err) throw err;
          res.body[0].errorCode.should.be.equal('NotFound');
          done();
        });
    });

    it('should return 204 status code', done => {
      request(app)
        .delete(helper.bindAccessToken('/v1/questions/100'))
        .expect(204)
        .end(done);
    });
  });
});
