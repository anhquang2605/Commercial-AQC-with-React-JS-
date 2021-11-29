import React, {useState,useEffect, useRef} from 'react';
import './about-us.scss';
import MyParallax from './../Plugins/MyParallax';
import ParallaxSection from './../Plugins/MyParallax/ParallaxSection';
const AboutUs = (props) => {
    const openBoxSecRef = useRef();
    const deliverSecRef = useRef();
    const arrivedSecRef = useRef();
    return (
        <div className="about-us">
            <MyParallax osRef={props.osRef} id="about-us">
                <ParallaxSection ref={openBoxSecRef} id="box-open">Box-open</ParallaxSection>
                <ParallaxSection ref={deliverSecRef} id="delivering">Delivering...</ParallaxSection>
                <ParallaxSection ref={arrivedSecRef} id="arrived">Arrived</ParallaxSection>
            </MyParallax>
        </div>
    );
}

export default AboutUs;
