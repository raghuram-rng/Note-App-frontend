import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotesNav from './NotesNav';
import { useNavigate } from "react-router-dom";
import './NotesList.css'; // Import the CSS file

function NotesList() {
  const [notes, setNotes] = useState([]);
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  const handleRedirect= (id, title, content) => {
    const propsToPass = { id, title, content };
    navigate('/update', { state: propsToPass });
  };

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/notes', {
          withCredentials: true, // Includes cookies with the request for session management
        });
        if (response.status === 200) {
          setNotes(response.data); // Set the notes data to the state
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchNotes();
  }, []);

  if (user) {
    return (
      <>
        <NotesNav />
        <div className="notes-list-container">
          <h2>All Notes</h2>
          <ul className="notes-list">
            {notes.map((note) => (
              <li key={note.id} className="notes-list-item">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.content}</p>
                    <button type="button" className="btn btn-edit" onClick={() => handleRedirect(note.id, note.title, note.content)}>Edit Note</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  } else {
    return (
      <div className="unauthorized-container">
        <h1>Not authorized to access this page. Please Login First.</h1>
        <div><a href="/signin" className="card-link">Sign In</a></div>
        <a href="/signup" className="card-link">Sign Up</a>
      </div>
    );
  }
}

export default NotesList;
