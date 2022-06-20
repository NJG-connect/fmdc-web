import React from 'react';
import { useState } from 'react';

import './loginOrganism.css';
import images from '../../assets/images/';

import { Button, Input } from '../atoms/';
import { userInfo } from 'os';

interface Props {
  onSubmit: (value: { login: string; mdp: string }) => Promise<void>;
}

export default function LoginOrganism({ onSubmit }: Props) {

  const [infoUser, setInfoUser] = useState<{ login: string; mdp: string }>({
    login: '',
    mdp: '',
  });

  function disabled() {
    if(infoUser.login == "" || infoUser.mdp == "") {
      return true
    } else {
      return false
    }
  }

  return (
    <main>
      <div
        className="background"
        style={{ backgroundImage: `url(${images.background})` }}></div>

      <div className="card-container">
        <div
          className="exim-logo"
          style={{ backgroundImage: `url(${images.logoAndBrand})` }}></div>
        <h1 className="main-title">Identification</h1>
        <div className="input-container">
          <Input
            name="Nom D'utilisateur"
            type="text"
            onChange={login => setInfoUser({ ...infoUser, login })}
          />
          <Input
            name="Mot de passe"
            type="password"
            onChange={mdp => setInfoUser({ ...infoUser, mdp })}
          />
        </div>
        <Button className="button" title="Se connecter" onClick={() => disabled() == false && onSubmit(infoUser)} disabled={disabled()} />

        <div
          className="njg-logo"
          style={{ backgroundImage: `url(${images.logoNjgConnect})` }}></div>
      </div>
    </main>
  );
}
