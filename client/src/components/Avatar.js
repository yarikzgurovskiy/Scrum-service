import React from 'react';
import { FormControl } from 'react-bootstrap';

const Avatar = ({ image, onImageChanged, enableToEdit }) => {
    const src = (typeof (image) === 'string')
        ? image
        : `data:${image.mimetype};base64,${image.data}`

    return (
        <div>
            <img src={src} width="200" height="200" alt='Avatar' />
            {enableToEdit && (<FormControl id="formControlsFile"
                type="file"
                label="File"
                help="Example block-level help text here."
                onChange={onImageChanged} />)}
        </div>
    )
}

export default Avatar;