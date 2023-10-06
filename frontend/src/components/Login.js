import React, { useState } from 'react';
import {useLogin} from '../hooks/useLogin';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  }

  return (
    <div className="login">
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" required placeholder="Enter your email" value= {email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" required placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button disabled={isLoading}>Log In</button>
                {error && <div className='error'> {error} </div>}
            </form>
        </div>
  )
}