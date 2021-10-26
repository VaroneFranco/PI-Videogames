const { API_KEY } = process.env
const axios = require('axios')
const { Genre, Videogame } = require('../db')

async function getDb(){
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
            stores: game.stores ? game.stores.map(store => store.store.name) : "No disponemos los stores de este juego"
            // description: game.data.description,
            // released: game.data.released,
            
        };
    });
    console.log(apiData)
    return apiData
};

async function getAllData(){
    let dataDb= await getDb();
    let dataApi= await getApi();
    return [...dataDb, ...dataApi]
}

async function getByName(name) {
    try {
        let apiData = await axios.get(`https://api.rawg.io/api/games?key=1f02d81818664102a6fa63065e5be1ab&page_size=15&search=${name}`)

        // console.log(apiData.data.results[0].stores.map(store=> store.store.name))
        let result = apiData.data.results.map(game => {
            console.log(game)
            return {
                name: game.name,
                id: game.id,
                rating: game.rating,
                genres: game.genres.map(g => g.name),
                img: game.background_image,
                platforms: game.platforms == false ? "No disponemos de las plataformas de este juego" : game.platforms.map(plataforma => plataforma.platform.name),
                stores: game.stores ? game.stores.map(store => store.store.name) : "No disponemos los stores de este juego"
                // description: game.data.description,
                // released: game.data.released,
            };


        })
        // console.log(result)
        return result
    } catch (err) {
        console.log(err)
        return "No results"
    }
}

async function getGame(id) {
    try {
        let game = await axios.get(`https://api.rawg.io/api/games/${id}?key=1f02d81818664102a6fa63065e5be1ab`)

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


    } catch (err) {
        console.log(err)
        return "No results"
    }
}
async function getGenres() {
    let genres = await axios.get(`https://api.rawg.io/api/genres?key=1f02d81818664102a6fa63065e5be1ab`)
    // console.log(genres.data.results.map(g=>g.name))
    return genres.data.results.map(g => g.name)
}

module.exports = {
    getApi, getGame, getByName, getGenres, getAllData
}