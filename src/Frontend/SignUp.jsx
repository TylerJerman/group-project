import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { first } from "lodash"


export default function SignUp()
{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [err, setErr] = useState('')

    const navigate = useNavigate()

    const ClickSignUp = async () =>
    {
        const user = {email: email, password: password, firstName: firstName, lastName: lastName}

        if (email !== '' && password !== '' && firstName !== '' && lastName !== '')
        {
            const {data} = await axios.post('/api/signup', user)
    
            if (data.message === 'account created')
            {
                navigate('/login')
            }
            else if (data.message === 'user already exists')
            {
                setErr('error')
                setErrMsg(data.message)
            }
        }
        else
        {
            setErr('error')
            setErrMsg('please fill out every text box')
        }
    }

    return (
        <div className="signuppage">
            <h2>CREATE ACCOUNT</h2>
            <div  className="input-container">
                <input type="email" placeholder="email" onChange={(event) => {setEmail(event.target.value.trim())}} />
            </div>
            <div  className="input-container">    
                <input type="password" placeholder="password" onChange={(event) => {setPassword(event.target.value.trim())}} />
            </div>
            <div  className="input-container">
                <input type="text" placeholder="First Name" onChange={(event) => {setFirstName(event.target.value.trim())}} />
            </div>
            <div  className="input-container">    
                <input type="text" placeholder="Last Name" onChange={(event) => {setLastName(event.target.value.trim())}} />
            </div>
            <div>
            <button type="submit" onClick={ClickSignUp}>submit</button>
            </div>
            { err.length > 0 &&
                <div>{errMsg}</div>
            }
            
            <div>
                <Link to="/login">Log in</Link>
            </div>
            <div>
                <Link to="/">Home Page</Link>
            </div>
        </div>
    )
}