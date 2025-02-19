import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const RegisterOrLogin = ({pageName}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const linkTo = pageName === 'register' ? 'login' : 'register';

    const submitForm = (e) => {
        e.preventDefault()
        if(confirm && password !== confirm){
            console.log({
                email:email,
                password:password,
                confirm:confirm,
            })
        }
    }

  return (
    <div>
        <p>{pageName}</p>
        <form onSubmit={submitForm}>
            <input type="email" 
                name="email"
                placeholder='Email' 
                autoComplete="Email" 
                onChange={(e)=>setEmail(e.target.value)}/><br />
            <input type="password" 
                name="password"placeholder='Password'
                autoComplete="password" 
                onChange={(e)=>setPassword(e.target.value)}/><br />

            {pageName === 'register' && 
                <input 
                    type="password" 
                    name="confirm"
                    placeholder='Confirm Password' 
                    autoComplete="confirm"
                    onChange={(e)=>setConfirm(e.target.value)}
                    style={(confirm && password !== confirm) ? { backgroundColor : "red" }:null}
                />
            }

            {pageName === 'register' && <br/>}
            <button>{pageName}</button>
        </form>
        <Link to={`/${linkTo}`}><p>{`${linkTo}`} instead</p></Link>
        {pageName === 'login' &&
            <a href="/">I forgot my password</a>
        }
    </div>
  )
}

export default RegisterOrLogin;