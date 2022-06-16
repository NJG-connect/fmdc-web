import React from "react";

import './inputContainer.css'
// import { Input } from "../atoms/index"


interface Props {
    name: string,
    type: string,
    setState: React.Dispatch<React.SetStateAction<string>>
}


const InputContainer: React.FC<Props> = ({name, type, setState}) => {

    return (

        <div className="container">

            <p className="title">{name}</p>

        </div>

    )

}

export default InputContainer