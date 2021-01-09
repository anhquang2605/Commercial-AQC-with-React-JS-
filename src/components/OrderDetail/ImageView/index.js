import {React, useState, useEffect} from 'react';
import './image-view.scss';
const ImageView = (props) => {
    const [imgSrc, setImgSrc] = useState(props.imgSrc);
    const [imgName, setImgName] = useState(props.imgName);
    return (
        <div id="image_view">
            <img att={imgName} src={require('./../../../images/' + imgSrc)}></img>
        </div>
    );
}

export default ImageView;
