import React, { useState } from 'react'
import { friendlyAuthError, login } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            setError(null);
            await login(email, password);
            navigate('/profile');
        } catch (error) {
            setError(friendlyAuthError(error))
            console.error('Error during login:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="items-center flex flex-col justify-center min-h-screen max-w-3xl mx-auto bg-gray-100">
            <form className='flex-col flex' onSubmit={handleLogin}>
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
                <div className='text-red-400'>{error && <p>{error}</p>}</div>
            </form>
            <div>
                <p>Don't have an account? <a className="text-blue-500 hover:underline" href="/signup">Sign up</a></p>
            </div>
        </div>
    )
}

export default LoginPage