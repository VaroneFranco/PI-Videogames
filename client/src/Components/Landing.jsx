import React from "react";
import {Link} from 'react-router-dom'


export default function Landing() {
    return (
        <div >
          Landing Page
          
          <Link to='home'>
          <button> Al Home</button>
          </Link>
        </div>
    )
}
