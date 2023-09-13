import { useState } from "react"
import axios from "axios"
import { Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"


export default function LogIn()
{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [newEmail, setNewEmail] = useState('')

    const userName = useSelector((state) => state.userName)
    const reduxEmail = useSelector((state) => state.email)

    const [err, setErr] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const [youSure, setYouSure] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [editing, setEditing] = useState('')

    const ClickLogIn = async () =>
    {
        const user = {email: email, password: password}
        dispatch({'type': 'SET_EMAIL', 'payload': email})

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
                dispatch({'type': 'SET_EMAIL', 'payload': email})
                dispatch({'type': 'SET_USER_ID', 'payload': data.id})
                navigate('/')
            }
        }
        else
        {
            setErr('error')
            setErrMsg('please fill out both boxes')
        }

    }

    const areYouSure = () =>
    {
        setYouSure('yes')
    }

    const cancel = () =>
    {
        setYouSure('')
    }

    const deleteAccount = async () =>
    {
        dispatch({'type': 'SET_USERNAME', 'payload': ''})
        const info = {email: reduxEmail}
        await axios.post('/api/deleteAccount', info)
    }

    const logOut = () =>
    {
        dispatch({'type': 'SET_USERNAME', 'payload': ''})
        dispatch({'type': 'SET_EMAIL', 'payload': ''})
    }

    const editAccount = () =>
    {
        setEditing('yes')
    }

    const updateAccount = async () =>
    {
        const user = {email: reduxEmail, password: password, firstName: firstName, lastName: lastName, newEmail: newEmail}

        await axios.post('/api/updateAccount', user)

        setEditing('')
        dispatch({'type': 'SET_EMAIL', 'payload': newEmail})
    }

    return (
        <>
        { !userName && 
            <div>
                <h1>Log In</h1>
                <div className="input-container">
                    <input  type="email" placeholder="email" onChange={(event) => {setEmail(event.target.value)}}/>
                </div>
                <div className="input-container">
                    
                    <input type="password" placeholder="password" onChange={(event) => {setPassword(event.target.value)}}/>
                </div>
                <button type="submit" onClick={ClickLogIn}> log in!</button>
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
            <>
                { editing.length < 1 &&
                    <>
                        <h1>You are already logged in</h1>
                        { youSure.length < 1 &&
                            <>
                                <div>
                                    <a onClick={areYouSure}>Delete Account</a>
                                </div>
                                <div>
                                   <a onClick={editAccount}>Edit Account</a>
                                </div> 
                                <div>
                                    <a onClick={logOut}>Log Out</a>
                                </div>
                            </>
                        }
                        { youSure.length > 1 &&
                            <>
                                <button onClick={deleteAccount}>Are you sure?</button>
                                <button onClick={cancel}>Cancel</button>
                            </>
                        }
                    </>
                }
                { editing.length > 1 &&
                    <>
                        <h1>Edit Account</h1>
                        <div>
                            <input type="text" placeholder="First Name:" onChange={(event) => setFirstName(event.target.value)}/>
                            <input type="text" placeholder="Last Name:" onChange={(event) => setLastName(event.target.value)}/>
                        </div>
                        <div>
                            <input type="text" placeholder="Email:" onChange={(event) => setNewEmail(event.target.value)}/>
                            <input type="text" placeholder="Password:" onChange={(event) => setPassword(event.target.value)}/>
                        </div>
                        <input type="submit" onClick={updateAccount}/>
                    </>
                }
            </>
        }
        </>
    )
}