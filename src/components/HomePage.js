import HomeNav from "./HomeNav";

function HomePage() {
 return (<>
  <HomeNav></HomeNav>
  <div className="card">
  <div className="card-body">
    <h5 className="card-title">Welcome to the Notes App !!</h5>
    <p className="card-text">Please Sign In or Sign Up to continue.</p>
    <a href="/signin" className="card-link">SignIn</a>
    <a href="/signup" className="card-link">SignUp</a>
  </div>
</div>
 </>)
}

export default HomePage;