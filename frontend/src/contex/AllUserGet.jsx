import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function AllUserGet() {
    const [allUser, setAllUser] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                setLoading(true);
                const token = Cookies.get("jwt");
                const response = await axios.get("http://localhost:3000/user/getUserProfile", {
                    withCredentials: true,
                });
                setAllUser(response.data.filterUser);
            } catch (error) {
                console.error("Error in AllUserGet:", error);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);

    return [allUser, loading];
}

export default AllUserGet;
