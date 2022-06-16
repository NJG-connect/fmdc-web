import React from "react";

import "./button.css"


interface Props {
    className: string,
    content: string
}


const Button: React.FC<Props> = ({className, content}) => {

    return (

        <div className={className} onClick={() => console.log("Onclick function") }>
            <p>{ content }</p>
        </div>

    )

}

export default Button