import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');


    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
    

    try {
        const response = await axios.post('http://localhost:3000/register', { username, password, confirm });
        console.log(username)
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
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="flex flex-col bg-kombu w-1/4 h-1/2 max-sm:w-2/3 max-xl:w-2/5 gap-6 ">
                <div className="flex justify-center items-center py-5 bg-white xgb text-kombu font-black text-2xl">
        <h1>Register</h1>
                </div>
                
                    <form action="#" className="flex flex-col items-center h-full gap-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                        <label htmlFor="user" className="text-white">Username: </label>
                        <input type="text"
                        minLength={5}
                        maxLength={25}
                         name="username" id="user" className="self-center h-7 rounded-sm" placeholder="Bob" onChange={(e) => setUsername(e.target.value)} value={username} required/>
                        </div>
                        <div className="flex flex-col ">
                        <label htmlFor="pass" className="text-white">Password: </label>
                        <input type="password"
                         name="password"
                         minLength={8}
                         maxLength={25}
                         id="pass" className="self-start h-7 rounded-sm" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <div className="flex flex-col ">
                        <label htmlFor="confirm" className="text-white" >Confirm Password: </label>
                        <input type="password"
                         name="confirm"
                         minLength={8}
                         maxLength={25}
                         id="confirm" className="self-start h-7 rounded-sm" placeholder="********" value={confirm} onChange={(e) => setConfirm(e.target.value)} required/>
                        </div>
                        <div className="flex gap-10 items-center">
                        <button type="submit" className="mt-2 text-white border-2 border-white px-2 py-1">Confirm</button>
                        <Link to="/login" className="text-white">Log in instead</Link>
                        </div>
                    </form>
                </div>
            {message &&
            <p>{message}</p>}
        </div>
    )
}
export default Register