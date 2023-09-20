import { NavLink, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Secret from "./secret"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

export default function NavBar()
{

    const profilePic = useSelector((state) => state.profilePic)
    const userName = useSelector((state) => state.userName)
    const userId = useSelector((state) => state.userId) 
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const editing = useSelector((state) => state.editing)
    const ratingMessage = useSelector((state) => state.ratingMessage)

    const userProfile = () =>
    {
        navigate(`/users/${userId}`)
    }

    const resetEditing = () =>
    {
        dispatch({'type': 'SET_EDITING', 'payload': ''})
        dispatch({'type': "SET_RATING_MESSAGE", 'payload': ''})
    }
    
    return (
        <nav>
            <div>
                { profilePic &&
                    <li>
                        <img style={{cursor:'pointer'}} onClick={userProfile} className="navProfile" src={profilePic} alt="profile picture"/>
                    </li>
                }
                <li className="leftMostLi">
                    <NavLink onClick={resetEditing} to="/">Home</NavLink>
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