import { useNavigate } from 'react-router-dom';
import './NotesNav.css';  // Import the new CSS file

function NotesNav() {
  const userLocal = localStorage.getItem('user');
  const userObject = JSON.parse(userLocal);
  const navigate = useNavigate();

  function handleSignOut() {
    // Remove user object from localStorage
    localStorage.removeItem('user');
    navigate('/');
    console.log('User signed out successfully.');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/notes">{`Hi, ${userObject.name}`}</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/notes">Your Notes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/new">Add Note</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/search">Search Notes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profile">Update Profile</a>
              </li>
            </ul>
            <div className="d-flex align-items-center ms-auto">
              <button className="btn btn-outline-light" type="button" onClick={handleSignOut}>Sign Out</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NotesNav;
