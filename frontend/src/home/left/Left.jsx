import React from 'react'
import Search from './Search'
import Users from './Users'
import Logout from '../left1/Logout'

function Left() {
    return (
        <div className="w-[30%] bg-gray-900 text-white flex flex-col h-screen border-r border-gray-700">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 flex-shrink-0">
                <h1 className="font-bold text-2xl">Chats</h1>
                <Logout />
            </div>

            {/* Search */}
            <div className="px-6 py-4 border-b border-gray-700 flex-shrink-0">
                <Search />
            </div>

            {/* Users List */}
            <div className="flex-1 overflow-y-auto">
                <Users />
            </div>

        </div>
    );
}

export default Left;
