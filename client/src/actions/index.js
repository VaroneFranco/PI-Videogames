import axios from 'axios'

export const GET_VIDEOGAMES = "GET_VIDEOGAMES"
export const GET_VIDEOGAME_BY_ID = "GET_VIDEOGAME_BY_ID"
export const GET_VIDEOGAME_BY_NAME = "GET_VIDEOGAME_BY_NAME"
export const FILTER_ALPH = "FILTER_ALPH"
export const FILTER_GENRE = "FILTER_GENRE"
export const FILTER_RATING = "FILTER_RATING"
export const EMPTY_DETAILS = "EMPTY_DETAILS"


export function getVideogames() {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/videogames')
            // console.log(json)
            return dispatch({
                type: GET_VIDEOGAMES,
                payload: json.data
            })
        } catch (err) { console.log(err) }
    }
}
export function getVideogameByID(id) {

    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/videogame/${id}`);
            return dispatch({
                type: GET_VIDEOGAME_BY_ID,
                payload: json.data
            })

        } catch (err) { console.log(err) }
    }
}

export function getVideogameByName(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: GET_VIDEOGAME_BY_NAME,
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function filterAlfabethically(payload) {
    return {
        type: FILTER_ALPH,
        payload: payload
    }
}

export function filterByGenre(payload) {
    return {
        type: FILTER_GENRE,
        payload: payload
    }
}
export function filterByRating(payload) {
    return {
        type: FILTER_RATING,
        payload: payload
    }
}
export function emptyDetails() {
    return {
        type: EMPTY_DETAILS
    }
}
getVideogames()

// async function videogames(){
//     let json= await axios.get('http://localhost:3001/videogames')
//     console.log(json.data)
// }
// videogames()