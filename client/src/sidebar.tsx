import Icon from '@mdi/react';
import { mdiAlphaA } from '@mdi/js';
import { mdiMessageText } from '@mdi/js';
import { mdiAccountCircle } from '@mdi/js';
import { mdiStarOutline } from '@mdi/js';
import { mdiChartBar } from '@mdi/js';
import { mdiHomeOutline } from '@mdi/js';


function Sidebar(){

   

    return(
    <>
    <div className="bg-kombu width h-full px-1 flex flex-col items-center">
    <Icon path={mdiAlphaA}  color="white" className='bbw w-11/12 '/>

    <div className='flex flex-col items-center h-4/5 justify-evenly'>

    <Icon path={mdiHomeOutline} color="white" className='w-2/5 ' />
    <Icon path={mdiMessageText} color="white" className='w-1/3 ' />
    <Icon path={mdiStarOutline} color="white" className='w-1/3 ' />
    <Icon path={mdiChartBar} color="white" className='w-1/3 ' />
    
    </div>
    <div className='h-1/5 flex items-center justify-center  '>

    <Icon path={mdiAccountCircle} color="white" className='w-1/2 ' />

    </div>
    </div>
    </>)
}
export default Sidebar