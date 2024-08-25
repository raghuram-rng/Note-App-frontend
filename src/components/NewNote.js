import { useState } from "react";
import NotesNav from "./NotesNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewNote(){
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
          'http://localhost:3000/api/v1/notes',{title: note.title, content: note.content},
          {
            withCredentials: true, // Includes cookies with the request for session management
          }
        );
        console.log(response)
        if (response.status === 201) {
          console.log('Note created successfully:',response.data);
          // Optionally, reset the form or show a success message
          navigate('/notes');
        }
      } catch (error) {
        console.log(error);
      }
  };
  if (user) {
    return (<>
    <NotesNav></NotesNav>
    <h2>New Note</h2>
    <form onSubmit={handleSubmit}>
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
      <button type="submit" className="btn btn-primary">Create Note</button>
    </form>
    </>)
  } else {
   return (<><h1> Not authorized to access this page. Please Login First.</h1>
    <div><a href="/signin" classNameName="card-link">Sign In</a></div>
    <a href="/signup" classNameName="card-link">Sign Up</a>
    </>
   )
  }
}
export default NewNote;