import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {
   //Redux Dispatch
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName]   = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  

  const onEamilHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }


  const onSubmitHandler = (event) => {
    //event.preventDefault 설정 안하면 화면 reflash 발생 한다 
    event.preventDefault();
    // console.log('Email', Email)
    // console.log('Password', Password)
    // console.log('name', Name)
    // console.log('확인Password', Password)
    if(Password.length < 5 || Password.length > 20){
      return alert('5자리 ~ 20자리 이내로 입력해주세요.');
    }

    if(Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }
    
    //Redux Action
    let body = {
      email: Email,
      password: Password,
      name: Name
    }

    //Axos.post('/api/users/register', body)
    //ACTION registerUser 
    dispatch(registerUser(body))
        .then(response => {
            if (response.payload.success) {
                props.history.push("/login")
            } else {
                alert("Failed to sign up")
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

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        
        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

        <br />
        <button type='submit'>
          회원가입
        </button>
      </form>
    </div>
  )
}

export default RegisterPage