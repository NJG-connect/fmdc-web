import React from 'react';
import { useState } from 'react'

import "./homeOrganism.css"
import "../../assets/fonts/index.css"
import images from "../../assets/images/"

import { ModalContainer, DayInterventions, Reschedule } from '../molecules/';

export default function HomeOrganism() {

  const [isShow, setIsShow] = useState<boolean>(false)
  
  
  return (
    <div className="home-organism-body" onClick={() => isShow && setIsShow(false)}>

    {/* Component Header (title / userInfo / onLogout) (-> Template) */}
      <header>

        <div className="exim-logo" style={{ backgroundImage: `url(${images.logoAndBrand})` }}></div>

        <h1 className="home-title">Soft Enrobé</h1>

        <div className="user-information">
          <ModalContainer show={isShow} name="Rita Louise" onClick={() => console.log("Logout")} />
          <div className="icon" onClick={() => setIsShow(!isShow)}>
            <h1>RL</h1>
          </div>
          <p>Assistant(e)</p>
        </div>

      </header>

      <main className="home-organism-main">
        <h1>SELECT</h1>
      </main>

      <section className="home-organism-bottom">
        <DayInterventions />
        <Reschedule />
        <DayInterventions />
        <div className="icon">
          {/* Composant IconButton (img, Onclick?, disabled?) */}
          <div className="img-container"><div style={{ backgroundImage: `url(${images.contact})` }}></div></div>
          <div className="img-container"><div style={{ backgroundImage: `url(${images.addFolder})` }}></div></div>
        </div>
      </section>

    </div>
  )
  

}
