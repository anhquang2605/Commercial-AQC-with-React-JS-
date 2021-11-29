import React, {useState, useEffect, useRef, useImperativeHandle} from 'react';
import "./my-parallax.scss";
const MyParallax  = React.forwardRef(
    (props,ref) => {
    const [scrolled, setScrolled] = useState(0);
    const [viewHeight, setViewHeight] = useState(0);
    const [noOfSection, setNoOfSection] = useState(0);
    const [totalHeight, setTotalHeight] = useState(0);
    const [curSection, setCurSection] = useState("");
    const viewHeightRef = useRef();
    viewHeightRef.current = viewHeight;
    let scrollTo = (id) => {

    }
    let initiateHeight = () =>{
        setViewHeight(window.innerHeight);
    }
    let calTotalHeight = () =>{
        var sections = document.getElementsByClassName("parallax-section");
        var numbers = sections.length;

        var totalH = numbers * viewHeightRef.current;
        setNoOfSection(numbers);
        setTotalHeight(totalH);
        document.getElementById(props.id + "-lax").style.height = totalH+ "px";
    }
    let handleScrollEvent = (target) =>{
        let scroll = target.scroll().handleOffset.y;
        setScrolled(scroll);
    }
 
    useEffect(() => {
        if(props.osRef !== "" && props.osRef !== undefined){
            initiateHeight();   
        }
    }, [props.osRef]);
    useEffect(()=>{
        if(viewHeight > 0){
            calTotalHeight();
            if(props.osRef){
                let target = props.osRef.osInstance();
                target.options({
                    callbacks: {
                        onScroll: () => {handleScrollEvent(target);}
                    }
                })
            }else {
                window.addEventListener("scroll", (e)=>{
                    setScrolled(e.target.scrollTop);
                })
            }
        }
        return ()=>{
            window.removeEventListener("scroll", (e)=>{
                setScrolled(e.target.scrollTop);
            });
        }
    },[viewHeight]);
    useEffect(()=>{
    },[scrolled])
    return (
        <div className="my-parallax" id={props.id + "-lax"}>
            {props.children}
        </div>
    );
})

export default MyParallax;
