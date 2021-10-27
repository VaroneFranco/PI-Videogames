const { Router, application } = require('express');
const { getApi, getGame, getByName, getGenres, getAllData } = require('./utils')
const { Genre, Videogame } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');






const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", async (req, res) => {
    if (req.query.name) {
        return res.send(await getByName(req.query.name))
    }
    res.send(await getAllData())

})
router.get("/videogame/:id", async (req, res) => {
    res.send(await getGame(req.params.id))
})

router.get('/genres', async (req, res) => {
    let genres = await getGenres()
    console.log(genres)
    await genres.forEach(element => {
        Genre.findOrCreate({
            where: { name: element }
        })
    });
    res.send(await Genre.findAll())
})

router.post('/videogame', async (req, res) => {
    let {
        name,
        description,
        released,
        rating,
        platforms,
        img,
        genres
    } = req.body;

    let createdVGame = await Videogame.create({
        name,
        description,
        released,
        rating,
        img,
        platforms,
    });

    console.log(req.body)

    let genreDb = await Genre.findAll({ where: { name: genres } }); //name de tabla genre

    createdVGame.addGenre(genreDb);
    // console.log(createdVGame, 'genreeee', genreDb);
    res.send('Videogame created successfully!');
})

module.exports = router;
