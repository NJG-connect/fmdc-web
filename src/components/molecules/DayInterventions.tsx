import React from "react";

import "./dayIntervention.css"
import "./intervention.css"
import images from "../../assets/images/"

// Date, intervention du jour, maxIntervention
const DayInterventions: React.FC = () => {

    return (

        <div className="intervention-container">
            <div className="top">
                <div className="img" style={{ backgroundImage: `url(${images.road})` }}></div>
                <div className="circle-container">
                    {/* Component ProgressCircleBar (%, color=red) */}
                    <svg>
                      <circle cx="56" cy="56" r="50" style={{ strokeDasharray: `${312 - (312*((100-32)/100))} ${312 - (312*(32/100))}` }}></circle>
                    </svg>
                    <p>32%</p>
                </div>
            </div>
            <div className="bottom">
                <h1><span>12</span> Intervention du jour</h1>
                <h3>21/06/2022</h3>
            </div>
        </div>

    )

}


export default DayInterventions