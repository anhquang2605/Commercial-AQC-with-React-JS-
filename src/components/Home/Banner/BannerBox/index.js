import React from 'react';
class BannerBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            NoOfBanners: this.props.NoOfBanners,
            BannerMarkUps: this.props.BannerMarkUps,
        };
    }
    render() {
        return(
            <div className="banner-box">
            {this.state.BannerMarkUps}
            </div>
        );
    }
};

export default BannerBox;