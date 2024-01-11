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
    };

    return (
    <div>
        <h2>Create a new account</h2>
        <form name='signup' onSubmit = { _signUp }>
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
        <input
            placeholder='email'
            value={ email }
            onChange={ ev => setEmail(ev.target.value)}
        />
        <button disabled={!username || !password}>Signup</button>
        
        {signedUpStatus === "failed" && (
            <span style={{ display: 'flex', alignItems: 'center'}}>
            <img
                src='https://static-00.iconduck.com/assets.00/dialog-error-icon-2048x2046-iguhlihj.png'
                alt='null'
                style={{ width: '20px', height: '20px', paddingRight: '5px' }}
            />
            <h4>An error occurred while trying to sign you up, please try again</h4>
            </span>
        )}
        {signedUpStatus === "created" && (
            <div>
            <span style={{ display: 'flex', alignItems: 'center'}}>
            <img
                src='https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-7/177800/338-512.png'
                alt='null'
                style={{ width: '20px', height: '20px', paddingRight: '5px' }}
            />
            <h4>Your account has been created successfully, please click here to login</h4>
            </span>
            <Link to='/account'>Login</Link>
            </div>
        )}
        {signedUpStatus === "exists" && (
            <span style={{ display: 'flex', alignItems: 'center'}}>
            <img
            src='https://static.vecteezy.com/system/resources/previews/012/042/289/original/warning-sign-icon-transparent-background-png.png'
            alt='null'
            style={{ width: '20px', height: '20px', paddingRight: '5px' }}
            />
            <h4>An account with this username already exists, please enter a different username and try again</h4>
        </span>
        )}
        </form>
    </div>
    );
}

export default Register;
