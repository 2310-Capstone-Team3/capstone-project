import React from 'react';
import Login from './accountComponents/Login'
import { Link } from 'react-router-dom'

const Account = ({ login, users, resetPassword })=> {

  return (
    <div>
      <main>
        {<Login login = { login } users = { users } resetPassword = { resetPassword }></Login>}
        <h3>Dont have an account? Click here to create one</h3>
        <Link to='/register'>Register</Link>
      </main>
    </div>
  );
}

export default Account;
