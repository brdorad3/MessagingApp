import { useNavigate } from "react-router-dom";
import axios from "axios";
import SERVER_API from "./url";

const Demo = () => {
    const navigate = useNavigate();
    const API = SERVER_API

    const handleDemoLogin = async () => {
        try {
             await axios.get(`${API}/demo`);
            
                navigate('/');
              
        
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