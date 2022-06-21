import React from "react";

import "./reschedule.css"
import "./intervention.css"
import images from "../../assets/images/"

import { RescheduleFolder } from "../atoms";

interface data {
    id: number;
    name: string;
}

const Reschedule: React.FC = () => {

    const date = new Date()

    const fakeData: data[] = [
        {id: 2341, name: "Provins"},
        {id: 2951, name: "Rousseaux"},
        {id: 9462, name: "DI Environement"},
        {id: 5820, name: "Cocherot"},
    ]

    return (

        <div className="intervention-container">
            <div className="top">
                <div className="img" style={{ backgroundImage: `url(${images.calendar})` }}></div>
                <div className="reschedule">
                    {fakeData.map(dossier => (<RescheduleFolder id={dossier.id} name={dossier.name} key={dossier.id} />))}
                </div>
            </div>
            <div className="bottom">
                <h1><span>2</span> A replanifier</h1>
            </div>
        </div>

    )

}


export default Reschedule