import React, { useState } from 'react';

const Account = ({ login, signUp, users, setUsers })=> {
  const [username, setUsername] = useState('');
  const [loginUsername, setLoginUsername] = useState('')
  const [signUpUsername, setSignUpUsername] = useState('')
  const [password, setPassword] = useState('');
  const [loginPassword, setLoginPassword] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState('')
  const [signedUpStatus, setSignedUpStatus] = useState('')

  const _login = async(ev) => {
    ev.preventDefault();
      if (users.data.some(user => user.username === username)) {
      try {
        await login({ username, password });
        setLoginStatus("true")
      }
      catch(ex){
        console.log(ex.response.data);
        setLoginStatus("wrongPass")
      }
    } else {
      setLoginStatus("na")
    }
  }

  const _signUp = async (ev) => {
    ev.preventDefault();
    console.log("users:", users)
    if (!users.data.some(user => user.username === username)) {
      console.log("username doesnt exist, attempting to create an account")
      try {
        const newUserData = await signUp({ username, password, is_admin: false, is_vip: false })
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
      <h2>Login to an existing account</h2>
      <form name='login' onSubmit={ _login }>
        <input
          placeholder='username'
          value={ loginUsername }
          onChange={ ev => setUsername(ev.target.value) & setLoginUsername(ev.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          value={ loginPassword }
          onChange={ ev => setPassword(ev.target.value) & setLoginPassword(ev.target.value)}
        />
        <button disabled={!loginUsername || !loginPassword}>Login</button>
  
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
          <span style={{ display: 'flex', alignItems: 'center'}}>
          <img
            src='https://static.vecteezy.com/system/resources/previews/012/042/289/original/warning-sign-icon-transparent-background-png.png'
            alt='null'
            style={{ width: '20px', height: '20px', paddingRight: '5px' }}
          />
          <h4>The password associated with this username is different than the one provided, please try again</h4> 
        </span>
        )}
      </form>
      <h2>Create a new account</h2>
      <form name='signup' onSubmit = { _signUp }>
      <input
          placeholder='username'
          value={ signUpUsername }
          onChange={ ev => setUsername(ev.target.value) & setSignUpUsername(ev.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          value={ signUpPassword }
          onChange={ ev => setPassword(ev.target.value) & setSignUpPassword(ev.target.value)}
        />
        <button disabled={!signUpUsername || !signUpPassword}>Signup</button>
        
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
          <span style={{ display: 'flex', alignItems: 'center'}}>
            <img
              src='https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-7/177800/338-512.png'
              alt='null'
              style={{ width: '20px', height: '20px', paddingRight: '5px' }}
            />
            <h4>Your account has been created successfully, please login above</h4>
          </span>
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

export default Account;
