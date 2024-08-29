import { useState } from "react";
import NotesNav from "./NotesNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './NewNote.css'; // Import the new CSS file

function NewNote() {
  const user = localStorage.getItem('user');
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: '',
    content: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/notes',
        { title: note.title, content: note.content },
        {
          withCredentials: true, // Includes cookies with the request for session management
        }
      );
      if (response.status === 201) {
        console.log('Note created successfully:', response.data);
        navigate('/notes');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (user) {
    return (
      <>
        <NotesNav />
        <div className="newnote-container">
          <form className="newnote-form" onSubmit={handleSubmit}>
            <h2 className="newnote-title">New Note</h2>
            <div className="mb-3">
              <label className="form-label">Note Title</label>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Note Title"
                aria-label=".form-control-lg example"
                name="title"
                value={note.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Note Content</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                placeholder="Note Content"
                rows="3"
                name="content"
                value={note.content}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Create Note</button>
          </form>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Not authorized to access this page. Please Login First.</h1>
        <div><a href="/signin" className="card-link">Sign In</a></div>
        <a href="/signup" className="card-link">Sign Up</a>
      </>
    );
  }
}

export default NewNote;
