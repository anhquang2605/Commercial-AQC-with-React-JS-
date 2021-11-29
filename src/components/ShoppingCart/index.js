import {React, useState, useEffect, Fragment} from 'react';
import {IoBagCheckOutline} from 'react-icons/io5';
import {BsFillBagFill, BsArrowRightShort} from 'react-icons/bs';
import {VscClose} from 'react-icons/vsc';
import {FiShoppingCart} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import './shopping-cart.scss';
import {OverlayScrollbarsComponent} from 'overlayscrollbars-react';
const ShoppingCart = (props) => {
    const [list,setList] = useState(props.cartList);
    const [total,setTotal] = useState(0);
    let getTotal = () =>{
        let sumOfPrice = 0;
        for (let item of props.cartList){
            let sum = item.quantity * item.price;
             sumOfPrice += sum;
        }
        setTotal(sumOfPrice);
    }
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
            ,200
            ,"swing"
            ,()=>{
                $shoppingCartMini.show();
                $shoppingCartContainer.removeAttr("style");
            });
        });
       /*  $(document).on("click", (e) => {
            let $cartLeftOffset = $shoppingCartContainer.offset().left;
            let documentCurWidth = document.body.clientWidth;  
            if (!$(e.target).closest("#shopping_cart_container").length && documentCurWidth - $cartLeftOffset >= 0){
                e.stopPropagation();
                $shoppingCartContainer.animate({left: $shoppingCartContainerOffSet += (($shoppingCartContainerWidth*105)/100)}
                ,200
                ,"swing"
                ,()=>{
                    $shoppingCartMini.show();
                    $shoppingCartContainer.removeAttr("style");
                });
            } 
        }) */
        $shoppingCartMini.on("click", (e) => {
            e.stopPropagation();
            $shoppingCartContainer.animate({left: $shoppingCartContainerOffSet -= (($shoppingCartContainerWidth*105)/100)},200);
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
    useEffect(() => {
        getTotal();
    }, [list]);
    return (
        <div id="shopping_cart_container">
             <div id="shopping_cart_mini">
                <BsFillBagFill></BsFillBagFill>
                <span className="item-no-mini-cart">{getTotalQuantity()}</span>        
             </div>
             <div className="close-btn">
                <BsArrowRightShort></BsArrowRightShort>
            </div>
            
            <div id="shopping_cart">
                <h6>Your Cart</h6>
                { list.length > 0? (
                <Fragment>
                <OverlayScrollbarsComponent  style={{ maxHeight: '270px' }}>
                <table key={props.cartList}>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {list.map((item,index) => {
                        return(
                        <tr key={index}>
                            <td><img className="kart-item-img" src={require("./../../images/" + item.id + "-" + item.type + ".jpg")}></img></td>
                            <td>{item.type + " " + item.name}</td>
                            <td>{item.quantity}</td>
                        
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
                </OverlayScrollbarsComponent>
                <div className="cart-total">Subtotal <b>${total}</b></div>
                </Fragment>
                ) : "No item" }
            </div>
          
            {(list.length>0) && <div className="button-group"> <Link className="cart-check-out-btn btn" to="/checkout" onClick={()=>{}}><IoBagCheckOutline></IoBagCheckOutline>Check out</Link> <Link className="btn kart-detail-btn" to="/kart-detail"><FiShoppingCart></FiShoppingCart> View kart</Link></div>}
        </div>
    );
}

export default ShoppingCart;
