import React, { useState } from "react";
import axios from 'axios';
import { useAuth } from "../contex/AuthProvider";
import { Link } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const { authUser, setAuthUser } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        // Call login API here
        console.log(formData);
        const data = {
            email: formData.email,
            password: formData.password,
        }
        // Call signup API here
        try {
            const res = await axios.post("http://localhost:3000/user/login", data,{ withCredentials: true });
            console.log(res);
            if (res.data) {
                alert("login successfully");
                localStorage.setItem("messenger", JSON.stringify(res.data));
                setAuthUser(res.data);
            }
        } catch (error) {
            if (error.response) {
                // Backend responded with error (400, 401, etc.)
                alert("Error: " + error.response.data.message);
            } else if (error.request) {
                // No response received from server
                alert("No response from server. Please try again.");
            } else {
                // Something else happened
                alert("Request failed: " + error.message);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input input-bordered w-full pr-12"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {/* Login Button */}
                    <button type="submit" className="btn btn-primary w-full mt-2">
                        Login
                    </button>
                </form>

                {/* Signup Link */}
                <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <Link to={"/signup"} className="text-blue-500 font-semibold">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
