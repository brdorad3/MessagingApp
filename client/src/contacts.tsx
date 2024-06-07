import Contact from "./contact"
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import { useState } from "react";
import axios from "axios";
import SERVER_API from "./url";


function Contacts(){
    const [search, setSearch] = useState(null); 
    const [response, setResponse] = useState({});
    const [empty, setEmpty] = useState(true)
    const API = SERVER_API

    const handleClick = async() => {
        try{
            const res = await axios.post(`${API}/contacts`, {search});
            setResponse(res.data);
            setEmpty(false)
        }catch(e){
            console.log(e)
        }
    }


    return (
        <div className="w-1/3 bg-white  flex flex-col gap-20 items-center overflow-scroll overflow-x-hidden max-sm:hidden">
            <div className="p-3 sm: p-0 relative">
        <input type="text"
        id="search"
        onChange={(e)=>setSearch(e.target.value)}
        minLength={2}
        maxLength={30}
        name="search"
        placeholder="Search users..."
        className="self-start rounded-lg greyb h-12 pl-3 pr-8"/>

        <div className="absolute top-6 right-5" onClick={handleClick}>
        <Icon path={mdiMagnify} size={1}  />
        </div>
        </div>
        
        <Contact contactInfo = {response} loading={empty}/>
        
        
        </div>
    )
}
export default Contacts