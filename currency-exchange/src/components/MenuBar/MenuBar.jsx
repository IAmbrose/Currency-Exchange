import { useState } from "react";
import { Link } from "react-router-dom";

export default function MenuBar() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <div className="menu-container">
            <h3 onClick = {toggleMenu}>Menu</h3>
            {showMenu && (
                <ul>
                <li className="dropdownitem">
                    <Link to="/mainpage">Main Page</Link>
                </li>
            </ul>
            )}
        </div>
    )
}