import Icon from '@mdi/react';
import { mdiAlphaA } from '@mdi/js';

function Sidebar(){

   

    return(
    <>
    <div className="bg-kombu width h-full px-1 flex flex-col items-center">
    <Icon path={mdiAlphaA}  color="white" className='bbw w-11/12 '/>
    </div>
    </>)
}
export default Sidebar