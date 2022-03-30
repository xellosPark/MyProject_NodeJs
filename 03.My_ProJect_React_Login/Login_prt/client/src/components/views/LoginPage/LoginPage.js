import React, { useState } from 'react'

function LoginPage() {

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEamilHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    //event.preventDefault 설정 안하면 화면 reflash 발생 한다 
    event.preventDefault();
    console.log('Email', Email)
    console.log('Password', Password)

  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{ display:'flex', flexDirection:'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEamilHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type='submit'>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage