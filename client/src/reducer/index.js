import {
    GET_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    GET_VIDEOGAME_BY_NAME,
    FILTER_ALPH,
    FILTER_GENRE,
    FILTER_RATING,
    EMPTY_DETAILS
} from "../actions"

const initialState = {
    videogames: [],
    allVideogames: [],
    videogameDetail: []
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case EMPTY_DETAILS:
            return {
                ...state,
                videogameDetail: []
            }
        case GET_VIDEOGAME_BY_NAME:
            return {
                ...state,
                videogames: payload,
                allVideogames:payload
            }
        case GET_VIDEOGAME_BY_ID:
            return {
                ...state,
                videogameDetail: payload
            }
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: payload,
                allVideogames: payload
            }
        case FILTER_ALPH:
            const videogamesFilterAlph = payload === "asc" ?
                state.videogames.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                state.videogames.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                videogames: videogamesFilterAlph

            }
        case FILTER_GENRE:

            const videogamesFilterGenre = payload === "All" ? state.allVideogames : state.allVideogames.filter(vg => vg.genres.includes(payload))
            return {
                ...state,
                videogames: videogamesFilterGenre

            }
        case FILTER_RATING:

            console.log(payload)
            const videogamesFilterRating = payload === "All" ? state.allVideogames : state.allVideogames.filter(vg => vg.rating >= payload)
            return {
                ...state,
                videogames: videogamesFilterRating
            }

        default: return state
    }

}

//state.allVideogames.filter(vg => vg.genres.contains(payload) || false