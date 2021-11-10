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

async function dbPresenter(){
    let gamesDB = await getDb();

    let gamesPresented=gamesDB.map(vg=>{
        return{
            name:vg.dataValues.name,
            id:vg.dataValues.id,
            rating:vg.dataValues.rating,
            description:vg.dataValues.description,
            img:vg.dataValues.img,
            genres:vg.dataValues.Genres.map(gr=> gr.dataValues.name),
            platforms: vg.dataValues.platforms,
            released: vg.dataValues.released || "Release date not available",
            stores: vg.dataValues.stores ? vg.dataValues.stores.map(store => store.store.name) : "Stores not available",
            createdInDb: true
        }
    });

    return gamesPresented

}


async function getApi() {
    // traigo 120 juegos 
    // let apiPage1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`);
    // let apiPage2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`);
    // let apiPage3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=40`);

    let apiPage1 = await axios.get(`https://api.rawg.io/api/games?key=1f02d81818664102a6fa63065e5be1ab&page=1&page_size=40`);
    let apiPage2 = await axios.get(`https://api.rawg.io/api/games?key=1f02d81818664102a6fa63065e5be1ab&page=2&page_size=40`);
    let apiPage3 = await axios.get(`https://api.rawg.io/api/games?key=1f02d81818664102a6fa63065e5be1ab&page=3&page_size=40`);

    
    let apiPages = [...apiPage1.data.results, ...apiPage2.data.results, ...apiPage3.data.results];

    let apiData = apiPages.map(game => {
        return {
            name: game.name,
            id: game.id,
            rating: game.rating,
            genres: game.genres.map(g => g.name),
            img: game.background_image,
            createdInDb:false
        };
    });

    return apiData
};

async function getAllData() {
    let dataDb = await dbPresenter();

    let dataApi = await getApi();
    return [...dataApi, ...dataDb]
}

async function getByName(name) {
    try {
        let dbDataNotPresented = await Videogame.findAll({
            where: { name: { [Op.like]: `%${name}%` } },
            include: {
                model: Genre,
                attributes: ['name'],
                trough: {
                    attributes: []
                }
            }
        })
        let resultDb=dbDataNotPresented.map(vg=>{
            return{
                name:vg.dataValues.name,
                id:vg.dataValues.id,
                rating:vg.dataValues.rating,
                description:vg.dataValues.description,
                img:vg.dataValues.img,
                genres:vg.dataValues.Genres.map(gr=> gr.dataValues.name),
                platforms: vg.dataValues.plataforms,
                released: vg.dataValues.released || "Release date not available",
                stores: vg.dataValues.stores ? vg.dataValues.stores.map(store => store.store.name) : "Stores not available"
            }
        });
        


        // let apiData = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=15&search=${name}`) 
        let apiData = await axios.get(`https://api.rawg.io/api/games?key=1f02d81818664102a6fa63065e5be1ab&page_size=15&search=${name}`)

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
        
        let dbGame= await dbPresenter()
    
  
        let game = [apiGame, ...dbGame]

        game = game.filter(g=> g.id == id)
        
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
