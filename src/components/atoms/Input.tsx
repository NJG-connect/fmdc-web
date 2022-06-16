import React from "react";

import "./input.css"


interface Props {
    name: string,
    type: 'text' | 'password',
    onChange: (e: any) => void
}


const Input: React.FC<Props> = ({name, type, onChange}) => {

    return (

        <div className="container">

            <p className="title">{name}</p>
            <input type={type} onChange={onChange} className="input" />

        </div>

    )

}

export default Input