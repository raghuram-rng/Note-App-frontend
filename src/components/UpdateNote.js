import { useState } from "react";
import NotesNav from "./NotesNav";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import './UpdateNote.css'; // Import the CSS file

function UpdateNote() {
  const user = localStorage.getItem('user');
  const navigate = useNavigate();
  const location = useLocation();
  const { id, title, content } = location.state || {};
  const [note, setNote] = useState({
    title: title || '',
    content: content || '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/notes/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log('Note deleted successfully');
        navigate('/notes');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/notes/${id}`, 
        { title: note.title, content: note.content },
        {
          withCredentials: true, // Includes cookies with the request for session management
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log('Note updated successfully:', response.data);
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
      <div className="update-note-container">
        <h2>Update Note</h2>
        <form className="update-note-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary">Update Note</button>
          <button type="button" onClick={handleDelete} className="btn btn-danger">Delete Note</button>
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

export default UpdateNote;
