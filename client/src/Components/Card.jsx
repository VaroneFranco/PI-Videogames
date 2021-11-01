import React from "react";
import styles from '../Diseño/Styles/Card.module.css'
import { Link } from "react-router-dom";


export default function Card(props){
    // console.log(props)
    return (
        <div >
            <Link to={'/videogame/'+ props.id}>
            <h2>{props.name}</h2>
            <h5>{props.rating}</h5>
            <h5>{props.genres}</h5>
            <img src={props.img} alt="" className={styles.imgCard}/>
            </Link>
            
        </div>
    )
}   