import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export default function UserProfile() {
    const {
        user: { firstName, lastName, recipes, email, profilePic, userId },
      } = useLoaderData();

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const thisUserId = useSelector((state) => state.userId)

    const handleEditProfile = () =>
    {
      dispatch({'type': 'SET_EDITING', 'payload': 'yes'})
      navigate('/login')
    }

    if (userId === thisUserId)
    {
      return (
        <>
          <img className="profile" src={profilePic}/>

          <h1>{firstName} {lastName}</h1>
          
          <p>{recipes}</p><p>Email: {email}</p>

          <button onClick={handleEditProfile}>Edit Profile</button>
        </>
      );
    }
    else
    {
      return (
        <>
          <img className="profile" src={profilePic}/>

          <h1>{firstName} {lastName}</h1>
          
          <p>{recipes}</p><p>Email: {email}</p>
        </>
      );
    }

}