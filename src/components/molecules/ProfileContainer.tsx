import React from 'react'

import "./profileContainer.css"
import "../../assets/fonts/index.css"
import images from "../../assets/images/"

import { Button } from '../atoms'

interface Props {
    show: boolean;
}

const ProfileContainer: React.FC<Props> = ({ show = false }) => {

    return (
        
        <div className="profile-container" style={show ? {display: "flex"} : {display: "none"}}>
            <h1>Rita Louise</h1>
            <p>Mon profil</p>
            <div className="button-container">
                <div className="img" style={{ backgroundImage: `url(${images.logout})` }}></div>
                <Button className="button" title="Déconnexion" onClick={() => console.log("LogOut")} />
            </div>
        </div>

    )

}

export default ProfileContainer