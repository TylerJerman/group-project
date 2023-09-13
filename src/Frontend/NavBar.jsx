import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

export default function NavBar()
{

    const profilePic = useSelector((state) => state.profilePic)
    
    return (
        <nav>
            <div>
                { profilePic &&
                    <li>
                        <img className="navProfile" src={profilePic} alt="profile picture"/>
                    </li>
                }
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Log in</NavLink>
                </li>
                <li>
                    <NavLink to="/signup">Sign up</NavLink>
                </li>
            </div>
        </nav> 
    )
}