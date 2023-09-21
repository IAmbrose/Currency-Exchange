import { useState } from "react";
import { Link } from "react-router-dom";

export default function MenuBar() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <div className="menu-position fixed top-0 right-0 p-10">
            <div className="bg-teal-100 rounded-lg border-solid border-2 border-teal-200 menu-container text-3xl text-black underline p-4 font-bold">
                <p onClick = {toggleMenu}>Menu</p>
                {showMenu && (
                    <ul className="absolute right-0 mt-2 border rounded-lg shadow-lg bg-teal-50">
                    <li>
                        <Link to="/" className="block px-4 py-2 hover:bg-teal-50 border-2 border-solid border-slate-300 " >Main Page</Link>
                    </li>
                    <li>
                        <Link to="/mywallet" className="block px-4 py-2 hover:bg-teal-50 border-2 border-solid border-slate-300">My Wallet</Link>
                    </li>
                    <li>
                        <Link to="/chartpage" className="block px-4 py-2 hover:bg-teal-50 border-2 border-solid border-slate-300">Historical Charts</Link>
                    </li>
                    <li>
                        <Link to="/about" className="block px-4 py-2 hover:bg-teal-50 border-2 border-solid border-slate-300">About</Link>
                    </li>
                </ul>
                )}
            </div>
        </div>   
    )
}