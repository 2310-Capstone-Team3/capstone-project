import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ login, users })=> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('')
    const navigate = useNavigate()

    const _login = async(ev) => {
        ev.preventDefault();
        if (users.data.some(user => user.username === username)) {
        try {
            await login({ username, password });
            console.log(users)
            setLoginStatus("true")
            navigate('/')
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
        <main className='loginContainer'>
            <div className='loginFormContainer'>
                <br></br>
                <h2 className='loginTitle'>Sign in</h2>
                <h3 className='loginTitle'>Sign In Details</h3>
                <form className='loginForm' name='login' onSubmit={ _login }>
                        <h5 className='loginText'>Username</h5>
                    <div className='loginFormDiv'>
                        <input className='usernameInput loginInputBox'
                        value={ username }
                        onChange={ ev => setUsername(ev.target.value)}
                        />
                    </div>
                        <h5 className='loginText'>Password</h5>
                    <div className='loginFormDiv'>
                        <input className='passwordInput loginInputBox'
                        type='password'
                        value={ password }
                        onChange={ ev => setPassword(ev.target.value)}
                        />
                    </div>
                    <button className='loginButton' disabled={!username || !password}>Sign In</button>
            
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
        </main>
    );
}

export default Login