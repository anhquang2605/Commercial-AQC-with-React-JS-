import React from 'react';
import BANNERLIST from '../../../model/BannerList';
import BannerBox from './BannerBox';
import Controller from './Controller';
import BannerItem from './BannerItem';
import './Banner.css';
import $ from 'jquery';
//Data of Banner items 
let NoOfItems = BANNERLIST.length;
const BannerMarkUps = BANNERLIST.map((item)=>{
    return (
    <BannerItem 
    key={item.specification} 
    value={item.name} 
    name={item.name}
    specification={item.specification}
    type={item.type}
    imageRef={item.imageRef}
    discount={item.discount}
    ></BannerItem>
    )
})


class Banner extends React.Component{
    JQUERY = () => {

    }
    componentDidMount = () => {
        this.JQUERY();
    }
    render() {
        return(
            <div className="Banner">
                <Controller></Controller>
                <BannerBox BannerMarkUps={BannerMarkUps} NoOfItems={NoOfItems}></BannerBox>              
            </div>
        );
    }
}

export default Banner;
