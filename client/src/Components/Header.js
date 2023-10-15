import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../userContext'

function Header() {
    const {setUserInfo, userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch("http://localhost:4000/profile", {
            credentials: 'include',
        }).then((responce) => {
            responce.json().then(info => {
                setUserInfo(info);
            })
        })
    }, [])
    const Logout = ()=>{
        fetch("http://localhost:4000/logout", {
            method:'POST',
            credentials:'include'
        })
        setUserInfo(null);
    }
    const user = userInfo?.username;
    return (
        <div>
            <header>
                <Link to="/" className='logo'>MyBlog</Link>
                <nav>
                    {user && (
                        <>
                            <Link to="/create">Create New Post</Link>
                            <a onClick={Logout}>Logout</a>
                        </>)}
                    {!user && (
                        <>
                            <Link to="/Login">Login</Link>
                            <Link to="/Register">Register</Link>
                        </>)}

                </nav>
            </header>
        </div>
    )
}

export default Header