import { MuiThemeProvider } from '@material-ui/core'
import React, { useState } from 'react'
import './styles.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import App from '../../App';
import { auth } from '../../lib/init-firebase';

const SignUp = () => {
   
  
    const [email, setEmail] = useState('') 
    const [pass, setPass] = useState('')  

    const signUp= ()=>{
    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      alert('User Created')

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      alert(errorCode)
      // ..
    });
}

 
  return (
    <div className="form">
    <form>
      <div className="input-container">
        <label>Email </label>
        <input type={"email"} placeholder='Enter password'  onChange={(e)=>setEmail(e.target.value)} />
       
      </div>
      <div className="input-container">
        <label>Password </label>
        <input type="password"  placeholder='Enter password' onChange={(e)=>setPass(e.target.value)} />
      
      </div>
      <div className="button-container">
        <button type="submit"  >Sign In</button>
      </div>
      <div className="button-container">
        <button type="submit" onClick={signUp} >Create account</button>
      </div>
    </form>
  </div>
  )
}

export default SignUp