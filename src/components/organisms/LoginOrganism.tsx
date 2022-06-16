import React from 'react';
import { useState, useEffect } from 'react';

import { Button } from "../atoms/index"
import { InputLoginContainer } from "../molecules/index"

export default function LoginOrganism() {

  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  
  return (
    <main>

    <div className="background"></div>

    <div className="card-container">

        <div className="exim-logo"></div>
        <h1 className="main-title">Identification</h1>
        <div className="input-container">
            <InputLoginContainer name="Nom D'utilisateur" type="text" setState={setUserName} />
            <InputLoginContainer name="Mot de passe" type="password" setState={setPassword} />
        </div>
        <Button content="Se connecter" className="button"/>
        
        <div className="njg-logo"></div>

    </div>

    </main>
)

}
