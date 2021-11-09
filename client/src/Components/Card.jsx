import React from "react";
import styles from '../Diseño/Styles/Card.module.css'
import { NavLink } from "react-router-dom";


export default function Card(props) {

    return (
        <NavLink className={styles.link} to={'/videogame/' + props.id}>
            <div className={styles.card} >
                <img src={props.img} alt="" className={styles.imgCard} />
                <h2>{props.name}</h2>
                <h5>{props.rating}</h5>
                <span className={styles.genres}>{props.genres?.slice(0, 2)}</span>

            </div>
        </NavLink>
    )
}
