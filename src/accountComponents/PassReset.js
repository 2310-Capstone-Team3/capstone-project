import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const PassReset = ({users, resetPassword}) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const _resetPassword = async (ev) => {
        ev.preventDefault();
        
        try {
            if (users.data.some(user => user.username === username && user.email === email) && password === passwordConfirmation) {
            console.log("user exists and password confirmed");
            console.log(password);
            const foundUser = users.data.find(user => user.username === username && user.email === email);
            console.log(foundUser)
            console.log(foundUser.password)
            await resetPassword(foundUser, password)
            console.log(foundUser.password)

            } else if (users.data.some(user => user.username === username && user.email === email) && password !== passwordConfirmation) {
            console.log("passwords are different");
            } else {
            console.log("user does not exist");
            }
        } catch (ex) {
            console.error("An error occurred:", ex);
        }
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
            type='text'
            placeholder='password'
            value={ password }
            onChange={ ev => setPassword(ev.target.value)}
        />
        <input
            type='text'
            placeholder='confirm password'
            value={ passwordConfirmation }
            onChange={ ev => setPasswordConfirmation(ev.target.value)}
        />
        <button disabled={!username || !email || !password || !passwordConfirmation}>Reset Password</button>
        </form>
        </div>
    )
}

export default PassReset