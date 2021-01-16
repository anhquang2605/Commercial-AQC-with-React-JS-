import {React, useState, useEffect} from 'react';
import {BiX} from 'react-icons/bi';
import {BsFillBagFill} from 'react-icons/bs';
import $ from 'jquery';
import './shopping-cart.scss';
const ShoppingCart = (props) => {
    const [list,setList] = useState(props.cartList);
    let [,setState] = useState();
    let JQueryCode = () => {
        let $closeBtn = $('.close-btn');
        let $shoppingCartMini = $('#shopping_cart_mini');
        let $shoppingCartContainer = $('#shopping_cart_container');
        let $shoppingCartContainerWidth = $shoppingCartContainer.outerWidth(true);
        let $shoppingCartContainerOffSet = $shoppingCartContainer.offset().left;
        let $window = $(window);
        $closeBtn.on("click", (e) => {
            e.stopPropagation();
            $shoppingCartContainer.animate({left: $shoppingCartContainerOffSet += (($shoppingCartContainerWidth*105)/100)}
            ,500
            ,"swing"
            ,()=>{
                $shoppingCartMini.show();
                $shoppingCartContainer.removeAttr("style");
            });
        });
        $shoppingCartMini.on("click", (e) => {
            e.stopPropagation();
            $shoppingCartContainer.animate({left: $shoppingCartContainerOffSet -= (($shoppingCartContainerWidth*105)/100)},500);
            $shoppingCartMini.hide();
        });
        $window.on("resize",function(){
            $shoppingCartContainerWidth = $shoppingCartContainer.outerWidth(true);
            $shoppingCartContainerOffSet = $shoppingCartContainer.position().left;
            if(!$shoppingCartMini.is(":visible")){
                $shoppingCartContainer.removeAttr("style");
                $shoppingCartContainer.css({
                    "right": "0" 
                 });
            };
        })
    }
    let getTotalQuantity = () => {
        var quantity = 0;
        list.forEach((item) => {
            quantity += parseInt(item.quantity);
        })
        return quantity
    }
    useEffect(()=>{
        JQueryCode();
    },[])
    useEffect(()=>{
        setList(props.cartList);
    },[props.cartList]);
    return (
        <div id="shopping_cart_container">
             <div id="shopping_cart_mini">
                <BsFillBagFill></BsFillBagFill>
                <span className="item-no-mini-cart">{getTotalQuantity()}</span>        
             </div>
             <div className="close-btn">
                <BiX></BiX>
            </div>
            <div id="shopping_cart">
                { list.length > 0? (
                <table key={props.cartList}>
                    <colgroup>
                        <col span={1}></col>
                        <col span={1} style={{width: "50%"}}></col>
                        <col span={1}></col>
                        <col span={1}></col>
                    </colgroup>
                    <tr>
                        <th>#</th>
                        <th >Name</th>
                        <th>No</th>
                        <th></th>
                    </tr>
                    {list.map((item,index) => {
                        return(
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.type + " " + item.name}</td>
                            <td>{item.quantity}</td>
                            <td><button alt="remove item" onClick={()=>{
                                props.removeItem(index)                               
                            }}><BiX></BiX></button></td>
                        </tr>
                        )
                    })}
                </table>
                ) : "No item" }
            </div>
            {(list.length>0) && <button className="cart-check-out-btn" onClick={()=>{}}>Check out</button>}
        </div>
    );
}

export default ShoppingCart;
