import React from 'react';
import { useState } from 'react';

import "./loginOrganism.css"
import images from "../../assets/images/index"

import { Button } from "../atoms/index"
import { InputLoginContainer } from "../molecules/index"
import { url } from 'inspector';

export default function LoginOrganism() {

  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  
  
  return (
    <main>

    <div className="background"></div>

    <div className="card-container">

        <div className="exim-logo" style={{ backgroundImage: `url(${images.logoAndBrand})` }}></div>
        <h1 className="main-title">Identification</h1>
        <div className="input-container">
            <InputLoginContainer name="Nom D'utilisateur" type="text" setState={setUserName} />
            <InputLoginContainer name="Mot de passe" type="password" setState={setPassword} />
        </div>
        <Button content="Se connecter" className="button"/>
        
        <div className="njg-logo" style={{ backgroundImage: `url(${images.logoNjgConnect})` }}></div>

    </div>

    

    </main>
)

}
