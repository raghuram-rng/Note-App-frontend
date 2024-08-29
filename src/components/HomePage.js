import HomeNav from "./HomeNav";
import "./HomePage.css"; // Import the CSS file for styling

function HomePage() {
  return (
    <>
      <HomeNav />
      <div className="homepage-container">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Welcome to the Notes App !!</h5>
            <p className="card-text">Please Sign In or Sign Up to continue.</p>
            <a href="/signin" className="card-link">SignIn</a>
            <a href="/signup" className="card-link">SignUp</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
