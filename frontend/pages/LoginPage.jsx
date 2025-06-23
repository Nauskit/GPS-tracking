import { useState } from "react";


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSumbit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:3000/user/login', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login Failed");
            }
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('role', data.role);

            alert("Login successful")

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSumbit} className="space-y-4">
                    <div>
                        <label className="block text-left text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-left text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    {error && (
                        <div className="text-red-600">{error}</div>
                    )}
                    <div className='flex justify-center gap-3'>
                        <a href='#' className='hover:text-blue-700'>Register</a>
                        <p>/</p>
                        <a href='#' className='hover:text-blue-700'>Forgot password</a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
