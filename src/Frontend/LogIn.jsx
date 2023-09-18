import { useState } from "react"
import axios from "axios"
import { Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { first } from "lodash"


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
    const [profilePic, setProfilePic] = useState('https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg')

    const userId = useSelector((state) => state.userId)

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
                dispatch({'type': 'SET_PROFILE_PIC', 'payload': data.profilePic})
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
        dispatch({'type': 'SET_PROFILE_PIC', 'payload': ''})
        const info = {email: reduxEmail}
        await axios.post('/api/deleteAccount', info)
    }

    const logOut = () =>
    {
        dispatch({'type': 'SET_USERNAME', 'payload': ''})
        dispatch({'type': 'SET_EMAIL', 'payload': ''})
        dispatch({'type': 'SET_PROFILE_PIC', 'payload': ''})
    }

    const editAccount = () =>
    {
        setEditing('yes')
    }

    const updateAccount = async () =>
    {
        if (email !== '' && password !== '' && firstName !== '' && lastName !== '')
        {
            const user = {email: reduxEmail, password: password, firstName: firstName, lastName: lastName, newEmail: newEmail, profilePic: profilePic, userId: userId}
    
    
            await axios.post('/api/updateAccount', user)
    
            setEditing('')
            dispatch({'type': 'SET_EMAIL', 'payload': newEmail})
            dispatch({'type': 'SET_PROFILE_PIC', 'payload': profilePic})
            dispatch({'type': 'SET_USERNAME', 'payload': (firstName + lastName)})
        }
        else
        {
            setErr('error')
            setErrMsg('please fill out every box')
        }
    }

    return (
        <>
        { !userName && 
            <div className="loginpage">
                <h2>LOG IN</h2>
                <div className="input-container">
                    <input  type="email" placeholder="email" onChange={(event) => {setEmail(event.target.value)}}/>
                </div>
                <div className="input-container">
                    
                    <input type="password" placeholder="password" onChange={(event) => {setPassword(event.target.value)}}/>
                </div>
                <button type="submit" onClick={ClickLogIn}>submit</button>
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
                        <h2>You are already logged in</h2>
                        { youSure.length < 1 &&
                            <>
                                <div>
                                    <button className="delete-btn" onClick={areYouSure}>Delete Account</button>
                                </div>
                                <div>
                                   <button onClick={editAccount}>Edit Account</button>
                                </div> 
                                <div>
                                    <button onClick={logOut}>Log Out</button>
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
                    <div className="editform">
                        <h1>Edit Account</h1>
                        <div className="input-container">
                            <input type="text" placeholder="First Name:" onChange={(event) => setFirstName(event.target.value)}/>
                            <input type="text" placeholder="Last Name:" onChange={(event) => setLastName(event.target.value)}/>
                        </div>
                        <div className="input-container">
                            <input type="text" placeholder="Email:" onChange={(event) => setNewEmail(event.target.value)}/>
                            <input type="password" placeholder="Password:" onChange={(event) => setPassword(event.target.value)}/>
                        </div>
                        <div className="input-container">
                            <input type="text" placeholder="Profile Pic URL" onChange={(event) => setProfilePic(event.target.value)}/>
                        </div>
                        { err.length > 0 &&
                            <div>{errMsg}</div>
                        }
                        <button type="submit" onClick={updateAccount}> Edit Account </button>
                    </div>
                    </>
                }
            </>
        }
        </>
    )
}