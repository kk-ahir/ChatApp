import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
            <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 text-center">
                <h1 className="text-3xl font-bold mb-6">Welcome to Messenger 🚀</h1>
                <p className="mb-6 text-gray-500">Please login or signup to continue</p>

                <div className="flex flex-col gap-4">
                    <Link to="/login" className="btn btn-primary w-full">
                        Login
                    </Link>
                    <Link to="/signup" className="btn btn-secondary w-full">
                        Signup
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
