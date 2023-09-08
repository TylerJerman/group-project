import { useState } from "react"
import axios from "axios"
import { Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"


export default function LogIn()
{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userName = useSelector((state) => state.userName)

    const [err, setErr] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

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
                let userName = (data.firstName) + (data.lastName)
                dispatch({'type': 'SET_USERNAME', 'payload': userName})
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
        <>
        { !userName && 
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
                <div>
                    <Link to='/signup'>No Account? Sign Up</Link>
                </div>
                <div>
                    <Link to='/'>Home page</Link>
                </div>
            </div>
        }
        { userName &&
            <h1>You are already logged in</h1>
        }
        </>
    )
}