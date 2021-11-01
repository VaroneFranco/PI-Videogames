import React from "react";
import styles from '../Diseño/Styles/Paginado.module.css'

export default function Paginado({ videogamesPerPage, allVideogames, paginado }) {
    const totalPages = []

    for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
        totalPages.push(i);
    }

    return (
        <nav>
            <ul className={styles.paginado}>
                {totalPages &&
                    totalPages.map(number => {
                        return (
                            <li key={number}>
                                <button  onClick={() => paginado(number)}> {number}</button>
                            </li>)
                    })}
            </ul>
        </nav>
    )

}