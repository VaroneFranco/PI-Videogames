import {
    GET_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    GET_VIDEOGAME_BY_NAME,
    GET_PLATFORMS,
    GET_GENRES,
    FILTER_ALPH,
    FILTER_GENRE,
    FILTER_DB,
    FILTER_RATING,
    EMPTY_DETAILS,
    DELETE_FILTER
} from "../actions";

const initialState = {
    videogames: [],
    allVideogames: [],
    videogameDetail: [],
    genres: [],
    platforms: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case EMPTY_DETAILS:
            return {
                ...state,
                videogameDetail: []
            };
        case GET_VIDEOGAME_BY_NAME:
            return {
                ...state,
                videogames: payload,
                allVideogames: payload
            };
        case GET_VIDEOGAME_BY_ID:
            return {
                ...state,
                videogameDetail: payload
            };
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: payload,
                allVideogames: payload
            };
        case GET_GENRES:
            return {
                ...state,
                genres: payload
            };
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: payload
            };
        case FILTER_ALPH:
            const videogamesFilterAlph = payload === "asc" ?
                state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (a.rating < b.rating) {
                        return 1;
                    }
                    return 0;
                }) : state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (a.rating < b.rating) {
                        return -1;
                    }
                    return 0;
                });
            return {
                ...state,
                videogames: videogamesFilterAlph
            };
        case FILTER_GENRE:
            const videogamesFilterGenre = payload === "All" ? state.videogames : state.videogames.filter(vg => vg.genres?.includes(payload));
            return {
                ...state,
                videogames: videogamesFilterGenre
            };
        case FILTER_DB:
            console.log(state.allVideogames)
            const videogamesDB= payload === "All" ? state.allVideogames : payload==="db" ? 
            state.allVideogames.filter(vg=> vg.createdInDb)
            :
            state.allVideogames.filter(vg=>!vg.createdInDb)

            return{
                ...state,
                videogames: videogamesDB
            }
       
        case FILTER_RATING:
            const videogamesFilterRating = payload === "desc" ?
            state.videogames.sort(function (a, b) {
                if (a.rating < b.rating) {
                    return 1;
                };
                if (a.rating > b.rating) {
                    return -1;
                };
                return 0;
            }) :
            state.videogames.sort(function (a, b) {
                if (a.rating < b.rating) {
                    return -1;
                };
                if (a.rating > b.rating) {
                    return 1;
                };
                return 0;
            });
            console.log(videogamesFilterRating)
            return{
                ...state,
                videogames:videogamesFilterRating
            }
        case DELETE_FILTER:
            return{
                ...state,
                videogames: state.allVideogames
            }
        

        default: return state;
    };

};

//state.allVideogames.filter(vg => vg.genres.contains(payload) || false