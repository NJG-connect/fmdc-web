import React from 'react';
import { useState } from 'react'

import "./homeOrganism.css"
import "../../assets/fonts/index.css"

import { IconButton } from '../atoms';
import { DayInterventions, Reschedule } from '../molecules/';
import { Header } from '../templates/'

interface data {
  id: number;
  name: string;
}

interface Props {
  data: data[];
}


export default function HomeOrganism({data}: Props) {

  const [isShow, setIsShow] = useState<boolean>(false)
  
  
  return (
    <div className="home-organism-body" onClick={() => isShow && setIsShow(false)}>

  
    <Header title="Soft Enrobé" isShow={isShow} setIsShow={setIsShow} />

      <main className="home-organism-main">
        <h1>SELECT</h1>
      </main>

      <section className="home-organism-bottom">
        <DayInterventions />
        <Reschedule data={data} />
        <DayInterventions />
        <div className="icon">
          <IconButton img="contact" className="img-container" />
          <IconButton img="addFolder" className="img-container" />
        </div>
      </section>


    </div>
  )
  

}
