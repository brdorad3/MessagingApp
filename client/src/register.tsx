import { Link } from "react-router-dom"

function Register(){

    return(
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="flex flex-col bg-kombu w-1/4 h-1/2 max-sm:w-2/3 max-xl:w-2/5 gap-6 ">
                <div className="flex justify-center items-center py-5 bg-white xgb text-kombu font-black text-2xl">
        <h1>Register</h1>
                </div>
                
                    <form action="#" className="flex flex-col items-center h-full gap-5">
                        <div className="flex flex-col">
                        <label htmlFor="user" className="text-white">Username: </label>
                        <input type="text" id="user" className="self-center h-7 rounded-sm" placeholder="Bob"/>
                        </div>
                        <div className="flex flex-col text-white">
                        <label htmlFor="pass">Password: </label>
                        <input type="password" id="pass" className="self-start h-7 rounded-sm" placeholder="********"/>
                        </div>
                        <div className="flex flex-col text-white">
                        <label htmlFor="confirm">Confirm Password: </label>
                        <input type="password" id="confirm" className="self-start h-7 rounded-sm" placeholder="********"/>
                        </div>
                        <div className="flex gap-10 items-center">
                        <button className="mt-2 text-white border-2 border-white px-2 py-1">Confirm</button>
                        <Link to="/login" className="text-white">Log in instead</Link>
                        </div>
                    </form>
                </div>
            
        </div>
    )
}
export default Register