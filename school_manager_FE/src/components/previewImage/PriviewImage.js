import React, { useRef, useState } from 'react';
import "./FormEditStudent.css"
import { Avatar } from "@mui/material";

export const PreviewImage = (props) => {
    // const [preview, setPreview] = useState(null);
    // const reader = new FileReader();
    // reader.readAsDataURL(image);
    // reader.onload = () => {
    //     setPreview(reader.result)
    // }
    // const wrapperRef = useRef(null);
    const [fileList, setFileList] = useState({
        src:""
    });
    
    const onFileDrop = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.addEventListener('loadend', () => {
            file.src = reader.result;
            const updatedList = file;
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
        )
    }
    return (
        <div>
            <input type="file" value="" onChange={onFileDrop} />
            {
                fileList !== {} &&
                
                <Avatar src={fileList.src} alt="preview" sx={{ width: 70, height: 70 }}/>
                
            }

        </div>

    )
}


