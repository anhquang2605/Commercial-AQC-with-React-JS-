import React, {useState, useEffect, useImperativeHandle} from 'react';
const ParallaxSection  = React.forwardRef(
    (props,ref) => {
    const [scrollStart, setScrollStart] = useState(0);
    const [scrollEnd, setScrollEnd] = useState(0);
    const [ended, setEnded] = useState(false);
    const [stages, setStages] = useState(props.stages);
    const [startLisntener, setStartListener] = useState(null);
    let startS = () =>{

    }
    let endS = () => {

    }
    let handleCallback = (callback,delay) =>{
        if(typeof callback === "function"){
            if(delay > 0){
                setTimeout(() => {
                    callback();
                }, delay);
            }
            callback();
        }
    }
    useImperativeHandle(ref, () => ({
        startLax: (callback, delay)=>{
            handleCallback(callback,delay);
        },
        endLax: (callback, delay) =>{
            handleCallback(callback,delay);
        }
    }))
    useEffect(() => {
       
    }, []);
    return (
        <div className="parallax-section" id={props.id? props.id : ""}>
            {props.children}
        </div>
    );
})

export default ParallaxSection;
