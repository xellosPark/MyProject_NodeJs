import React, { useEffect } from 'react'
import axios from 'axios';

function LandingPage() {

  useEffect(()=>{
    axios.get('/api/hello')
  },[])

  return (
    <div>
      LandingPage 랜딩 페이지
    </div>
  )
}

export default LandingPage