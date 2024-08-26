import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotesNav from './NotesNav';
import { useNavigate } from "react-router-dom";


function SearchNotes() {
  const [query, setQuery] = useState('');
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleRedirect= (id,title,content) => {
    const propsToPass = { id: id,title: title,content: content};
    navigate('/update', {state: propsToPass }); 
  };

  const handleSearchClick = () => {
    if (query.length > 0) {
      axios.get(`http://localhost:3000/api/v1/notes/search?query=${query}`, {
        withCredentials: true, // Includes cookies with the request for session management
      })
        .then(response => {
          console.log(response.data)
          setNotes(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the notes!", error);
        });
    } else {
      setNotes([]);
    }
  };

  if(user){
    return (
      <>
      <NotesNav></NotesNav>
      <div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Enter Search String</span>
          <input 
            class="form-control" 
            aria-label="Username" 
            aria-describedby="basic-addon1"
            type="text" 
            value={query} 
            onChange={handleSearchChange} 
            placeholder="Search notes..."
          />
          <button type="button" class="btn btn-primary" onClick={handleSearchClick}>Search</button>
        </div>
        </div>

        <h2>Search Results</h2>
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
      </>
    );
  } else {
    return (<><h1> Not authorized to access this page. Please Login First.</h1>
     <div><a href="/signin" className="card-link">Sign In</a></div>
     <a href="/signup" className="card-link">Sign Up</a>
     </>
    )
   }
  
}


export default SearchNotes;
