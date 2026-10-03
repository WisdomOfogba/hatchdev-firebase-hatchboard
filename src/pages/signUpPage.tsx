import React, { useState } from 'react'
import { register } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const signUpPage = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            navigate('/feed');
        } catch (error) {
            console.error('Error during sign up:', error);
        }
    }

    return (
        <div className="items-center flex flex-col justify-center min-h-screen max-w-3xl mx-auto bg-gray-100">
            <form className='flex-col flex' onSubmit={handleSignUp}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Sign Up</button>
                </div>
            </form>
            <div>
                <p>Already have an account? <a className="text-blue-500 hover:underline" href="/login">Log in</a></p>
            </div>
        </div>
    )
}

export default signUpPage