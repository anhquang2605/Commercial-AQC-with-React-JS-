
import React from 'react';
import BannerBox from './BannerBox';
import Controller from './Controller';
import BANNERLIST from '../../../model/BannerList';

import './Banner.css';
import $ from 'jquery';
//Data of Banner items 
let NoOfItems = BANNERLIST.length;
class Banner extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bannerWidth: 0,
            bannerBoxWidth: 0,
            bannerItemsNo: NoOfItems,
            current: null,
            next: null,
            prev: null
        }
    }

    JQUERY = () => {
        var that = this;// refer to the instance of the Banner object to use later in the jquery codes
        $(function(){
            var $window = $(window);// window object does not need ''
            var $body = $('body');
            let bodyWidth = $body.width();
            that.setState({
                bannerWidth: bodyWidth
            })
            that.setState({
                bannerBoxWidth: bodyWidth*NoOfItems
            })
            //get width when started the app or resizing a window for banner
            $window.on("resize load", function(){
                let bodyWidth = $body.width();
                that.setState({
                    bannerWidth: bodyWidth
                })
                that.setState({
                    bannerBoxWidth: bodyWidth*NoOfItems
                })
            });
            //controllers code
            let $left = $('.left-controller-banner');
            let $right = $('.right-controller-banner');
            //
        })
        //setting width for banner when winwdow is reloaded or first loaded
        
    }
    componentDidMount = () => {
        this.JQUERY();
    }
    getCurrent = () => {
        return this.state.current;
    }
    getNext = () => {
        return this.state.next;
    }
    getPrev = () => {
        return this.state.prev;
    }
    getNoOfItems = () =>{
        return this.state.NoOfItems;
    }
    setCurrent = (obj) => {
        this.setState({
            current: obj
        });
    }
    setNext = (obj) => {
        this.setState({
            next: obj
        });
    }
    setPrev = (obj) => {
        this.setState({
            current: obj
        });
    }
    render() {
        return(
            <div className="Banner">
                <Controller></Controller>
                {/*key is needed for the Banner Box to update the passing props from Banner*/}
                <BannerBox key={this.state.bannerBoxWidth} bannerBoxWidth={this.state.bannerBoxWidth} width={this.state.bannerWidth}></BannerBox>              
            </div>
        );
    }
}

export default Banner;
