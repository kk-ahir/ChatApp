import React from 'react';
import { BiLogOut } from "react-icons/bi";
import axios from 'axios';
import Cookies from 'js-cookie'

function Logout() {
    const handleClick = async () => {
        try {
            const res=await axios.post("http://localhost:3000/user/logout", {}, {
                withCredentials: true, // send HttpOnly cookie
            });
            localStorage.removeItem('messenger');
           // Cookies.remove('jwt', { path: "/user" })
            console.log(res);
            alert("logout success");
        } catch (error) {
            console.log("error at Logout.jsx" + error);
        }
    }
    return (
        <button onClick={handleClick}
            aria-label="Logout"
            className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
        >
            <BiLogOut className="text-2xl text-red-500" />
        </button>
    );
}

export default Logout;
