import './App.css'
import {NavLink, Outlet} from "react-router-dom";

export default function App() {
    return (
        <>
            <h1 className="text-4xl text-center text-slate-700 font-bold">
                React Heroes
            </h1>
            <nav className="bg-slate-200 p-1 mt-2">
                <ul className="flex justify-center gap-4 my-3 text-2xl font-semibold uppercase">
                    <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                    <li><NavLink to='/heroes'>Heroes</NavLink></li>
                </ul>
            </nav>

            <div className="container mt-5 mx-auto flex space-between gap-6">
                <div className="flex-1">
                    {/*children setup in main.tsx get rendered in the Outlet component.*/}
                    <Outlet/>
                </div>
                <div className="flex-1">
                    Messages go here (coming soon . . .)
                </div>
            </div>
        </>
    )
}
