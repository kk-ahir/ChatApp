import React from 'react';
import { HiSearch } from "react-icons/hi";

function Search() {
    return (
        <div className="px-0 py-0">
            <form>
                <div className="flex space-x-2 items-center">
                    <label className="flex border-[1px] border-gray-700 bg-slate-900 rounded-lg items-center gap-2 w-full p-2">
                        <input
                            type="search"
                            className="grow outline-none bg-slate-900"
                            placeholder="Search"
                        />
                    </label>
                    <button aria-label="Search" className="rounded-full">
                        <HiSearch className="text-2xl" />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Search;
