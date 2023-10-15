import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { Navigate, useParams } from 'react-router-dom';

function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => {                
                response.json().then(info => {
                    //console.log(postInfo)
                    //setPostinfo(postInfo)
                    setTitle(info.title)
                    setSummary(info.summary)
                    setContent(info.content)
                    setFiles(info.cover)
                    
                })
            })
           
    }, [])

    const UpdatePost = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('id', id)
        if (files?.[0]) {
            data.set('file', files?.[0])
        }

        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include'
        })
        if (response.ok) {
            setRedirect(true)
        }


    }
    if (redirect) {
        return <Navigate to={'/post/' + id}></Navigate>
    }
    return (
        <div>
            <form onSubmit={UpdatePost}>
                <input
                    type='title'
                    placeholder='title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                ></input>
                <input
                    type='summary'
                    placeholder='Summary'
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                ></input>
                <img src={`http://localhost:4000/uploades/${files}`} style={{width:150}}></img>
                <input
                    type='file'
                    onChange={e => setFiles(e.target.files)}
                ></input>
                <ReactQuill
                    value={content}

                    onChange={newValue => setContent(newValue)}
                />
                <button style={{ marginTop: '5px' }}>Update Post</button>
            </form>
        </div>
    )
}

export default EditPost