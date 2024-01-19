import React, { useState, useEffect } from 'react';

const LoggedInDetails = ( {user, resetPassword, resetUsername, resetEmail} ) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [displayEmail, setDisplayEmail] = useState('')

    const _changeUsername = async (ev) => {
        ev.preventDefault();
        try {
            const response = await resetUsername(user, username)
            console.log("Success changing username")
            setDisplayName(response.username)
            window.location.reload()
        } catch (error) {
            console.error("An error occurr ed:", error);
        }
        setUsername('')
    }

    const _changePassword = async (ev) => {
        ev.preventDefault();
        try {
            const response = await resetPassword(user, password)
            console.log("Success changing password")
            window.location.reload()
        } catch (error) {
            console.error("An error occurred:", error);
        }
        setPassword('')
    }

    const _changeEmail = async (ev) => {
        ev.preventDefault();
        try {
            const response = await resetEmail(user, email)
            console.log("Success changing email")
            setDisplayEmail(response.email)
            window.location.reload()
        } catch (error) {
            console.error("An error occurred:", error);
        }
        setEmail('')
    }

    useEffect(() => {
        const updateDisplayDetails = async () => {
            await setDisplayName(user.username)
            await setDisplayEmail(user.email)
        };
        updateDisplayDetails();
    }, []);

    if (user != undefined) {
        return (
            <div>
                <span>
                <h2>Account details for {displayName}</h2>
                </span>
                <br></br>
                <h4>Your username is {displayName}</h4>
                <form name='changeUsername' onSubmit = {_changeUsername}>
                    <input
                        placeholder='username'
                        value={ username }
                        onChange={ ev => setUsername(ev.target.value)}
                    />
                    <button disabled={!username}>Change Username</button>
                </form>
                <form name='changePassword' onSubmit = {_changePassword}>
                    <input
                    type='password'
                        placeholder='password'
                        value={ password }
                        onChange={ ev => setPassword(ev.target.value)}
                    />
                    <button disabled={!password}>Change Password</button>
                </form>
                <h4>Your email is {displayEmail}</h4>
                <form name='changeEmail' onSubmit = {_changeEmail}>
                    <input
                    type='email'
                        placeholder='email'
                        value={ email }
                        onChange={ ev => setEmail(ev.target.value)}
                    />
                    <button disabled={!email}>Change Email</button>
                </form>
                {user.is_vip === true && (
                <div>
                <span style={{ display: 'flex', alignItems: 'center'}}>
                <img
                    src='https://seeklogo.com/images/S/shiny-golden-button-logo-D5756B919D-seeklogo.com.png?v=638258827760000000'
                    alt='null'
                    style={{ width: '20px', height: '20px', paddingRight: '5px' }}
                />
                <h4>You are a vip member!</h4> 
                </span>
                </div>
            )}
            </div>
        )
    } else {
        console.log("User not found")
    }
}

export default LoggedInDetails