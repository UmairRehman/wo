import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Avatar from 'react-avatar-edit'
import UserImage from '../../assets/images/user-small.png'

function UploadProfile(props) {


    const [preview, setPreview] = useState(null)

    const [src, setSrc] = useState('./example/einshtein.jpg')

    function onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 71680000000000) {
            alert("File is too big!");
            elem.target.value = "";
        }
        else{
            console.log(elem)
        }
    }


    function onClose() {
        setPreview(null)
    }

    function onCrop(preview) {
        // setPreview('')
        // console.log(preview)
    }

    return (
        <div>
            <Avatar
                width={300}
                height={300}
                onCrop={onCrop}
                onClose={onClose}
                onBeforeFileLoad={onBeforeFileLoad}
                src={src}
            />
            <img src={UserImage} alt="Preview" />
        </div>
    )
}

export default UploadProfile
