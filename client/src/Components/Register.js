import React, { useState } from 'react'

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const register = async(e)=>{
    e.preventDefault();
    const responce = await fetch("http://localhost:4000/register", {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers:{'Content-type':'application/json'}
    })
    if(responce.status === 200){
      alert("Registration Successful 1");
    }else{
      alert("Registration faild !");
    }

  }
  return (
    <div>
        <form className='register' onSubmit={register}>
            <h1>Register</h1>
            <input 
              type='text' 
              placeholder='Username' 
              value={username}
              onChange={e => setUsername(e.target.value)}
            >       
            </input>
            <input 
              type='password' 
              placeholder='Password' 
              value={password}
              onChange={e => setPassword(e.target.value)}
            >
            </input>

            <button>Register</button>
        </form>
    </div>
  )
}

export default Register