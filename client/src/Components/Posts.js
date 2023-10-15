import React from 'react'
import {format } from 'date-fns'
import { Link } from 'react-router-dom'

function Posts({_id, title, summary, content, cover, createdAt, author }) {
  return (
    <div>
      <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={'http://localhost:4000/uploades/' + cover}></img>
          </Link>
        </div>

        <div className="text">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>

          <p className="info">
            <a className="Author">{author.username}</a>
            <time>{format(new Date(createdAt), 'yyyy-MM-dd')}</time>
          </p>
          <p className="summary">
            {summary}
          </p>
        </div>

      </div>

    </div>
  )
}

export default Posts