import React from "react";

import "./reschedule.css"
import "./intervention.css"
import images from "../../assets/images/"

import { RescheduleFolder, Img } from "../atoms";

interface data {
    id: number;
    name: string;
}

interface Props {
    data: data[];
}

const Reschedule: React.FC<Props> = ({data}) => {

    return (

        <div className="intervention-container">
            <div className="top">
                <Img className="img" img="calendar" />
                <div className="reschedule">
                    {data.map(dossier => (<RescheduleFolder id={dossier.id} name={dossier.name} key={dossier.id} />))}
                </div>
            </div>
            <div className="bottom">
                <h1><span>2</span> A replanifier</h1>
            </div>
        </div>

    )

}


export default Reschedule