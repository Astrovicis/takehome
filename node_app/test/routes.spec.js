process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../app')
const knex = require('../db/knex')

chai.use(chaiHttp)

describe('API Routes', () => {
  beforeEach(() =>
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
  )

  afterEach(() => knex.migrate.rollback())

  describe('GET /api/v1/addresses', () => {
    it('should return all addresses', (done) => {
      chai
        .request(server)
        .get('/api/v1/addresses')
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.json // jshint ignore:line
          res.body.should.be.a('array')
          res.body.length.should.equal(8)
          res.body[0].should.have.property('line1')
          res.body[0].line1.should.equal('Massachusetts Hall')
          should.not.exist(res.body[0].line2)
          res.body[0].should.have.property('city')
          res.body[0].city.should.equal('Cambridge')
          res.body[0].should.have.property('state')
          res.body[0].state.should.equal('MA')
          res.body[0].should.have.property('zip')
          res.body[0].zip.should.equal('02138')
          res.body[0].should.have.property('created_at')
          res.body[0].should.have.property('updated_at')
          done()
        })
    })
  })
  describe('GET /api/v1/addresses/:id', () => {
    it('should return a single address', (done) => {
      chai
        .request(server)
        .get('/api/v1/addresses/2')
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.json // jshint ignore:line
          res.body.should.be.a('object')
          res.body.should.have.property('line1')
          res.body.line1.should.equal('3400 N. Charles St.')
          res.body.should.have.property('line2')
          should.not.exist(res.body.line2)
          res.body.should.have.property('city')
          res.body.city.should.equal('Baltimore')
          res.body.should.have.property('state')
          res.body.state.should.equal('MD')
          res.body.should.have.property('zip')
          res.body.zip.should.equal('21218')
          res.body.should.have.property('created_at')
          res.body.should.have.property('updated_at')
          done()
        })
    })
  })

  describe('POST /api/v1/addresses', () => {
    it('should add an address', (done) => {
      chai
        .request(server)
        .post('/api/v1/addresses')
        .send({
          line1: '1234 Milky Way NE',
          city: 'Delta',
          state: 'QA',
          zip: '54321'
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.json // jshint ignore:line
          res.body.should.be.a('object')
          res.body.should.have.property('line1')
          res.body.line1.should.equal('1234 Milky Way NE')
          res.body.should.have.property('line2')
          should.not.exist(res.body.line2)
          res.body.should.have.property('city')
          res.body.city.should.equal('Delta')
          res.body.should.have.property('state')
          res.body.state.should.equal('QA')
          res.body.should.have.property('zip')
          res.body.zip.should.equal('54321')
          res.body.should.have.property('created_at')
          res.body.should.have.property('updated_at')
          res.body.created_at.should.equal(res.body.updated_at)
          done()
        })
    })
  })

  describe('PUT /api/v1/addresses/:id', () => {
    it('should update an address', (done) => {
      chai
        .request(server)
        .put('/api/v1/addresses/8')
        .send({
          zip: '01234',
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.json // jshint ignore:line
          res.body.should.be.a('object')
          res.body.should.have.property('line1')
          res.body.line1.should.equal('185 Berry St')
          res.body.should.have.property('line2')
          res.body.line2.should.equal('Suite 6100')
          res.body.should.have.property('city')
          res.body.city.should.equal('San Francisco')
          res.body.should.have.property('state')
          res.body.state.should.equal('CA')
          res.body.should.have.property('zip')
          res.body.zip.should.equal('01234')
          res.body.should.have.property('created_at')
          res.body.should.have.property('updated_at')
          done()
        })
    })
    it('should NOT update an address if the id field is part of the request', (done) => {
      chai
        .request(server)
        .put('/api/v1/addresses/1')
        .send({
          id: 8,
          zip: '43210',
        })
        .end((err, res) => {
          res.should.have.status(422)
          res.should.be.json // jshint ignore:line
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          res.body.error.should.equal('You cannot update the id field')
          done()
        })
    })
  })

  describe('DELETE /api/v1/addresses/:id', () => {
    it('should delete an address', (done) => {
      chai
        .request(server)
        .delete('/api/v1/addresses/8')
        .end((error, res) => {
          res.should.have.status(200)
          res.should.be.json // jshint ignore:line
          res.body.should.be.a('object')
          res.body.should.have.property('line1')
          res.body.line1.should.equal('185 Berry St')
          res.body.should.have.property('line2')
          res.body.line2.should.equal('Suite 6100')
          res.body.should.have.property('city')
          res.body.city.should.equal('San Francisco')
          res.body.should.have.property('state')
          res.body.state.should.equal('CA')
          res.body.should.have.property('zip')
          res.body.zip.should.equal('94107')
          res.body.should.have.property('created_at')
          res.body.should.have.property('updated_at')
          chai
            .request(server)
            .get('/api/v1/addresses')
            .end((err, res) => {
              res.should.have.status(200)
              res.should.be.json // jshint ignore:line
              res.body.should.be.a('array')
              res.body.length.should.equal(7)
              res.body[6].should.have.property('line1')
              res.body[6].line1.should.equal('500 S State St')
              res.body[6].should.have.property('city')
              res.body[6].city.should.equal('Ann Arbor')
              res.body[6].should.have.property('state')
              res.body[6].state.should.equal('MI')
              res.body[6].should.have.property('zip')
              res.body[6].zip.should.equal('48109')
              res.body[6].should.have.property('created_at')
              res.body[6].should.have.property('updated_at')
              done()
            })
        })
    })
  })
})
