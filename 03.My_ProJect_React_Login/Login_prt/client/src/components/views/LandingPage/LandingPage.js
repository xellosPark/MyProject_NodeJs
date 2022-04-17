import React, { useEffect } from 'react'
import axios from 'axios';

function LandingPage(props) {

  useEffect(()=>{
    axios.get('/api/hello')
    .then(response=> {console.log(response)})
  },[])

  const onclickHandler = () => {
    axios.get('/api/users/logout')
      .then(response => {
          if(response.data.success){
            props.history.push("/login")
            console.log(response.data)
          } else {
            alert('로그아웃 하는데 실패 했습니다.')
          }
      })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <h1>시작 페이지</h1>
      <button onClick={onclickHandler}>
        로그아웃
      </button>
    </div>
  )
}

export default LandingPage