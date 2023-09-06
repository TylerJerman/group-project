import { useState } from "react"
import axios from "axios"
import { Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"


export default function LogIn()
{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [err, setErr] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()

    const ClickLogIn = async () =>
    {
        const user = {email: email, password: password}

        if (email !== '' && password !== '')
        {
            const {data} = await axios.post('/api/login', user)

            if (data.message === 'user not found')
            {
                setErr('error')
                setErrMsg(data.message)
            }
            else if (data.message === 'password was incorrect')
            {
                setErr('error')
                setErrMsg(data.message)
            }
            else
            {
               navigate('/')
            }
        }
        else
        {
            setErr('error')
            setErrMsg('please fill out both boxes')
        }

    }

    return (
        <div>
            <h1>Log In</h1>
            <div>
                <input type="text" placeholder="email" onChange={(event) => {setEmail(event.target.value)}}/>
            </div>
            <div>
                <input type="text" placeholder="password" onChange={(event) => {setPassword(event.target.value)}}/>
            </div>
            <input type="submit" onClick={ClickLogIn}/>
            { err.length > 0 &&
                <div>{errMsg}</div>
            }
        </div>
    )
}