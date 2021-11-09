const { Videogame, Genre } = require("../../src/db")
const { expect } = require('chai');

describe('Model Testing', function() {
 
  describe('Videogame model', function () {
    beforeEach(async function() {
      await Videogame.sync({ force: true });
    });
    describe('Validations', function () {
      it('No deberia crearse si no recibe todos los datos', function(done) {
         Videogame.create({
          name: 'Age of gabi',
         })
          .then(() => done('No se creó'))
          .catch(() => done());
      });
    });
  })
  describe('Genre model', function () {
    beforeEach(async function() {
      await Genre.sync({ force: true });
    });
    it('Name deberia ser un STRING', function(){
      expect(typeof Genre.name).equal("string")
    })
    });
})