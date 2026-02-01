import { useState } from "react"

const LoginForm = ({loginUser, logoutUser, token}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = event => {
        event.preventDefault()

        loginUser(username, password)

        setPassword('')
        setUsername('')
    }

    if(token)
    {
        return(
            <button onClick={logoutUser}>Logout</button>
        )
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Username
                    <input type="text" autoComplete="username" value={username} onChange={({target})=>setUsername(target.value)}/>
                </label>
                <br/>
                <label>
                    Password
                    <input type="password" autoComplete="current-password" value={password} onChange={({target})=>setPassword(target.value)}/>
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm