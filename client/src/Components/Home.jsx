import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, filterAlfabethically, filterByGenre, filterByRating, getGenres, getPlatforms, filterDatabase, deleteFilter } from "../actions";
import Card from './Card';
import Paginado from "./Paginado";
import Searchbar from "./SearchBar";
import { Link, NavLink } from "react-router-dom";
import styles from '../Diseño/Styles/Home.module.css'
import joystick from '../Diseño/Multimedia/Joystick.png'
import error404 from '../Diseño/Multimedia/404.gif'


export default function Home() {

    const dispatch = useDispatch();

    // const allVideogames = useSelector((state) => state.allVideogames);
    const allVideogames = useSelector((state) => state.videogames);
    // const genres = useSelector((state) => state.genres)

    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenres());
        dispatch(getPlatforms());

    }, [dispatch]);



    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    // const [videogamesPerPage, setVideogamesPerPage]= useState(15);
    const videogamesPerPage = 15;
    const lastVideogame = currentPage * videogamesPerPage;
    const firstVideogame = lastVideogame - videogamesPerPage
    const videogamesInPage = allVideogames.slice(firstVideogame, lastVideogame)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleFilterAlph = (e) => {
        e.preventDefault()
        dispatch(filterAlfabethically(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordered ${e.target.value}`)
    }

    const handleFilterGenre = (e) => {
        e.preventDefault()
        dispatch(filterByGenre(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordered ${e.target.value}`)
    }

    const handleFilterRating = (e) => {
        e.preventDefault();
        dispatch(filterByRating(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`)
    }
    // const handleReload = (e) => {
    //     e.preventDefault();
    //     dispatch(getVideogames());
    // }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteFilter())
    }

    const handleFilterSource = (e) => {
        e.preventDefault();
        dispatch(filterDatabase(e.target.value))
    }


    return (
        <div className={styles.wrapper}>

            <Link to='/'>
                <img src={joystick} className={styles.img} />
            </Link>

            <Searchbar />
            <Link to='videogame' className={styles.button}>
                <a > Add Videogame </a>
            </Link>
            <div className={styles.options}>
                <button className={styles.deleteFilter} onClick={e => handleDelete(e)}>
                    Delete Filters
                </button>
                {/* <button className={styles.reloadGames} onClick={e => handleReload(e)}>
                    Reload Games
                </button> */}

                <select className={styles.rating} onChange={e => { handleFilterRating(e) }}>
                    <option >All ratings</option>
                    <option value="desc">Best to worst</option>
                    <option value="asc">Worst to best</option>

                </select>

                <select className={styles.alph} onChange={e => { handleFilterAlph(e) }}>
                    <option >Sort Alphabetically</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>

                <select className={styles.genres} onChange={e => { handleFilterGenre(e) }}>
                    <option value='All' >All Genres</option>
                    <option value='Action'>Action</option>
                    <option value='Adventure'>Adventure</option>
                    <option value='Arcade'>Arcade</option>
                    <option value='Board Games'>Board Games</option>
                    <option value='Card'>Card</option>
                    <option value='Casual'>Casual</option>
                    <option value='Educational'>Educational</option>
                    <option value='Family'>Family</option>
                    <option value='Fighting'>Fighting</option>
                    <option value='Indie'>Indie</option>
                    <option value='Massively Multiplayer'>Massively Multiplayer</option>
                    <option value='Platformer'>Platformer</option>
                    <option value='Puzzle'>Puzzle</option>
                    <option value='Racing'>Racing</option>
                    <option value='RPG'>RPG</option>
                    <option value='Shooter'>Shooter</option>
                    <option value='Simulation'>Simulation</option>
                    <option value='Sports'>Sports</option>
                    <option value='Strategy'>Strategy</option>

                </select>

                <select className={styles.sources} onChange={e => { handleFilterSource(e) }}>
                    <option value="All">All sources</option>
                    <option value="db">From Database</option>
                    <option value="api">From Api</option>
                </select>
            </div>

            <Paginado allVideogames={allVideogames.length} videogamesPerPage={videogamesPerPage} paginado={paginado} />

            <div className={styles.cards}>
                {
                    videogamesInPage ? videogamesInPage.map(vg => {
                        return (

                            <Card id={vg.id} name={vg.name} img={vg.img} rating={vg.rating} genres={vg.genres?.map(genre => <p>{genre}</p>) || vg.genres} />

                        )
                    })

                        : <img className={styles.error404} src={error404} />
                }
            </div>
        </div>
    )
}