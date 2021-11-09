import React from "react"
import { getVideogameByID, emptyDetails } from "../actions"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { Link } from 'react-router-dom'
import styles from '../Diseño/Styles/Videogame.module.css'
import joystick from '../Diseño/Multimedia/Joystick.png'

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

    return (
        <div>
            {Videogame && Videogame.map(vg => {
                return (<div>
                    <nav className={styles.nav}>
                        <img src={joystick} className={styles.img} />
                        <h2 className={styles.title}>HSG</h2>
                        <Link to="/home" className={styles.button}>
                            <a>Back to Home</a>
                        </Link>
                    </nav>
                    <img src={vg.img} className={styles.bkg} />
                    <div className={styles.container}>
                        <div className={styles.flipCard}>

                            <div className={styles.cardFront}>
                                <h1>{vg.name}</h1>
                                <h4>Rating: {vg.rating}</h4>
                                <h4>Genres:{vg.genres}</h4>
                                <h4>Release date: {vg.released}</h4>
                                <h4>Where to play: {vg.platforms}</h4>
                                <h4>Where to buy: {vg.stores}</h4>
                            </div>
                            <div className={styles.cardBack}>
                                <p> {vg.description.replace(/<[^>]*>?/g, '')} </p>
                            </div>
                        </div>
                    </div>

                </div>

                )
            })}
        </div>
    )
}

// let mapStateToProps= (state) =>{
//     return{
//         videogameDetail: state.videogameDetail
//     }

// }

// export default connect(mapStateToProps, {getVideogameByID, emptyDetails})(Videogame)


    // console.log(id)
    // useEffect(()=>{
    //     getVideogameByID(id)
    //     return function vaciar(){
    //         emptyDetails()
    //     }
    // })