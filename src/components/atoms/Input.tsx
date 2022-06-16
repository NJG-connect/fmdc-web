import React from "react";

interface Props {
    type: string,
    className: string,
    setState: React.Dispatch<React.SetStateAction<string>>
}

const Input: React.FC<Props> = ({type, className, setState}) => {

    return (

        <input type={type} className={className} onChange={(e) => setState(e.target.value)} />

    )

}

export default Input
