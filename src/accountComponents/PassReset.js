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
        <main className='resetContainer'>
            <div className='resetFormContainer'>
                <br></br>
                <h2 className='resetTitle'>Reset Password</h2>
        <form className='resetForm' name='passreset' onSubmit = {_resetPassword}>
        <h5 className='resetText'>Username</h5>
        <div className='resetFormDiv'>
            <input className='usernameInput resetInputBox'
            value={ username }
            onChange={ ev => setUsername(ev.target.value)}
            />
        </div>
        <h5 className='resetText'>Email</h5>
        <div className='resetFormDiv'>
            <input className='emailInput resetInputBox'
            value={ email }
            type='email'
            onChange={ ev => setEmail(ev.target.value)}
            />
        </div>
        <h5 className='resetText'>Password</h5>
        <div className='resetFormDiv'>
            <input className='passwordInput resetInputBox'
            value={ password }
            type='password'
            onChange={ ev => setPassword(ev.target.value)}
            />
        </div>
        <h5 className='resetText'>Confirm Password</h5>
        <div className='resetFormDiv'>
            <input className='passwordInput resetInputBox'
            value={ passwordConfirmation }
            type='password'
            onChange={ ev => setPasswordConfirmation(ev.target.value)}
            />
        </div>
        <button className='resetButton' disabled={!username || !email || !password || !passwordConfirmation}>Reset Password</button>
        </form>
        {resetStatus === "success" && (
            <div>
            <span className='successBox' style={{ display: 'flex', alignItems: 'center'}}>
            <h4 className='successText'>Your password has been reset successfully, you may login with your new details below</h4> 
            <Link className='successText' to='/login'>Login</Link>
            </span>
            </div>
        )}
        {resetStatus === "failure" && (
            <div>
            <span className='failedBox' style={{ display: 'flex', alignItems: 'center'}}>
            <h4 className='failedText'>Something went wrong and we were unable to reset your password, please try again</h4> 
            </span>
            </div>
        )}
        {resetStatus === "notmatching" && (
            <div>
            <span className='failedBox' style={{ display: 'flex', alignItems: 'center'}}>
            <h4 className='failedText'>The passwords you provided are different, please make sure they are the same</h4> 
            </span>
            </div>
        )}
        {resetStatus === "missinguser" && (
            <div>
            <span className='failedBox' style={{ display: 'flex', alignItems: 'center'}}>
            <h4 className='failedText'>There is no account with the information entered, please check and try again</h4> 
            </span>
            </div>
        )}
        </div>
        </main>
    )
}

export default PassReset