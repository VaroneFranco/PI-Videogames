const { Router, application } = require('express');
const { getApi, getGame, getByName, getGenres, getAllData } = require('./utils')
const { Genre, Videogame } = require('../db')
const axios = require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');






const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", async (req, res) => {
    if (req.query.name) {
        return res.send(await getByName(req.query.name))
    }
    res.status(200).send(await getAllData())

})
router.get("/videogame/:id", async (req, res) => {
    res.status(200).send(await getGame(req.params.id))
})

router.get('/genres', async (req, res) => {
    let genres = await getGenres()
    
    await genres.forEach(element => {
        Genre.findOrCreate({
            where: { name: element }
        })
    });
    res.status(200).send(await Genre.findAll())
})

router.get('/platforms', async(req, res)=>{
    let platforms= await axios.get('https://api.rawg.io/api/platforms/lists/parents?key=1f02d81818664102a6fa63065e5be1ab')
    platforms= platforms.data.results.map(pf => pf.name)
    res.status(200).send(platforms)
})

router.post('/videogame', async (req, res) => {
    let {
        name,
        description,
        released,
        rating,
        platforms,
        img,
        genres,
        createdInDB,
        stores
        
    } = req.body;

    let createdVGame = await Videogame.create({
        name,
        description,
        released,
        rating,
        img,
        platforms,
        createdInDB,
        genres,
        stores
    });

    let genreDb = await Genre.findAll({ where: { name: genres } }); //name de tabla genre

    createdVGame.addGenre(genreDb);
    // console.log(createdVGame, 'genreeee', genreDb);
    res.send('Videogame created successfully!');
})

module.exports = router;
