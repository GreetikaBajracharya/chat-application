import React, {useState, useContext} from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {

    const [currState, setCurrState] = useState('Sign up');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [bio, setBio] = useState('');
    const [isDataSubmitted, setIsDataSubmitted] = useState(false);

    const {login} = useContext(AuthContext);

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (currState === 'Sign up' && !isDataSubmitted) {
            setIsDataSubmitted(true)
            return;
        }

        // Send only required fields based on the action
        const credentials = currState === 'Sign up' 
            ? {fullName, email, password, bio}
            : {email, password};
            
        login(currState === 'Sign up' ? 'signup' : 'login', credentials)
    }

  return (
    <div className='flex items-center justify-center gap-8 min-h-screen bg-cover bg-center sm:justify-evenly max-sm:flex-col backdrop-blur-2xl' >

        <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />

        <form onSubmit={onSubmitHandler}
        className='flex flex-col gap-6 rounded-lg shadow-lg bg-white/8 text-white border border-gray-500 p-6'>
           <h2 className='text-2xl font-medium flex justify-between items-center'>
            {currState}
            {isDataSubmitted && (
              <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer'/>
            )}
            </h2>

            {currState === 'Sign up' && !isDataSubmitted && (
                <input onChange={(e) => setFullName(e.target.value)}
                type="text" 
                value={fullName}
                className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                placeholder='Full Name' required />
            )}

            {!isDataSubmitted && (
                <>
                <input onChange={(e) => setEmail(e.target.value)}
                 type="email" 
                 value={email}
                 className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                 placeholder='Email' required 
                 />
                <input onChange={(e) => setPassword(e.target.value)} 
                type="password" 
                value={password}
                className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                placeholder='Password' required 
                />               
                </>
            )}
            {currState === 'Sign up' && isDataSubmitted && (
                <textarea onChange={(e) => setBio(e.target.value)} 
                value={bio} 
                rows={4}
                className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                placeholder='Bio' required> </textarea>
            )}

            <button type="submit" className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
                {currState === 'Sign up' ? 'Create Account' : 'Login'}
            </button>

            <div className='flex items-center gap-2 text-sm text-gray-500'>
                <input type="checkbox" />
               <p>I agree to the terms of use & privacy policy.</p>
            </div>

            <div className='flex flex-col gap-2'>
                {currState === 'Sign up' ? (
                    <p>Already have an account? <span className='text-indigo-500 cursor-pointer' onClick={() => {setCurrState('Login'); setIsDataSubmitted(false);}}>Login</span></p>
                ) : (
                    <p>Don't have an account? <span className='text-indigo-500 cursor-pointer' onClick={() => setCurrState('Sign up')}>Sign up</span></p>
                )}
            </div>

        </form>
    </div>
  )
}

export default LoginPage