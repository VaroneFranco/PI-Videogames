import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { getVideogameByName } from "../actions";
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

    return <div>
        <form onSubmit={e => handleSumbit(e)}>
            <textarea onChange={e => handleChange(e)} value={search} type="text"></textarea>
            <button type="submit">BUSCAR</button>
        </form>
    </div>

}