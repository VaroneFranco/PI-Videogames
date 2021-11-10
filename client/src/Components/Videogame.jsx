import React from "react"
import { getVideogameByID, emptyDetails } from "../actions"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { Link } from 'react-router-dom'
import styles from '../Diseño/Styles/Videogame.module.css'
import joystick from '../Diseño/Multimedia/Joystick.png'
import pleasewait from '../Diseño/Multimedia/pleasewait.gif'

export default function Videogame({ id }) {

    const dispatch = useDispatch()
    const Videogame = useSelector((state) => state.videogameDetail)

    useEffect(() => {
        dispatch(getVideogameByID(id))
        return function vaciar() {
            dispatch(emptyDetails())
        }
    }, [dispatch])
    console.log(Videogame)
    //vg.stores?.map(st=><span> {st} </span>) || vg.stores
    return (
        <div key={Videogame[0]?.id} className={styles.wrapper}>
            {Videogame.length>0 ? Videogame.map(vg => {
                return (<div key={Videogame.id}>
                    <nav className={styles.nav}>
                        <img src={joystick} alt="" className={styles.img} />
                        <h2 className={styles.title}>HGS</h2>
                        <Link to="/home" className={styles.button}>
                            Back to Home
                        </Link>
                    </nav>
                    <img src={vg.img} alt="" className={styles.bkg} />
                    <div className={styles.container}>
                        <div className={styles.flipCard}>

                            <div className={styles.cardFront}>
                                <h1>{vg.name}</h1>
                                <h4>Rating: {vg.rating}</h4>
                                <h4>Genres:{vg.genres?.map(gr=> <span>{gr} </span>)}</h4>
                                <h4>Release date: {vg.released}</h4>
                                <h4>Where to play: {vg.platforms?.map(pt=><span> {pt} </span>)}</h4>
                                <h4>Where to buy: {typeof vg.stores =="string" ? vg.stores : vg.stores?.map(st=><span> {st} </span>) } </h4>
                            </div>
                            <div className={styles.cardBack}>
                                <p> {vg.description.replace(/<[^>]*>?/g, '')} </p>
                            </div>
                        </div>
                    </div>

                </div>

                )
            }) : <img src={pleasewait} alt="" className={styles.wait}/>}
        </div>
    )
}

