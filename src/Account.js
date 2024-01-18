import React from 'react';
import Login from './accountComponents/Login'
import { Link } from 'react-router-dom'
import LoggedInDetails from './accountComponents/LoggedInDetails';

const Account = ({ login, users, authId, user, resetPassword, resetUsername, resetEmail })=> {

  return (
    <div className='login'>
      {
        authId ? (
          <div>
            {<LoggedInDetails user = { user } resetPassword = { resetPassword } resetUsername = { resetUsername } resetEmail = { resetEmail }></LoggedInDetails>}
          </div>
        ) : (
        <div>
          <main>
            {<Login login = { login } users = { users }></Login>}
            <h3>Dont have an account? Click here to create one</h3>
            <Link to='/register'>Register</Link>
          </main>
        </div>
        )
      }
    </div>
  );
}

export default Account;
