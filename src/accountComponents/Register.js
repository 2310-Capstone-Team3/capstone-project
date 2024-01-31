import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const Register = ({ signUp, users, setUsers })=> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [signedUpStatus, setSignedUpStatus] = useState('')

    const _signUp = async (ev) => {
        ev.preventDefault();
        console.log("users:", users)
        if (!users.data.some(user => user.username === username)) {
        console.log("username doesnt exist, attempting to create an account")
        try {
            const newUserData = await signUp({ username, password, email, is_admin: false, is_vip: false })
            setUsers(prevUsers => ({ data: [...prevUsers.data, newUserData] }));
            setSignedUpStatus("created")
        } catch (ex) {
            if (ex.response && ex.response.data) {
            console.log(ex.response.data);
            } else {
            console.log("An error occurred during signup.");
            }
            console.log("failure");
            setSignedUpStatus("failed")
        }
        } else {
        setSignedUpStatus("exists")
        }
        setUsername('')
        setPassword('')
        setEmail('')
    };

    return (
        <main className='signUpContainer'>
        <div className='signUpFormContainer'>
            <br></br>
            <h2 className='signUpTitle'>Sign up</h2>
            <h3 className='signUpTitle'>Sign Up Details</h3>
        <form className='signUpForm' name='signup' onSubmit = { _signUp }>
        <h5 className='signUpText'>Username</h5>
        <div className='signUpFormDiv'>
            <input className='usernameInput signUpInputBox'
            value={ username }
            onChange={ ev => setUsername(ev.target.value)}
            />
        </div>
        <h5 className='signUpText'>Password</h5>
        <div className='signUpFormDiv'>
            <input className='passwordInput signUpInputBox'
            type='password'
            value={ password }
            onChange={ ev => setPassword(ev.target.value)}
            />
        </div>
        <h5 className='signUpText'>Email</h5>
        <div className='signUpFormDiv'>
            <input className='emailInput signUpInputBox'
            type='email'
            value={ email }
            onChange={ ev => setEmail(ev.target.value)}
            />
        </div>
        <button className='signUpButton' disabled={!username || !password || !email}>Register</button>
        
        </form>
        {signedUpStatus === "failed" && (
            <span className='failedBox' style={{ display: 'flex', alignItems: 'center'}}>
            <h4 className='failedText'>An error occurred while trying to sign you up, please try again</h4>
            </span>
        )}
        {signedUpStatus === "created" && (
            <div>
            <span className='successBox' style={{ display: 'flex', alignItems: 'center'}}>
            <h4 className='successText'>Your account has been created successfully, please click here to login</h4>
            <Link className='successText' to='/login'>Login</Link>
            </span>
            </div>
        )}
        {signedUpStatus === "exists" && (
            <span className='existsBox' style={{ display: 'flex', alignItems: 'center'}}>
            <h4 className='existsText'>An account with this username already exists, please enter a different username and try again</h4>
        </span>
        )}
    </div>
    </main>
    
    );
}

export default Register;

{/* <main className='loginContainer'>
            <div className='loginFormContainer'>
                <br></br>
                <h2 className='loginTitle'>Sign up</h2>
                <h3 className='loginTitle'>Sign Up Details</h3>
                <form className='loginForm' name'login' onSubmit={ _login }>
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
                <Link to='/register'>
                    <h4 className='loginText'>Dont have an account? Click here to register.</h4>
                </Link>
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
        </main> */}