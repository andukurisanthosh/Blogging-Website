import React, { useEffect, useState } from 'react'
import Posts from './Posts'

function IndexPage() {
  const[posts, setPosts]=useState([])
  useEffect(()=>{
    fetch("http://localhost:4000/post")
    .then(responce=>responce.json()
    .then(posts=>{setPosts(posts);console.log(posts)}))
  }, [])
  return (
    <div>
       {posts.length>0 && posts.map(post=>(
        <Posts {...post}/>
       ))}
    </div>
  )
}

export default IndexPage