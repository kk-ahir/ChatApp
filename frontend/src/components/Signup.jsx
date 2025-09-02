import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contex/AuthProvider";
import { Link } from "react-router-dom";

function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(""); // For validation message
    const { setAuthUser } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedForm = { ...formData, [name]: value };
        setFormData(updatedForm);

        // Check password match
        if (
            updatedForm.password &&
            updatedForm.confirmpassword &&
            updatedForm.password !== updatedForm.confirmpassword
        ) {
            setError("Passwords do not match");
        } else {
            setError(""); // Clear error if they match
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final check before submitting
        if (formData.password !== formData.confirmpassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");
        try {
            // 1. Signup request
            const res = await axios.post(
                "http://localhost:3000/user/signup",
                formData,
                { withCredentials: true }
            );

            console.log("Signup response:", res.data);

            if (res.data) {
                // 2. Auto-login immediately after signup
                const loginRes = await axios.post(
                    "http://localhost:3000/user/login",
                    {
                        email: formData.email,
                        password: formData.password,
                    },
                    { withCredentials: true }
                );

                console.log("Login response:", loginRes.data);

                // 3. Save user in localStorage + context
                localStorage.setItem("messenger", JSON.stringify(loginRes.data));
                setAuthUser(loginRes.data);
            }
        } catch (error) {
            if (error.response) {
                alert("Error: " + error.response.data.message);
            } else if (error.request) {
                alert("No response from server. Please try again.");
            } else {
                alert("Request failed: " + error.message);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
                <h1 className="text-2xl font-bold text-center mb-4">Create Account</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />

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
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            value={formData.confirmpassword}
                            onChange={handleChange}
                            className="input input-bordered w-full pr-12"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {/* Error message */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-2"
                        disabled={!!error} // Disable if error exists
                    >
                        Sign Up
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <Link to={"/login"} className="text-blue-500 font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
