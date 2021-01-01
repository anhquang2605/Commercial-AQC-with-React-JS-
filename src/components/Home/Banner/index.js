
import React, { Fragment } from 'react';
import BannerBox from './BannerBox';
import Controller from './Controller';
import BANNERLIST from '../../../model/BannerList';
import Pagination from './Pagination';
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
            prev: null,
            fist: null,
            last: null,
        }
    }

    JQUERY = () => {
        var that = this;// refer to the instance of the Banner object to use later in the jquery codes
        $(function(){
            var $window = $(window);// window object does not need ''
            var $body = $('body');
            //set bannerWidth for individual width of each banner Item
            let bodyWidth = $body.width();
            let windowHeight = $window.height();
            //set height for banner
            $(".Banner").height((windowHeight * 50)/100);
            that.setState({
                bannerWidth: bodyWidth
            })
            //banner Box width is the total width of the containers of all the banner items,
            //this container is hidden by the banner div that only show exactly one banner item at a time 
            that.setState({
                bannerBoxWidth: bodyWidth*NoOfItems
            })
            //controllers code
            //Animation handlers
            let $moveRight = () =>{
                $(".banner-box").animate({right: "+=" + that.state.bannerWidth},500);
            };
            let $moveLeft = () =>{
                $(".banner-box").animate({right: "-=" + that.state.bannerWidth},500);
            };
            let $moveTo = (id,animated = true)  =>{
                let parsedID = parseInt(id);
                let current = that.getCurrent();
                let currentID = current.index;
                let idDifference = currentID - parsedID;
                //calculating how far the box will be translated
                let moveByTheWidthOf = Math.abs(idDifference) * that.state.bannerWidth;
                //check if the destination is greater than or less comparing to the current id
                //if greater, move to left, else to the right
                if (animated){
                    let $BannerBox = $(".banner-box");
                    if(idDifference > 0){
                        $BannerBox.animate({right: "-=" + moveByTheWidthOf},500); 
                    } else {
                        $BannerBox.animate({right: "+=" + moveByTheWidthOf},500)
                    }
                } else {
                    let $BannerBox = $(".banner-box");
                    let $BannerBoxRight = parseInt($BannerBox.css("right").replace("px",""));
                    if(idDifference > 0){
                        $BannerBox.css({
                            "right": $BannerBoxRight - moveByTheWidthOf + "px"
                        })
                    } else {
                        $BannerBox.css({
                            "right": $BannerBoxRight + moveByTheWidthOf + "px"
                        })
                    }
                }
                
                //Setting state for the banner items, current, prev and next
                that.setCurrent(BANNERLIST[parsedID]);
                if (parsedID == 0){//if the destination is first
                    that.setPrev(that.getLast());
                    that.setNext(BANNERLIST[parsedID + 1]);
                } else if (parsedID == that.state.bannerItemsNo - 1){//if the destination is last
                    that.setPrev(BANNERLIST[parsedID - 1]);
                    that.setNext(that.getFirst());
                } else {//the default ways for prev and next items
                    that.setPrev(BANNERLIST[parsedID - 1]);
                    that.setNext(BANNERLIST[parsedID+ 1]);
                }
                $(".current").removeClass("current");
                $(".Pagination").find("[index='"+ parsedID + "']").addClass("current");
                return;
            };
            //get width when started the app or resizing a window for banner
            $window.on("resize", function(){
                let currentSlide = that.getCurrent();
                let curIndex = currentSlide.index;
                let bodyWidth = $body.width();
                let bannerBoxWidth = bodyWidth*NoOfItems;
                that.setState({
                    bannerWidth: bodyWidth
                })
                that.setState({
                    bannerBoxWidth: bannerBoxWidth
                })
                //Height of Banner
                let windowHeight = $window.height();
                $(".Banner").height((windowHeight * 60)/100);
                //return to its last position after reload
                $(".banner-box").css({"right": curIndex * bodyWidth + "px"});
                $(".current").removeClass("current");
                $(".Pagination").find("[index='"+ curIndex +"']").addClass("current");
                
            });
            //Initiallize orders for banner lists 
            that.setCurrent(BANNERLIST[0]);
            that.setNext(BANNERLIST[1]);
            that.setPrev(BANNERLIST[that.state.bannerItemsNo - 1]);
            that.setFirst(BANNERLIST[0]);
            that.setLast(BANNERLIST[that.state.bannerItemsNo - 1]);
            //cache of first and last items along with the left and right controllers
            let firstItem = that.getFirst();
            let lastItem = that.getLast();
            let $left = $('.left-controller-banner');
            let $right = $('.right-controller-banner');
            //Left controller codes
            $left.on("click", function(e){
                e.preventDefault();
                e.stopPropagation();
                let cur = that.getCurrent();
                let prev = that.getPrev();
                let prevIndex = prev.index;
                let curIndex = cur.index; 
                let newPrevIndex = prevIndex - 1;
                //check if it has to move to the very end of the list
                if(prevIndex == lastItem.index){
                    $moveTo(lastItem.index);
                } else {
                    $moveLeft();
                }
                that.setCurrent(prev);
                that.setNext(cur);
                //Let Pagination components know to move to corresponding dot
                $(".current").removeClass("current");
                $(".Pagination").find("[index='"+ prev.index + "']").addClass("current");
                //check if it has to move to the very front of the list
                if (newPrevIndex < 0) {
                    that.setPrev(lastItem);
                    return;
                } 
                that.setPrev(BANNERLIST[newPrevIndex]);
            });
            //Right controller codes
            $right.on("click", function(e){
                e.preventDefault();
                e.stopPropagation();
                let cur = that.getCurrent();
                let next = that.getNext();
                let nextIndex = next.index;
                let curIndex = cur.index; 
                let newNextIndex = nextIndex + 1;
                if(nextIndex == firstItem.index){
                    $moveTo(firstItem.index);
                    return;
                } else {
                    $moveRight();
                }
                that.setCurrent(next);
                that.setPrev(cur);
                //Let Pagination components know to move to corresponding dot
                $(".current").removeClass("current");
                $(".Pagination").find("[index='"+ next.index + "']").addClass("current");
                if (newNextIndex > that.state.last.index) {
                    that.setNext(firstItem);      
                    return;
                } 
                that.setNext(BANNERLIST[newNextIndex]);
            })
            //Pagination codes
                $(".page-dot").first().addClass("current");
                $(".page-dot").on("click",function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    let $this = $(this);
                    $(".current").removeClass("current");
                    $this.addClass('current');
                    $moveTo($this.attr("index"));
                });
        })
    }
    componentDidMount = () => {
        this.JQUERY();
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
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
        return this.state.bannerItemsNo
    }
    setCurrent = (obj) => {
        this.setState({
            current: obj
        });
    }
    getFirst = () => {
        return this.state.first;
    }
    getLast = () =>{
        return this.state.last;
    }
    setNext = (obj) => {
        this.setState({
            next: obj
        });
    }
    setPrev = (obj) => {
        this.setState({
            prev: obj
        });
    }
    setFirst = (obj) => {
        this.setState({
            first: obj
        })
    }
    setLast = (obj) => {
        this.setState({
            last: obj
        })
    }
    render() {
        return(
            <Fragment>
            <div className="Banner">
                <Controller></Controller>
                {/*key is needed for the Banner Box to update the passing props from Banner*/}
                <BannerBox key={this.state.bannerBoxWidth} bannerBoxWidth={this.state.bannerBoxWidth} width={this.state.bannerWidth}></BannerBox>              
            </div>
            <Pagination NoOfItems={this.getNoOfItems()}></Pagination>
            </Fragment>
        );
    }
}

export default Banner;
