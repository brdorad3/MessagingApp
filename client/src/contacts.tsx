import Contact from "./contact"


function Contacts(){
    return (
        <div className="w-1/4 bg-white  flex flex-col gap-20 items-center overflow-scroll overflow-x-hidden">
            <div className="p-3">
        <input type="text" id="search" placeholder="Search..."  className="self-start rounded-lg greyb h-12 pl-3"/>
        </div>
        <Contact/>
        
        
        </div>
    )
}
export default Contacts