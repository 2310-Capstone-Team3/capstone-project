import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const PassReset = ({users, resetPassword}) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [resetStatus, setResetStatus] = useState('')

    const _resetPassword = async (ev) => {
        ev.preventDefault();
        
        try {
            if (users.data.some(user => user.username === username && user.email === email) && password === passwordConfirmation) {
            console.log("user exists and password confirmed");
            //console.log(password);
            const foundUser = users.data.find(user => user.username === username && user.email === email);
            //console.log(foundUser)
            //console.log(foundUser.password)
            await resetPassword(foundUser, password)
            //console.log(foundUser.password)
            setResetStatus("success")

            } else if (users.data.some(user => user.username === username && user.email === email) && password !== passwordConfirmation) {
            console.log("passwords are different");
            setResetStatus("notmatching")
            } else {
            console.log("user does not exist");
            setResetStatus("missinguser")
            }
        } catch (ex) {
            console.error("An error occurred:", ex);
            setResetStatus("fail")
        }
        setPassword('')
        setPasswordConfirmation('')
    };

    return (
        <div>
        <form name='passreset' onSubmit = {_resetPassword}>
        <input
            placeholder='username'
            value={ username }
            onChange={ ev => setUsername(ev.target.value)}
        />
        <input
            type='email'
            placeholder='email'
            value={ email }
            onChange={ ev => setEmail(ev.target.value)}
        />
        <input
            type='password'
            placeholder='password'
            value={ password }
            onChange={ ev => setPassword(ev.target.value)}
        />
        <input
            type='password'
            placeholder='confirm password'
            value={ passwordConfirmation }
            onChange={ ev => setPasswordConfirmation(ev.target.value)}
        />
        <button disabled={!username || !email || !password || !passwordConfirmation}>Reset Password</button>
        {resetStatus === "success" && (
            <div>
            <span style={{ display: 'flex', alignItems: 'center'}}>
            <img
                src='https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-7/177800/338-512.png'
                alt='null'
                style={{ width: '20px', height: '20px', paddingRight: '5px' }}
            />
            <h4>Your password has been reset successfully, you may login with your new details below</h4> 
            </span>
            <Link to='/account'>Login</Link>
            </div>
        )}
        {resetStatus === "failure" && (
            <div>
            <span style={{ display: 'flex', alignItems: 'center'}}>
            <img
                src='https://static-00.iconduck.com/assets.00/dialog-error-icon-2048x2046-iguhlihj.png'
                alt='null'
                style={{ width: '20px', height: '20px', paddingRight: '5px' }}
            />
            <h4>Something went wrong and we were unable to reset your password, please try again</h4> 
            </span>
            </div>
        )}
        {resetStatus === "notmatching" && (
            <div>
            <span style={{ display: 'flex', alignItems: 'center'}}>
            <img
                src='https://static.vecteezy.com/system/resources/previews/012/042/289/original/warning-sign-icon-transparent-background-png.png'
                alt='null'
                style={{ width: '20px', height: '20px', paddingRight: '5px' }}
            />
            <h4>The passwords you provided are different, please make sure they are the same</h4> 
            </span>
            </div>
        )}
        {resetStatus === "missinguser" && (
            <div>
            <span style={{ display: 'flex', alignItems: 'center'}}>
            <img
                src='https://static.vecteezy.com/system/resources/previews/012/042/289/original/warning-sign-icon-transparent-background-png.png'
                alt='null'
                style={{ width: '20px', height: '20px', paddingRight: '5px' }}
            />
            <h4>There is no account with the username entered, please check and try again</h4> 
            </span>
            </div>
        )}
        </form>
        </div>
    )
}

export default PassReset