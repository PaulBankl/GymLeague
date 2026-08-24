import {Link} from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <div>
        <h1>GymLeague</h1>
        <p>Log into your account or create one if you don't have one.</p>
        <Link to="/register">Register</Link>
        <br></br>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

