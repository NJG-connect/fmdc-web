import React from 'react';
import { useState, useMemo, useEffect } from 'react';

import './loginOrganism.css';

import { Button, Input, Img } from '../atoms/';

interface Props {
  onSubmit: (value: { login: string; mdp: string }) => Promise<void>;
}

export default function LoginOrganism({ onSubmit }: Props) {
  const [infoUser, setInfoUser] = useState<{ login: string; mdp: string }>({
    login: '',
    mdp: '',
  });

  const infoUserIsEmpty = useMemo(
    () => !infoUser.login || !infoUser.mdp,
    [infoUser],
  );

  return (
    <main>
      <Img className="background" img="background" />

      <div className="card-container">
        <Img className="exim-logo" img="logoAndBrand" />
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
        <Button
          className="button"
          title="Se connecter"
          onClick={() => onSubmit(infoUser)}
          disabled={infoUserIsEmpty}
        />

        <Img className="njg-logo" img="logoNjgConnect" />
      </div>
    </main>
  );
}
