import React from 'react';

function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="flex w-72 flex-col gap-5 p-6 bg-gray-800 rounded-2xl shadow-lg">

                {/* Avatar + Name skeleton */}
                <div className="flex items-center gap-4">
                    <div className="skeleton h-12 w-12 rounded-full"></div>
                    <div className="flex flex-col gap-2">
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-3 w-16"></div>
                    </div>
                </div>

                {/* Message preview skeletons */}
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-3/4"></div>
                <div className="skeleton h-4 w-5/6"></div>

                {/* Bottom action button */}
                <div className="flex justify-end">
                    <div className="skeleton h-8 w-20 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}

export default Loading;
