import Icon from '@mdi/react';
import { mdiSend } from '@mdi/js';
import { mdiAccountCircle } from '@mdi/js';

function Chat(){


    return (
        <div className="w-full h-screen">
        <div className="h-1/6 flex items-center pl-10 gap-2">
        <Icon path={mdiAccountCircle} color="black" size={2}/>
        <p>brdorad3</p>
        </div>
        <div className="h-5/6 flex flex-col items-center justify-center bg-slate-200 mx-5 rounded-lg">
        <div className="w-full h-4/5">all</div>
        <div className="w-full h-1/5 bg-kombu flex items-center justify-center gap-5">
            <input type="text" placeholder="Message..." className="w-3/5 h-1/3 rounded-xl pl-3" />
            <Icon path={mdiSend} size={1.3} color={"white"} />
        </div>
        </div>
        </div>
    )
}
export default Chat