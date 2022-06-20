import React from 'react'

import "./profileContainer.css"
import "../../assets/fonts/index.css"

import { Button } from '../atoms'

interface Props {
    show: boolean;
}

const ProfileContainer: React.FC<Props> = ({ show = false }) => {

    return (
        
        <div className="profile-container" style={show ? {display: "flex"} : {display: "none"}}>
            <h1>Rita Louise</h1>
            <p>Mon profil</p>
            <Button className="button" title="Déconnexion" onClick={() => console.log("Click")} />
        </div>

    )

}

export default ProfileContainer