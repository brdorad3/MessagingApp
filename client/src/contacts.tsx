import Contact from "./contact"
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import { useState } from "react";
import axios from "axios";



function Contacts(){
    const [search, setSearch] = useState(''); 

    const handleClick = async() => {
        try{
            const res = await axios.post("http://localhost:3000/contacts");
        }catch(e){
            console.log(e)
        }
    }



    return (
        <div className="w-1/4 bg-white  flex flex-col gap-20 items-center overflow-scroll overflow-x-hidden">
            <div className="p-3 relative">
        <input type="text"
        id="search"
        onChange={(e)=>setSearch(e.target.value)}
        name="search"
        placeholder="Search..."
        className="self-start rounded-lg greyb h-12 px-3"/>

        <div className="absolute top-6 right-5" onClick={handleClick}>
        <Icon path={mdiMagnify} size={1}  />
        </div>
        </div>
        
        <Contact/>
        
        
        </div>
    )
}
export default Contacts