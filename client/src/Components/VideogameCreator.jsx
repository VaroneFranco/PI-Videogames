import React from "react";
import { useState } from "react";


export default function VideogameCreator(){

    const [videogame, setVideogame] =useState({
        name:"",
        description:"",
        platforms:""
    })

    return(
    <form>
        
        <label>Name</label>
        <input type="text"></input>

        <label>Description</label>
        <input type="text"></input>

        <label>Platforms</label>
        <select>
            
        </select>

        <label>Image</label>  
        <input type="text"></input>

    </form>
    )
}