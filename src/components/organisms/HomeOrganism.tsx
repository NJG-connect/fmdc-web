import React from 'react';

import "./homeOrganism.css"
import images from "../../assets/images/index"

export default function HomeOrganism() {
  
  
  return (

      <header>

        <div className="exim-logo" style={{ backgroundImage: `url(${images.logoAndBrand})` }}></div>

        <h1 className="home-title">Soft Enrobé</h1>

        <div className="user-information">
          <div className="icon">
            <h1>RL</h1>
          </div>
          <p>Assistant(e)</p>
        </div>

      </header>

  )
  

}
