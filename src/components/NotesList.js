import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotesNav from './NotesNav';
import DeleteNoteButton from './DeleteNoteButton';
import { useNavigate } from "react-router-dom";

function NotesList() {
  const [notes, setNotes] = useState([]);
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  const handleRedirect= (id,title,content) => {
    const propsToPass = { id: id,title: title,content: content};
    navigate('/update', {state: propsToPass }); 
  };
  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/v1/notes',
          {
            withCredentials: true, // Includes cookies with the request for session management
          }
        );
        if (response.status === 200) {
          setNotes(response.data); // Set the notes data to the state
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchNotes();
  }, []);

  if (user) {
    return (<>
    <NotesNav></NotesNav>
    <div>
      <h2>All Notes</h2>
      <ul className="list-group">
        {notes.map((note) => (
          <li key={note.id}>
            <div className="card w-75 mb-3 list-group-item">
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.content}</p>
                <button type="button" className="btn btn-primary" onClick={() => handleRedirect(note.id,note.title, note.content)}>Edit Note</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>)
  } else {
   return (<><h1> Not authorized to access this page. Please Login First.</h1>
    <div><a href="/signin" className="card-link">Sign In</a></div>
    <a href="/signup" className="card-link">Sign Up</a>
    </>
   )
  }
}

export default NotesList;
