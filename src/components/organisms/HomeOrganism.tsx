import React from 'react';
import { useState } from 'react'

import "./homeOrganism.css"
import "../../assets/fonts/index.css"
import images from "../../assets/images/"

import ProfileContainer from '../molecules/ProfileContainer';

export default function HomeOrganism() {

  const [isShow, setIsShow] = useState<boolean>(false)
  
  
  return (

      <header>

        <div className="exim-logo" style={{ backgroundImage: `url(${images.logoAndBrand})` }}></div>

        <h1 className="home-title">Soft Enrobé</h1>

        <div className="user-information">
          <ProfileContainer show={isShow} />
          <div className="icon" onClick={() => setIsShow(!isShow)}>
            <h1>RL</h1>
          </div>
          <p>Assistant(e)</p>
        </div>

      </header>

  )
  

}
