import React, { useState } from 'react';

const Account = ({ login })=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('')

  const _login = async(ev)=> {
    ev.preventDefault();
    try {
      await login({ username, password });
      setLoginStatus(true)
    }
    catch(ex){
      console.log(ex.response.data);
      setLoginStatus(false)
    }
  }
  return (
    <form onSubmit={ _login }>
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

      {loginStatus === false ? (
      <span style={{ display: 'flex', alignItems: 'center'}}>
        <img
          src='https://static-00.iconduck.com/assets.00/dialog-error-icon-2048x2046-iguhlihj.png'
          alt='null'
          style={{ width: '20px', height: '20px', paddingRight: '5px' }}
        />
        <h4>Couldn't find a user with these credentials</h4> 
      </span>
      ) : (
        null
        )
      }
    </form>
  );
}

export default Account;
