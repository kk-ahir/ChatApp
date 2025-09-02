import React from 'react'
import User from '../User'
import AllUserGet from '../../contex/AllUserGet'

function Users() {
    const [allUser, loading] = AllUserGet();

    if (loading) return <div className="text-center p-4">Loading...</div>

    return (
        <div className="flex flex-col space-y-2 px-4 py-2">
            {allUser.map((user) => (
                <User key={user._id} user={user} />
            ))}
        </div>
    )
}

export default Users
