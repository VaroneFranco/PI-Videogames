import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { getVideogameByName } from "../actions";
import styles from '../Diseño/Styles/Searchbar.module.css'
//Crear searchVideogame action
export default function Searchbar() {
    const dispatch = useDispatch()

    const [search, setSearch] = useState("")

    const handleSumbit = (e) => {
        e.preventDefault();
        if (search) {
            dispatch(getVideogameByName(search));
            setSearch("")
        }
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    return <div className={styles.wrapper}>
        <form  onSubmit={e => handleSumbit(e)}>
            <input placeHolder="Find a game" className={styles.input} onChange={e => handleChange(e)} value={search} type="text"></input>
            <button className={styles.button} type="submit">BUSCAR</button>
        </form>
    </div>

}