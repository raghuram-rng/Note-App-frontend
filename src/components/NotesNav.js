import { useNavigate } from 'react-router-dom';

function NotesNav(){
  const userLocal = localStorage.getItem('user');
  const userObject = JSON.parse(userLocal);
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
        <button type="button" class="btn btn-secondary">{userObject.name}</button>
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
              <a className="nav-link active" aria-current="page" href="/search">Search Notes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/profile">Update Profile</a>
            </li>
          </ul>
        </div>
        <>
        <button className="btn btn-outline-success me-2" type="button" onClick={handleSignOut}>Sign Out</button>
        </>     
      </div>
    </nav>
  </>)
}

export default NotesNav;