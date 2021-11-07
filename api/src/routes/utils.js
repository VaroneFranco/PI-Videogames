const { API_KEY } = process.env
const axios = require('axios')
const { Genre, Videogame } = require('../db')
const { Op } = require('sequelize')


async function getDb() {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            trough: {
                attributes: []
            }
        }
    })
};


async function getApi() {
    //traigo 120 juegos 
    // let apiPage1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`);
    // let apiPage2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`);
    // let apiPage3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`);

    let apiPage1 = await axios.get(`https://api.rawg.io/api/games?key=1f02d81818664102a6fa63065e5be1ab&page=1&page_size=40`);
    let apiPage2 = await axios.get(`https://api.rawg.io/api/games?key=1f02d81818664102a6fa63065e5be1ab&page=2&page_size=40`);
    let apiPage3 = await axios.get(`https://api.rawg.io/api/games?key=1f02d81818664102a6fa63065e5be1ab&page=1&page_size=40`);

    let apiPages = [...apiPage1.data.results, ...apiPage2.data.results, ...apiPage3.data.results];

    let apiData = apiPages.map(game => {
        return {
            name: game.name,
            id: game.id,
            rating: game.rating,
            genres: game.genres.map(g => g.name),
            img: game.background_image,
            platforms: game.platforms == false ? "No disponemos de las plataformas de este juego" : game.platforms.map(plataforma => plataforma.platform.name),
            stores: game.stores ? game.stores.map(store => store.store.name) : "No disponemos los stores de este juego",
            createdInDb:false
          

        };
    });

    return apiData
};

async function getAllData() {
    let dataDb = await getDb();
    let dataApi = await getApi();
    return [...dataApi, ...dataDb]
}

async function getByName(name) {
    try {
        let dbData = await Videogame.findAll({
            where: { name: { [Op.like]: `%${name}%` } },
            include: {
                model: Genre,
                attributes: ['name'],
                trough: {
                    attributes: []
                }
            }
        })

        let resultDb = dbData.map(game => {
            return {
                name: game.dataValues.name,
                id: game.dataValues.id,
                rating: game.dataValues.rating ? game.dataValues.rating : undefined,
                genres: game.dataValues.genres ? game.dataValues.genres.map(g => g.name) : "No disponemos los generos de este juego",
                description: game.dataValues.description,
                img: game.dataValues.background_image ? game.dataValues.background_image : "No disponemos la foto de este juego",
                platforms: game.dataValues.platforms,
                stores: game.dataValues.stores ? game.stores.map(store => store.store.name) : "No disponemos los stores de este juego",
                createdInDb: game.dataValues.createdInDb
            }

        })

        // let apiData = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=15&search=${name}`) 
        let apiData = await axios.get(`https://api.rawg.io/api/games?key=1f02d81818664102a6fa63065e5be1ab&page_size=15&search=${name}`)

        // console.log(apiData.data.results[0].stores.map(store=> store.store.name))
        let resultApi = apiData.data.results.map(game => {

            return {
                name: game.name,
                id: game.id,
                rating: game.rating,
                genres: game.genres.map(g => g.name),
                img: game.background_image,
                platforms: game.platforms == false ? "No disponemos de las plataformas de este juego" : game.platforms.map(plataforma => plataforma.platform.name),
                stores: game.stores ? game.stores.map(store => store.store.name) : "No disponemos los stores de este juego",
                createdInDb : false
            
            };


        })

        return [...resultApi, ...resultDb]
    } catch (err) {
        console.log(err)
        return "No results"
    }
}

async function getGameIdApi(id){
    try{
        let game= await axios.get(`https://api.rawg.io/api/games/${id}?key=1f02d81818664102a6fa63065e5be1ab`)
        return {
            name: game.data.name,
            id: game.data.id,
            rating: game.data.rating,
            description: game.data.description,
            released: game.data.released,
            genres: game.data.genres ? game.data.genres.map(genre => genre.name) : "No disponemos del genero de este juego",
            img: game.data.background_image,
            platforms: game.data.platforms ? game.data.platforms.map(plataforma => plataforma.platform.name) : "No disponemos de las plataformas de este juego",
            stores: game.data.stores ? game.data.stores.map(store => store.store.name) : "No disponemos los stores de este juego"
        }

    }catch(err){
        return []
    }
}

async function getGame(id) {
    try {
        let apiGame= await getGameIdApi(id)
        // let game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        let dbData= await getDb()
        let dbGame= dbData.map(game=>{
            console.log(game.dataValues.platforms)
            return{
                name:game.dataValues.name,
                id: game.dataValues.id,
                rating: game.dataValues.rating? game.dataValues.rating : "No disponemos el rating de este juego",
                description: game.dataValues.description,
                released: game.dataValues.released? game.dataValues.released : "No disponemos la fecha de este juego",
                genres: game.dataValues.genres ? game.dataValues.genres.map(genre => genre.name) : "No disponemos del genero de este juego",
                img: game.dataValues.background_image,
                platforms: game.dataValues.platforms, // ? game.dataValues.platforms.map(plataforma => plataforma.platform.name) : "No disponemos de las plataformas de este juego"
                stores: game.dataValues.stores ? game.dataValues.stores.map(store => store.store.name) : "No disponemos los stores de este juego"

            }
        })
        // console.log(dbGame)
        let game = [apiGame, ...dbGame]

        console.log(game)
        game = game.filter(g=> g.id == id)
        

        // return {
        //     name: game.name,
        //     id: game.id,
        //     rating: game.rating,
        //     description: game.description,
        //     released: game.released,
        //     genres: game.genres ? game.genres.map(genre => genre.name) : "No disponemos del genero de este juego",
        //     img: game.background_image,
        //     platforms: game.platforms ? game.platforms.map(plataforma => plataforma.platform.name) : "No disponemos de las plataformas de este juego",
        //     stores: game.stores ? game.stores.map(store => store.store.name) : "No disponemos los stores de este juego"
        // }
        return game


    } catch (err) {
        console.log(err)
        return "No results"
    }
}
async function getGenres() {
    let genres = await axios.get(`https://api.rawg.io/api/genres?key=1f02d81818664102a6fa63065e5be1ab`)
    // let genres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)

    return genres.data.results.map(g => g.name)
}

module.exports = {
    getApi, getGame, getByName, getGenres, getAllData
}
