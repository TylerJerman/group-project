import { useLoaderData } from "react-router-dom";


export default function UserProfile() {
    const {
        user: { firstName, lastName, recipes, email, password },
      } = useLoaderData();

      return (
        <>
          <h1>{firstName} {lastName}</h1>
          
          <p>{recipes}</p><p>{email}</p><p>{password}</p>
        </>
      );

}