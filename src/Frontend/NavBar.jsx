import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import Secret from "./secret"

export default function NavBar()
{

    const profilePic = useSelector((state) => state.profilePic)
    const userName = useSelector((state) => state.userName)
    
    return (
        <nav>
            <div>
                { profilePic &&
                    <li>
                        <img className="navProfile" src={profilePic} alt="profile picture"/>
                    </li>
                }
                <li className="leftMostLi">
                    <NavLink to="/">Home</NavLink>
                </li>
                { userName && 
                    <li>
                        <NavLink to="/login">Log Out / Edit Account</NavLink>
                    </li>
                }
                { !userName &&
                    <>
                        <li>
                            <NavLink to="/login">Log in</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup">Sign up</NavLink>
                        </li>
                        <li>
                            <NavLink className="secret" to='/secret'>here</NavLink>
                        </li>
                    </>
                }
            </div>
        </nav> 
    )
}