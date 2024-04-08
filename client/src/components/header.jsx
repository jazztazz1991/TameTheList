import React from 'react';
import "../index.css";


export const Header = () => {

    return (
        <div className="grid grid-cols-2 bg-slate-600 p-3">
            <div className="text-white grid grid-flow-col auto-cols-max">
                <h1 className="text-xl font-bold w-fit pr-2">Tame The List </h1>
                <h3 className="text-lg font-semibold  w-fit">Organize your life</h3>
            </div>
            <nav className="justify-end col-end-4 w-fit">
                <ul className="grid grid-cols-3 text-slate-800 font-medium">
                    <li className="bg-blue-light rounded px-2 mx-2 w-fit shadow-md shadow-cyan-500/50">Home</li>
                    <li className="bg-blue-light rounded px-2 mx-2 w-fit shadow-md shadow-cyan-500/50">Boards</li>
                    <li className="bg-blue-light rounded px-2 mx-2 w-fit shadow-md shadow-cyan-500/50">Profile</li>
                </ul>
            </nav>
        </div>
    )
};
