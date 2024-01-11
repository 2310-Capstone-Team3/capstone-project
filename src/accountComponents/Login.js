import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const Login = ({ login, users })=> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('')

    const _login = async(ev) => {
        ev.preventDefault();
        if (users.data.some(user => user.username === username)) {
        try {
            await login({ username, password });
            console.log(users)
            setLoginStatus("true")
        }
        catch(ex){
            console.log(ex.response.data);
            setLoginStatus("wrongPass")
        }
        } else {
        setLoginStatus("na")
        }
        setUsername('')
        setPassword('')
    }

    return (
        <div>
        <h2>Login to an existing account</h2>
        <form name='login' onSubmit={ _login }>
            <input
            placeholder='username'
            value={ username }
            onChange={ ev => setUsername(ev.target.value)}
            />
            <input
            type='password'
            placeholder='password'
            value={ password }
            onChange={ ev => setPassword(ev.target.value)}
            />
            <button disabled={!username || !password}>Login</button>
    
            {loginStatus === "na" && (
            <span style={{ display: 'flex', alignItems: 'center'}}>
            <img
                src='https://static-00.iconduck.com/assets.00/dialog-error-icon-2048x2046-iguhlihj.png'
                alt='null'
                style={{ width: '20px', height: '20px', paddingRight: '5px' }}
            />
            <h4>Couldn't find a user with these credentials, create an account below</h4> 
            </span>
        )}
        {loginStatus === "wrongPass" && (
            <div>
            <span style={{ display: 'flex', alignItems: 'center'}}>
            <img
                src='https://static.vecteezy.com/system/resources/previews/012/042/289/original/warning-sign-icon-transparent-background-png.png'
                alt='null'
                style={{ width: '20px', height: '20px', paddingRight: '5px' }}
            />
            <h4>The password associated with this username is different than the one provided, please try again. If you have forgotten your password you may reset it below</h4> 
            </span>
            <Link to='/passreset'>Reset Password</Link>
            </div>
        )}
        </form>
        </div>
    );
}

export default Login