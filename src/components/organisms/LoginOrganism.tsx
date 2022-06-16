import React from 'react';
import { useState, useEffect } from 'react';

import "./loginOrganism.css"
import images from "../../assets/images/"

import { Button, Input } from "../atoms/"

export default function LoginOrganism() {

  const [infoUser, setInfoUser] = useState<{login: string, mdp: string}>({login: "", mdp: ""})

  useEffect(() => {
    console.log(infoUser);
    
  }, [infoUser])
  

  
  return (
    <main>

    <div className="background" style={{ backgroundImage: `url(${images.background})` }}></div>

    <div className="card-container">

        <div className="exim-logo" style={{ backgroundImage: `url(${images.logoAndBrand})` }}></div>
        <h1 className="main-title">Identification</h1>
        <div className="input-container">
            <Input name="Nom D'utilisateur" type="text" onChange={(e) => setInfoUser({login: e.target.value, mdp: infoUser.mdp})} />
            <Input name="Mot de passe" type="password" onChange={(e) => setInfoUser({login: infoUser.login, mdp: e.target.value})} />
        </div>
        <Button title="Se connecter" onClick={() => console.log("Onclick function")} className="" />
        
        <div className="njg-logo" style={{ backgroundImage: `url(${images.logoNjgConnect})` }}></div>

    </div>

    

    </main>
)

}
