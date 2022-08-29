import React, { useContext, useMemo, useState } from 'react';

import { ModalContainer } from '../molecules';
import { Img } from '../atoms';

import './headerTemplate.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { JwtUserType } from '../../types/UserContext';
import { roles, Roles } from '../../types/roles';

interface Props {
  children: React.ReactNode;
}

const HeaderTemplate: React.FC<Props> = ({ children }) => {
  const { userContext, setUserContext } = useContext(UserContext);
  let navigate = useNavigate();

  const handleLogout = () => {
    const newUserContext: JwtUserType = { ...userContext };
    delete newUserContext.exp;
    delete newUserContext.token;
    setUserContext(newUserContext);

    navigate('/login', { replace: true });
  };

  const pseudo = useMemo(
    () =>
      userContext && userContext.nom && userContext.prenom
        ? `${userContext.nom[0]}${userContext.prenom[0]}`
        : '🫣',
    [userContext],
  );

  const role = useMemo(
    () =>
      userContext && userContext.idGroupeUtilisateur
        ? roles[userContext.idGroupeUtilisateur as Roles]
        : '',
    [userContext],
  );

  const name = useMemo(
    () =>
      userContext && userContext.nom && userContext.prenom
        ? `${userContext.nom} ${userContext.prenom}`
        : 'Sans nom',
    [userContext],
  );

  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <div className="page" onClick={() => isShow && setIsShow(false)}>
      <header>
        <Img className="exim-logo" img="logoAndBrand" />

        <h1 className="header-title">Soft Enrobé</h1>

        <div className="user-information">
          <ModalContainer show={isShow} name={name} onClick={handleLogout} />
          <div className="icon" onClick={() => setIsShow(!isShow)}>
            <h1 className="header-pseudo">{pseudo}</h1>
          </div>
          <p>{role}</p>
        </div>
      </header>
      <div className="content-page">{children}</div>
    </div>
  );
};

export default HeaderTemplate;
