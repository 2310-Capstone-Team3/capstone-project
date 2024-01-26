import React from 'react';
import Login from './accountComponents/Login'
import { Link } from 'react-router-dom'
import LoggedInDetails from './accountComponents/LoggedInDetails';

const Account = ({ login, users, authId, user, resetPassword, resetUsername, resetEmail, resetAddress, logout })=> {

  return (
    <div className='login'>
      {
        authId ? (
          <div>
            {<LoggedInDetails logout = { logout } user = { user } resetPassword = { resetPassword } resetUsername = { resetUsername } resetEmail = { resetEmail } resetAddress={ resetAddress }></LoggedInDetails>}
          </div>
        ) : (
        <div className='loginMain'>
          <main>
            {<Login login = { login } users = { users }></Login>}
          </main>
        </div>
        )
      }
    </div>
  );
}

export default Account;
