import React from 'react';
import BannerItem from './../BannerItem';
import BANNERLIST from '../../../../model/BannerList';
let NoOfItems = BANNERLIST.length;

class BannerBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bannerBoxWidth: this.props.bannerBoxWidth,
            width: this.props.width,
            NoOfBanners: NoOfItems,
        };
    }
    generateContent(){
        let BannerMarkUps = BANNERLIST.map((item)=>{
            return (
            <BannerItem 
            key={item.specification}
            width= {this.state.width} 
            value={item.name} 
            name={item.name}
            specification={item.specification}
            type={item.type}
            imageRef={item.imageRef}
            discount={item.discount}
            ></BannerItem>)
        });
        return BannerMarkUps;
    }
    render() {
        return(
            <div className="banner-box" style={{width: this.state.bannerBoxWidth + "px" }}> 
            {this.generateContent()}
            </div>
        );
    }
};

export default BannerBox;