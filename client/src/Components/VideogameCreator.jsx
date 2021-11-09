import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { postVideogame } from '../actions';
import { Link } from "react-router-dom";
import styles from '../Diseño/Styles/Form.module.css'
import joystick from '../Diseño/Multimedia/Joystick.png'

const hayErrores = (gameData) => {
    let errores = {}
    if (!gameData.name) {
        errores.name = "Required"
    }
    if (!gameData.img) {
        errores.img = "Required"
    }
    if (gameData.genres.length ===0) {
        errores.genres = "Required"
    }
    if(!gameData.rating){
        errores.rating="Required"
    }
    if(!gameData.description){
        errores.rating="Required"
    }
    if(!gameData.platforms.length === 0){
        errores.rating="Required"
    }
    return errores
}

export default function VideogameCreator() {

    const [errors, setErrors] = useState({
        name: "",
        img: "",
        genres: "",
        rating: "",
        description:"",
        platforms:""
    })
    const [gameData, setGameData] = useState({
        name: "",
        description: "",
        platforms: [],
        img: "",
        genres: [],
        rating: "",
        released: ""
    })

    const dispatch = useDispatch();
    const platforms = useSelector((state) => state.platforms)
    const genres = useSelector((state) => state.genres)

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

    function handleCheck(e) {

        setGameData({
            ...gameData,
            rating: e.target.value
        })
        setErrors(hayErrores({
            ...gameData,
            rating: e.target.value

        }))
        console.log(errors)
    }

    const handleSelectGenre = (e) => {
        if (!gameData.genres.includes(e.target.value)) {
            setGameData({
                ...gameData,
                genres: [...gameData.genres, e.target.value]
            })
            setErrors(hayErrores({
                ...gameData,
                genres: [...gameData.genres, e.target.value]
            }))
        }
        console.log(gameData)
        console.log(errors)

    }

    const handleSelectPlatform = (e) => {

        if (!gameData.platforms.includes(e.target.value)) {
            setGameData({
                ...gameData,
                platforms: [...gameData.platforms, e.target.value]
            })
            setErrors(hayErrores({
                ...gameData,
                platforms: [...gameData.platforms, e.target.value]
            }))
        }
        console.log(gameData)
        console.log(errors)
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        if (errors.name || errors.genres || errors.rating || errors.img) {
            alert("Insert required inputs")
        }
        else {
            dispatch(postVideogame(gameData));
            alert("Videogame created succesfully");
            // setGameData({
            //     name: "",
            //     description: "",
            //     platforms: [],
            //     img: "",
            //     genres: []
            // })          
        }
    }

    let presentGenres = ""
    let presentPlatforms = ""
    for (let i = 0; i < gameData.genres.length; i++) {
        if (i === 0) {
            presentGenres = gameData.genres[i]
        }
        else {
            presentGenres = presentGenres + ", " + gameData.genres[i]
        }
    }
    for (let i = 0; i < gameData.platforms.length; i++) {
        if (i === 0) {
            presentPlatforms = gameData.platforms[i]
        }
        else {
            presentPlatforms = presentPlatforms + ", " + gameData.platforms[i]
        }
    }
    let warning = false
    if(errors.name || errors.img || errors.description || errors.genres || errors.rating  || errors.platforms){
        warning = true
    }

    return (
        <div className={styles.wrapper}>
            <nav className={styles.nav}>
                <img src={joystick} className={styles.img} />
                <h2 className={styles.title}>HSG</h2>
                <Link to="/home" >
                    <button className={styles.button}>Previous </button>
                </Link>

            </nav>
            <form onSubmit={e => handleSumbit(e)} className={styles.form}>

                <p className={styles.label}>Name</p>
                <input type="text" name="name" value={gameData.name} onChange={e => handleChange(e)}></input>
                {errors.name && <h7 className={styles.warning}>*</h7>}


                <p className={styles.label}>Rating:</p>
                <div className={styles.ratings} >
                    <label >
                        <input

                            type="radio"
                            value="1"
                            name="rating"
                            onChange={(e) => handleCheck(e)}
                        />1⭐</label>
                    <label>
                        <input

                            type="radio"
                            value="2"
                            name="rating"
                            onChange={(e) => handleCheck(e)}
                        />2⭐</label>
                    <label>
                        <input

                            type="radio"
                            value="3"
                            name="rating"
                            onChange={(e) => handleCheck(e)}
                        />3⭐</label>
                    <label>
                        <input

                            type="radio"
                            value="4"
                            name="rating"
                            onChange={(e) => handleCheck(e)}
                        />4⭐</label>
                    <label>
                        <input

                            type="radio"
                            value="5"
                            name="rating"
                            onChange={(e) => handleCheck(e)}
                        />5⭐</label>
                </div>
                {errors.rating && <h7 className={styles.warning}>*</h7>}

                <p className={styles.label}>Platforms</p>
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
                {errors.platforms && <h7 className={styles.warning}>*</h7>}

                <p className={styles.label}>Genres</p>
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
                {errors.genres && <h7 className={styles.warning}>*</h7>}

                <p className={styles.label}>Released</p>
                <input type="text" name="released" value={gameData.released} onChange={e => handleChange(e)}></input>

                <p className={styles.label}>Description</p>
                <input type="text" name="description" value={gameData.description} onChange={e => handleChange(e)}></input>
                {errors.description && <h7 className={styles.warning}>*</h7>}

                <p className={styles.label}>Image URL</p>
                <input type="text" name="img" value={gameData.img} onChange={handleChange}></input>
                {errors.img  && <h7 className={styles.warning}>*</h7>}
                <br />
                <button className={styles.button} type="submit">Create</button>
                { warning &&
                <p className={styles.warning}> (*)Please complete all the required inputs </p>}

            </form>
            {/* 
            <div className={styles.card}>
                

            </div> */}
            <div className={styles.container}>
                {
                    gameData.img && <img className={styles.bkg} src={gameData.img} />
                }
                <div className={styles.card}>
                    <h1>{gameData.name}</h1>
                    <p>Rating: {gameData.rating}</p>
                    <p>Where to play: {presentPlatforms}</p>
                    <p>Genres:{presentGenres}</p>
                    <p>Release date: {gameData.released}</p>
                    {/* <h4>Where to buy: {gameData.stores}</h4> */}
                    <p>Description: {gameData.description} </p>
                </div>
            </div>

        </div>
    )
}