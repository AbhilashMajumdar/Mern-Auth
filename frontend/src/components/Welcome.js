import axios from 'axios'
import React, { useEffect, useState } from 'react';
import UserData from './UserData';
axios.defaults.withCredentials = true;

const Welcome = () => {

  const [userData, setUserData] = useState();

  const sendRequest = async ()=>{
    const res = await axios.get('http://localhost:5000/auth/user', {
      withCredentials: true
    }).catch((err)=>{
      console.log(err);
    });

    const data = res.data;
    // console.log(data);
    return data;
  }

  useEffect(()=>{
    sendRequest().then((data)=>setUserData(data.user));
  }, []);

  return (
    <>
      {
        userData &&
        <UserData data={userData}/>
      }
    </>
  )
}

export default Welcome
