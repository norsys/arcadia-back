'use strict';

const should = require('should');
const request = require('supertest');
const app = require('../../../');
const models = require('../../../models');
const helper = require('../../../components/test-helper');
const errors = require('../../../components/errors');

describe('/v1/users', () => {
  before('Sync database', () => helper.syncDb());

  describe('GET /v1/users', () => {
    let users = [{"firstName":"Vinson","lastName":"Shelley","nickName":"Johnston","sex":"F","agenceId":5,"city":"Deerlijk","avatar":"mi","email":"mauris@feugiat.co.uk"},{"firstName":"Burch","lastName":"Cullen","nickName":"Duran","sex":"F","agenceId":4,"city":"Germersheim","avatar":"Fusce","email":"egestas@quam.ca"},{"firstName":"Bell","lastName":"Sade","nickName":"Mcintosh","sex":"F","agenceId":4,"city":"Hartford","avatar":"Nunc","email":"scelerisque.sed.sapien@Cras.co.uk"}];    
    before('Insert seed data', () => helper.insertSeed(models['User'], users));
    after('Delete seed data', () => helper.deleteSeed(models['User'], users));

    it('should return 200 status code and array', done => {
      request(app)
          .get(helper.bindAccessToken('/v1/users'))
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.be.instanceOf(Array);
            res.body.length.should.be.equal(4);
            res.body[0].firstName.should.be.equal("Franklin");
            res.body[1].firstName.should.be.equal("Vinson");
            res.body[2].firstName.should.be.equal("Burch");
            res.body[3].firstName.should.be.equal("Bell");
            done();
          });
    });
  });

  describe('GET /v1/users/:id', () => {
    let users = [{"id":2,"firstName":"Vinson","lastName":"Shelley","nickName":"Johnston","sex":"F","agenceId":5,"city":"Deerlijk","avatar":"mi","email":"mauris@feugiat.co.uk"},{"firstName":"Burch","lastName":"Cullen","nickName":"Duran","sex":"F","agenceId":4,"city":"Germersheim","avatar":"Fusce","email":"egestas@quam.ca"},{"firstName":"Bell","lastName":"Sade","nickName":"Mcintosh","sex":"F","agenceId":4,"city":"Hartford","avatar":"Nunc","email":"scelerisque.sed.sapien@Cras.co.uk"}];    
    before('Insert seed data', () => helper.insertSeed(models['User'], users));
    after('Delete seed data', () => helper.deleteSeed(models['User'], users));

    it('should return 200 status code and an object', done => {
      request(app)
          .get(helper.bindAccessToken('/v1/users/2'))
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.be.instanceOf(Object);
            res.body.firstName.should.be.equal("Vinson");
            done();
          });
    });

    it('should return 400 status code on invalid id', done => {
      request(app)
          .get(helper.bindAccessToken('/v1/users/abc'))
          .expect(400)
          .end((err, res) => {
            if (err) throw err;
            res.body[0].errorCode.should.be.equal('BadRequest');
            done();
          });
    });

    it('should return 404 status code on no id', done => {
      request(app)
          .get(helper.bindAccessToken('/v1/users/999'))
          .expect(404)
          .end((err, res) => {
            if (err) throw err;
            res.body[0].errorCode.should.be.equal('NotFound');
            done();
          });
    });
  });

  describe('POST /v1/users', () => {
    let users = [{"firstName":"Vinson","lastName":"Shelley","nickName":"Johnston","sex":"F","city":"Deerlijk","avatar":"mi","email":"mauris@feugiat.co.uk"}];    
    after('Delete seed data', () => helper.deleteSeed(models['User'], users));

    it('should return 201 status code and new id', done => {
      request(app)
          .post(helper.bindAccessToken('/v1/users'))
          .send(users[0])
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
          .post(helper.bindAccessToken('/v1/users'))
          .send({email: ' '})
          .expect(400)
          .end((err, res) => {
            if (err) throw err;
            res.body[0].should.have.property('errorCode', 'NameLength');
            done();
          });
    });

    it('should return 409 status code on duplicated name', done => {
      request(app)
          .post(helper.bindAccessToken('/v1/users'))
          .send(users[0])
          .expect(409)
          .end((err, res) => {
            if (err) throw err;
            res.body[0].should.have.property('errorCode', errors.code('Conflict'));
            done();
          });
    });
  });

  describe('PUT /v1/users/:id', () => {
    let users = [{"id":100,"firstName":"toto","lastName":"Shelley","nickName":"Johnston","sex":"F",agency_id:1,"city":"Deerlijk","avatar":"mi","email":"mauris@feugiat.co.uk"}];    
    before('Insert seed data', () => helper.insertSeed(models['User'], users));
    after('Delete seed data', () => helper.deleteSeed(models['User'], users));

    it('should return 200 status code and an updated object', done => {
      request(app)
          .put(helper.bindAccessToken('/v1/users/100'))
          .send({firstName: 'tata'})
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.be.property('firstName', 'tata');
            res.body.should.be.property('id', 100);
            done();
          });
    });

    it('should return 400 status code on invalid id', done => {
      request(app)
          .put(helper.bindAccessToken('/v1/users/abc'))
          .expect(400)
          .end((err, res) => {
            if (err) throw err;
            res.body[0].errorCode.should.be.equal('BadRequest');
            done();
          });
    });

    it('should return 404 status code on no id', done => {
      request(app)
          .put(helper.bindAccessToken('/v1/users/999'))
          .send({email: 'foo'})
          .expect(404)
          .end((err, res) => {
            if (err) throw err;
            res.body[0].errorCode.should.be.equal('NotFound');
            done();
          });
    });
  });

  describe('DELETE /v1/users/:id', () => {
    let users = [{id:2,"firstName":"Vinson","lastName":"Shelley","nickName":"Johnston","sex":"F","agenceId":5,"city":"Deerlijk","avatar":"mi","email":"mauris@feugiat.co.uk"}];    
    before('Insert seed data', () => helper.insertSeed(models['User'], users));
    after('Delete seed data', () => helper.deleteSeed(models['User'], users));

    it('should return 400 status code on invalid id', done => {
      request(app)
          .delete(helper.bindAccessToken('/v1/users/abc'))
          .expect(400)
          .end((err, res) => {
            if (err) throw err;
            res.body[0].errorCode.should.be.equal('BadRequest');
            done();
          });
    });

    it('should return 404 status code on no id', done => {
      request(app)
          .delete(helper.bindAccessToken('/v1/users/999'))
          .expect(404)
          .end((err, res) => {
            if (err) throw err;
            res.body[0].errorCode.should.be.equal('NotFound');
            done();
          });
    });

    it('should return 204 status code', done => {
      request(app)
          .delete(helper.bindAccessToken('/v1/users/2'))
          .expect(204)
          .end(done);
    });
  });
});
