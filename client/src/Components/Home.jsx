import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, filterAlfabethically, filterByGenre, filterByRating, getGenres, getPlatforms } from "../actions";
import Card from './Card';
import Paginado from "./Paginado";
import Searchbar from "./SearchBar";
import { Link, NavLink } from "react-router-dom";


export default function Home() {

    const dispatch = useDispatch();

    // const allVideogames = useSelector((state) => state.allVideogames);
    const allVideogames = useSelector((state) => state.videogames);
    const genres = useSelector((state)=> state.genres)

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
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getVideogames());
    }


    return (
        <div>
            <Searchbar/>
            <Link to='videogame'>Add Videogame</Link>

            <button onClick={e => handleClick(e)}>
                Reload All Videogames
            </button>

            <select onChange={e => { handleFilterRating(e) }}>
                <option value="All">All ratings</option>
                <option value="5">5 stars</option>
                <option value="4">Above 4 stars</option>
                <option value="3">Above 3 star</option>
                <option value="2">Above 2 star</option>
                <option value="1">Above 1 star</option>
            </select>

            <select onChange={e => { handleFilterAlph(e) }}>
                <option value="">Sort Alphabetically</option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>

            <select onChange={e => { handleFilterGenre(e) }}>
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
                {/* {
                    
                    genres && genres.map(gr=>{
                        return(
                            <option value={gr}>{gr}</option>
                        )
                    })
                } */} //NO RECONOCE EL ESTADO DE REDUX. ANDA A SABER PORQUE!
            </select>
            <Paginado allVideogames={allVideogames.length} videogamesPerPage={videogamesPerPage} paginado={paginado} />
            {
                videogamesInPage && videogamesInPage.map(vg => {
                    return (

                        <Card id={vg.id} name={vg.name} img={vg.img} rating={vg.rating} genres={vg.genres.map(genre => <p>{genre}</p>) || vg.genres} />

                    )
                })
            }
        </div>
    )
}