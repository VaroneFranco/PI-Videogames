import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { postVideogame, getPlatforms, getGenres } from '../actions';
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";


const hayErrores = (gameData) => {
    let errores = {}
    if (!gameData.name) {
        errores.name = "Required"
    }
    if (!gameData.description) {
        errores.description = "Required"
    }
    if (!gameData.platforms) {
        errores.platforms = "Required"
    }
    if (!gameData.img) {
        errores.img = "Required"
    }
    if (!gameData.genres) {
        errores.genres = "Required"
    }
    return errores
}

export default function VideogameCreator() {

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        platforms: [],
        img: "",
        genres: []
    })
    const [gameData, setGameData] = useState({
        name: "",
        description: "",
        platforms: [],
        img: "",
        genres: []
    })

    const dispatch = useDispatch();
    const platforms = useSelector((state) => state.platforms)
    const genres = useSelector((state) => state.genres)

    // useEffect(() => {
    //     dispatch(getPlatforms());
    //     dispatch(getGenres())
    // }, [dispatch])

    const handleChange = (e) => {
        setGameData({
            ...gameData,
            [e.target.name]: e.target.value
        });
        setErrors(hayErrores({
            ...gameData,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelectGenre = (e) => {
        setGameData({
            ...gameData,
            genres: [...gameData.genres, e.target.value]
        })
        setErrors({
            ...gameData,
            genres: [...gameData.genres, e.target.value]
        })
        console.log(gameData)
    }
    const handleSelectPlatform = (e) => {
        setGameData({
            ...gameData,
            platforms: [...gameData.platforms, e.target.value]
        })
        setErrors({
            ...gameData,
            platforms: [...gameData.platforms, e.target.value]
        })
        console.log(gameData)
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        if (errors.name || errors.platforms || errors.genres || errors.description || errors.img) {
            alert("Insert required inputs")
        }
        else {
            dispatch(postVideogame(gameData));
            alert("Videogame created succesfully");
            setGameData({
                name: "",
                description: "",
                platforms: [],
                img: "",
                genres: []
            })
        }
    }

    return (
        <form onSubmit={e => handleSumbit(e)}>

            <label>Name</label>
            <input type="text" name="name" value={gameData.name} onChange={e => handleChange(e)}></input>

            <label>Description</label>
            <input type="text" name="description" value={gameData.description} onChange={e => handleChange(e)}></input>

            <label>Platforms</label>
            <select name="platforms" value={gameData.platforms} onChange={e => handleSelectPlatform(e)}>
                <option value="">Select Platforms</option>

                {
                    platforms && platforms.map(pf => {
                        return (
                            <option value={pf}>{pf}</option>
                        )
                    }
                    )}
            </select>

            <label>Genres</label>
            <select name="genres" value={gameData.genres} onChange={e => handleSelectGenre(e)}>
                <option value="">Select Genres</option>
                {
                    genres && genres.map(gr => {
                        return (
                            <option value={gr.name}>{gr.name}</option>
                        )
                    })
                }

            </select>

            <label>Image URL</label>
            <input type="text" name="img" value={gameData.img} onChange={handleChange}></input>

            <button type="submit">Create game</button>

            <Link to='/home'> Volver al home</Link>

        </form>
    )
}