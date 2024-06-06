import "dotenv/config"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Demo = () => {
    const navigate = useNavigate();
    const API = process.env.SERVER_API

    const handleDemoLogin = async () => {
        try {
            const response = await axios.get(`${API}/demo`);
            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.error('Failed to log in as demo user', error);
        }
    };


    return(
        <button onClick={handleDemoLogin} className="px-9 py-4 border-2 border-kombu rounded-2xl text-kombu font-black">
            <p>Login as Demo User</p>
        </button>
    )
}

export default Demo