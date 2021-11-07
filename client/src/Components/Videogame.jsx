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
    
    
    
    // console.log(Videogame)
    // console.log(Videogame[0]?.name)
    // console.log(Videogame[0].name)
 
    return(
       <div>
           {Videogame && Videogame.map(vg=>{
               return(<div>
                   <h2>{vg.name}</h2>
                   <ol>
                    { vg.genres[0] == true &&
                       vg.genres?.map(gr=>{
                            return(
                                <li> {gr} </li>
                            )
                    })}
                   </ol>
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