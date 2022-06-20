import React from 'react'

import "./profileContainer.css"
import "../../assets/fonts/index.css"

import { Button } from '../atoms'

const ProfileContainer: React.FC = () => {

    return (
        
        <div>
            <h1>Rita Louise</h1>
            <p>Mon profil</p>
            <Button title="test" onClick={() => console.log("Click")} />
        </div>

    )

}

export default ProfileContainer