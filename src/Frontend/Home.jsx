import { Link } from "react-router-dom"

export default function Home()
{
    return (
        <>
            <div>
                <Link to='/signup'>Sign Up</Link>
                <Link to='/login'>Log In</Link>
            </div>
        </>
    )
}