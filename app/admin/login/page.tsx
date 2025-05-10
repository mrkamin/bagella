"use client"

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
const LoginPage = () => { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
        
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (username === process.env.NEXT_PUBLIC_ADMIN_USER && password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
            document.cookie = "admin-auth=true; path=/";
            router.push('/admin/dashboard');
        } else {
            alert('Invalid Credentials');
        }
    }
    return (
    <form onSubmit={handleSubmit} className='max-w-sm mx-auto mt-20 space-y-4'>
        <input 
            placeholder='Username' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className='border p-2 w-full' 
        />
        <input 
            type='password' 
            placeholder='Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className='border p-2 w-full' 
        />
        <Button type='submit'>Login</Button>
    </form>
  )
}

export default LoginPage
