import "./registerv2.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();


try {
    const response = await axios.post('http://localhost:3000/register', { username, password, confirm });
    setMessage(response.data.message);
    navigate("/login")
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      setMessage(error.response.data.error || 'Registration failed');
    } else {
      setMessage('Registration failed!');
    }
  }
}

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
      <h2 className="text-2xl">Sign up to get started</h2>
    </div>
    <div className="form">
      <form action="#" onSubmit={handleSubmit}>
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
                  onChange={(e) => setUsername(e.target.value)} value={username}
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
                  className="input"
                  minLength={8}
                  maxLength={25}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="">
                <label htmlFor="confirm" className="label">CONFIRM PASSWORD</label>
                <br />
                <input
                  type="password"
                  id="confirm"
                  name="confirm"
                  placeholder="********"
                  className="input"
                  minLength={8}
                  maxLength={25}
                  value={confirm} onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>
            </div>
          </section>
         
        </div>
        <div className="foot">
          <button type="submit" className="btn bg-kombu self-start">
            Create Account
          </button>
          <p>
            Already have an account? <Link to="/login" className="text-kombu font-black">Log in</Link>
          </p>
        </div>
      </form>
    </div>
  </div>
  {message &&
            <p>{message}</p>}
</div>

    )
}
export default Register