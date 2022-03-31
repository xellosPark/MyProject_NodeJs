import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

function LoginPage(props) {
  //Redux Dispatch
  const dispatch = useDispatch();

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
    // console.log('Email', Email)
    // console.log('Password', Password)
    
    //Redux Action
    let body = {
      email: Email,
      password: Password
    }
    
    dispatch(loginUser(body))
      .then(response => {
        // 완료후 홈페이지 이동
        if (response.payload.loginSuccess){
          props.history.push('/')
        } else {
          alert('Error')
        }
      })
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