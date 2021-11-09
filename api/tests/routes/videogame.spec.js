const { expect } = require("chai")
const session = require("supertest-session")
const app = require("../../src/app")
const { Videogame, Genre, conn } = require("../../src/db")

const agent = session(app)


describe("Videogames routes", () => {
  before(() =>
  conn.authenticate().catch((err) => {
      console.error("No se pudo conectar a la base de datos", err)
    })
  )

  describe('/videogames', function() {
    it('GET responde con un status 200', function(){
      return agent
        .get('/videogames')
        .expect(function(res){
          expect(res.status).equal(200)})
    }).timeout(8000);
  })
  describe('/videogames?name=', function() {
    it('GET responde con status 200 si encuentra un videojuego', function() {
      return agent 
        .get('/videogames?name=mario') 
        .expect(function(res){
          expect(res.status).equal(200)}); 
        }).timeout(8000);
  })
  describe('/videogame/:id', function() {
    it('GET responde con status 200 si encuentra un videojuego por id',  function() {
      return agent 
        .get('/videogame/3498') 
        .expect(function(res){
          expect(res.status).equal(200)}); 
        }).timeout(8000);
  })
});