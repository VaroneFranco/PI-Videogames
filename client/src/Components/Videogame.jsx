import React from "react"
import { getVideogameByID , emptyDetails} from "../actions"
import { useSelector, useDispatch} from "react-redux"
import { useEffect } from "react"

export default function Videogame({id}) {

    const dispatch = useDispatch()
    const Videogame = useSelector((state)=>state.videogameDetail)

   
    useEffect(()=>{
        dispatch(getVideogameByID(id))
        return function vaciar(){
            dispatch(emptyDetails())
        }
    },[dispatch])
    
    
    

    console.log(Videogame)
 
    return(
        <h1>{Videogame.name}</h1>
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