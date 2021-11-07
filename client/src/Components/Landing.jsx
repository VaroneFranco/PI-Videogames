import React from "react";
import {Link} from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { getVideogames, getGenres, getPlatforms } from "../actions";

import styles from '../Diseño/Styles/Landing.module.css'   



export default function Landing() {
    let dispatch=useDispatch();
   
    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenres());
        dispatch(getPlatforms());

    }, [dispatch]);


    return (<>
        <div className={styles.landing} />
          <div className={styles.title}>Henry Studios Games</div>
          <Link to='home'>
          <a className={styles.button}> WELCOME </a>
          </Link>
          </>
    )
}
