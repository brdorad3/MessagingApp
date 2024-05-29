import React, { useState, useContext } from "react";
import { UserContext } from "./userContext";
import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';
import axios from 'axios';

function Image() {
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const { user, setUser } = useContext(UserContext);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFilePreview(URL.createObjectURL(selectedFile));
        }
    }

   
    return (
        <div className="w-full flex justify-between">
            <div className='flex gap-7'>
                {filePreview ? <img src={filePreview} className="rounded-full max-w-24" /> : <Icon path={mdiAccountCircle} color="black" size={4}></Icon> }
                {user && <p className='text-2xl pb-7 self-end'>{user.username}</p>}
            </div>
            
        </div>
    );
}

export default Image;
