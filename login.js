import React, {useState} from "react"
//g
export const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email)
    }
    return(
        <>
        <form action="">
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Ejemplo@gmail.com" id="email" name="email"/>

            <label htmlFor="password">Contraseña</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password123" id="password" name="password"/>

            <button>Log In</button>
        </form>

        <button>No tiene una cuenta? Registrese</button>
        </>
    )
}