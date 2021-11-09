import React from "react";
import styles from '../Diseño/Styles/Paginado.module.css'

export default function Paginado({ videogamesPerPage, allVideogames, paginado }) {
    const totalPages = []

    for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
        totalPages.push(i);
    }

    return (
        <div className={styles.wrapper}>
            <ul className={styles.pagination}>
                {totalPages &&
                    totalPages.map(number => {
                        return (
                            <li className={styles.li} key={number} onClick={() => paginado(number)}>
                               <button className={styles.button}>{number}</button>
                            </li>)
                    })}
            </ul>
        </div>
    )

}