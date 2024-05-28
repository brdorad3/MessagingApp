import React, { useState } from "react";
 
function Image() {
    const [file, setFile] = useState();
    function handleChange() {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
 
    return (
        <div className="App">
            <h2>Add Image:</h2>
            <input type="file" onChange={handleChange} />
            <img src={file} className="rounded-full" />
        </div>
    );
}
export default Image