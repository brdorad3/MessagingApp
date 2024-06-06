import "./registerv2.css"
import { Link } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from './userContext';
import Demo from "./demo";
import "dotenv/config"


const Login: React.FC = () => {

  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useUserContext();
    const API = process.env.SERVER_API

    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(`${API}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
      
          if (response.ok) {
            const { token, user } = await response.json();
            setUser(user);
            localStorage.setItem('token', token);
            navigate('/');
          } else {
            console.error('Login failed');
          }
        };

    return(
        <div className="leftandright">
  <div className="left">
    <img
      className="img"
      src="greg-rosenke-bJdK9v-VVw0-unsplash.jpg"
      alt="plants"
    />
    <div className="txt">
      <p className="boom">Robnite</p>
    </div>
    
    
  </div>
  <div className="right">
    <div className="text">
      <h1 className="text-4xl" >
        This is not a real online service! Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Necessitatibus, commodi!
      </h1>
      <h2 className="text-2xl">Log in</h2>
    </div>
    <div className="form">
      <form action="#" onSubmit={handleLogin}>
        <div className="all">
          <section>
            <div className="leftt">
              <div className="">
                <label htmlFor="user" className="label">USERNAME</label>
                <br />
                <input
                  type="text"
                  id="user"
                  name="username"
                  placeholder="Bob"
                  className="input"
                  minLength={4}
                  maxLength={25}
                  value={username}
                  onChange={(e)=> setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="">
                <label htmlFor="pass" className="label">PASSWORD</label>
                <br />
                <input
                  type="password"
                  id="pass"
                  name="password"
                  placeholder="********"
                  minLength={8}
                  className="input"
                  maxLength={25}
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </section>
         
        </div>
        <div className="foot">
          <div className="flex gap-5">
          <button type="submit" className="btn bg-kombu">
            Log In
          </button>
          <Demo/>
          </div>
          <p >
            Don't have an account? <Link to="/register" className="text-kombu font-black">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  </div>
</div>

    )
}
export default Login