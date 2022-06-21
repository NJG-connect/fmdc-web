import React from 'react'

import "./profileContainer.css"
import "../../assets/fonts/index.css"
import images from "../../assets/images/"

import { Button } from '../atoms'

interface Props {
    show: boolean;
    name: string;
    onClick?: () => void;
}

// Modal + Props (Name + function)
const ModalContainer: React.FC<Props> = ({ show = false, name, onClick = () => console.log(name)}) => {

    return (
        
        <div className="modal-container" style={show ? {display: "flex"} : {display: "none"}}>
            <h1>{name}</h1>
            <p>Mon profil</p>
            <div className="button-container">
                <div className="img" style={{ backgroundImage: `url(${images.logout})` }}></div>
                <Button className="button" title="Déconnexion" onClick={onClick} />
            </div>
        </div>

    )

}

export default ModalContainer