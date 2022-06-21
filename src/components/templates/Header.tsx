import React from "react";
import { useState } from "react"

import images from "../../assets/images/"

import { ModalContainer } from "../molecules/"

interface Props {
    title: string;
    userInfo?: Object;
    onLogout?: () => void;
    isShow: boolean;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<Props> = ({title, userInfo, onLogout, isShow, setIsShow}) => {

    return (

      <header>

      <div className="exim-logo" style={{ backgroundImage: `url(${images.logoAndBrand})` }}></div>

      <h1 className="home-title">{title}</h1>

      <div className="user-information">
        <ModalContainer show={isShow} name="Rita Louise" onClick={onLogout} />
        <div className="icon" onClick={() => setIsShow(!isShow)}>
          <h1>RL</h1>
        </div>
        <p>Assistant(e)</p>
      </div>

    </header>

    )

}

export default Header