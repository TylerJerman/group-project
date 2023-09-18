import { useLoaderData } from "react-router-dom";


export default function UserProfile() {
    const {
        user: { firstName, lastName, recipes, email, password, profilePic },
      } = useLoaderData();

      return (
        <>
          <img className="profile" src={profilePic}/>

          <h1>{firstName} {lastName}</h1>
          
          <p>{recipes}</p><p>Email: {email}</p>
        </>
      );

}