import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../userContext';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  const Login = async (e) => {
    e.preventDefault();
    const responce = await fetch("http://localhost:4000/login", {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-type': 'application/json' },
      credentials: 'include'
    })
    if (responce.ok) {
      responce.json().then(userInfo=>{
        setUserInfo(userInfo)
        setRedirect(true);
      })      
      
    } else {
      alert("Wrong Credentials !");
    }
  }
  if (redirect) {
    return <Navigate to='/'></Navigate>
  }
  return (
    <div>
      <form className='login' onSubmit={Login}>
        <h1>Login</h1>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={e => { setUsername(e.target.value) }}
        ></input>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => { setPassword(e.target.value) }}
        ></input>
        <button>Login</button>
      </form>
    </div>
  )
}

export default LoginPage