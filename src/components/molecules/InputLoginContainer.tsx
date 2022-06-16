import React from "react";

import { Input } from "../atoms/index"


interface Props {
    name: string,
    type: string,
    setState: React.Dispatch<React.SetStateAction<string>>
}


const InputLoginContainer: React.FC<Props> = ({name, type, setState}) => {

    return (

        <div className="container">

            <p className="title">{name}</p>
            <Input type={type} setState={setState} className="input" />

        </div>

    )

}

export default InputLoginContainer