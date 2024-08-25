import { useNavigate } from 'react-router-dom';

function NotesNav(){

  const navigate = useNavigate();
  function handleSignOut() {
    // Remove user object from localStorage
    localStorage.removeItem('user');
    navigate('/');
    // Optionally, redirect the user to a login page
    // window.location.href = '/login';
    
    console.log('User signed out successfully.');
  }

  return (<>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/notes">NotesApp</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/notes">Your Notes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/new">Add Note</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/profile">Update Profile</a>
            </li>
            <button className="btn btn-outline-success me-2" type="button" onClick={handleSignOut}>Sign Out</button>
          </ul>
        </div>
        <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
      </div>
    </nav>
  </>)
}

export default NotesNav;