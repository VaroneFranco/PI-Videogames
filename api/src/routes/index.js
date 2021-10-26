const { Router, application } = require('express');
const { getApi, getGame, getByName, getGenres, getAllData } = require('./utils')
const { Genre, Videogame } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const API_KEY = "1f02d81818664102a6fa63065e5be1ab"





const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", async (req, res) => {
    if (req.query.name) return res.send(await getByName(req.query.name))
    res.send(await getAllData())

})
router.get("/videogame/:id", async (req, res) => {
    res.send(await getGame(req.params.id))
})

router.get('/genres', async (req, res) => {
    let genres = await getGenres()
    console.log(genres)
    genres.forEach(element => {
        Genre.findOrCreate({
            where: { name: element }
        })
    });
    res.send(await Genre.findAll())
})

router.post('/videogame', async (req, res) => {
   let newGame= await Videogame.create({
        where: {
            name: req.body.name,
            img: req.body.background_image,
            platforms: req.body.platforms,
            description: req.body.description,
            stores: req.body.stores ? req.body.released : null,
            released: req.body.released ? req.body.released : null,
        }
    })
    let genre=await Genre.findAll({where:{
        name: req.body.genre
    }})
    newGame.addGenre(genre)
    res.send("Juego creado con éxito")
})

module.exports = router;
