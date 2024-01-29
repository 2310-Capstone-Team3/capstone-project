import React from 'react';
import Login from './accountComponents/Login'
import { Link } from 'react-router-dom'
import LoggedInDetails from './accountComponents/LoggedInDetails';

const Account = ({ login, users, authId, user, resetPassword, resetUsername, resetEmail, logout, orders, products, lineItems })=> {

  return (
    <div className='login'>
      {
        authId ? (
          <div>
            {<LoggedInDetails lineItems = { lineItems } products = { products } orders = { orders } logout = { logout } user = { user } resetPassword = { resetPassword } resetUsername = { resetUsername } resetEmail = { resetEmail }></LoggedInDetails>}
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
