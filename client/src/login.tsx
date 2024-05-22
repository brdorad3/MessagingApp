import { Link } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault();

        try{
            const res = await axios.post("http://localhost:3000/login", {username, password});
            const { token, username: loggedInUsername } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem("username", loggedInUsername)
            navigate("/")
        }catch (error) {
            console.error('Login failed', error);
    }}

    return(
        <>
           <div className="w-screen h-screen flex items-center justify-center">
            <div className="flex flex-col bg-kombu w-1/4 h-1/2 max-sm:w-2/3 max-xl:w-2/5 gap-6 ">
                <div className="flex justify-center items-center py-5 bg-white xgb text-kombu font-black text-2xl">
        <h1>Log in</h1>
                </div>
                
                    <form action="#" onSubmit={handleLogin} className="flex flex-col items-center h-full gap-5">
                        <div className="flex flex-col">
                        <label htmlFor="username" className="text-white">Username: </label>
                        <input type="text"
                        name="username"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                        id="username" className="self-center h-7 rounded-sm" placeholder="Bob"/>
                        </div>
                        <div className="flex flex-col ">
                        <label htmlFor="password" className="text-white">Password: </label>
                        <input type="password"
                        name="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        id="password" className="self-start h-7 rounded-sm" placeholder="********"/>
                        </div>
                        <div className="flex gap-8 items-center mt-7 ">
                        <button className="text-white border-2 border-white px-2 py-1">Confirm</button>
                        <Link to="/register" className="text-white">Sign up in instead</Link>
                        </div>
                    </form>
                </div>
            
        </div>
        </>
    )
}
export default Login