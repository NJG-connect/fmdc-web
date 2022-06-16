import React from 'react'
import { useState, useEffect } from 'react'


interface User {
    name?: string,
    password?: string
}


const Login: React.FC = () => {

    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [user, setUser] = useState<User>({})

    useEffect(() => {
      
        setUser({
            name: userName,
            password: password
        })
      
    }, [userName, password])
    
    

    return (
        <main>

        <div className="background"></div>

        {/* <div className="card-container">

            <div className="exim-logo"></div>
            <h1 className="main-title">Identification</h1>
            <div className="input-container">
                <Input name="Nom D'utilisateur" type="text" setState={setUserName} />
                <Input name="Mot de passe" type="password" setState={setPassword} />
            </div>
            <Button user={user} />
            
            <div className="njg-logo"></div>

        </div> */}

        </main>
    )

}

export default Login