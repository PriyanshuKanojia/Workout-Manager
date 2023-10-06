import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup';

export default function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signup, error, isLoading} = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);

  }

  return (
    <div className="signup">
            <h2>Signup Page</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" required placeholder="Enter your email" value= {email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" required placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button disabled={isLoading}>Sign Up</button>
                {error && <div className='error'> {error} </div>}
            </form>
        </div>
  )
}