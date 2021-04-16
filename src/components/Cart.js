import React, { Component } from 'react'
import formatCurrency from '../util'
import Fade from "react-reveal/Fade"

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout : false
        }
    }

    handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name] : value
        })
    }

    createOrder = (event) => {
        event.preventDefault();
        const order = {
            name : this.state.name,
            email : this.state.email,
            address : this.state.address,
            cartItems : this.props.cartItems
        }

       
       // this.props.createOrder(order)

    }

    reset = () => {
        alert("Ban da dang ky thanh cong")
        document.getElementById("my-form").reset();
    }

    render() {

        const {cartItems} = this.props;
        return (
            
            <div>
                {cartItems.length === 0 ? 
                (<div className = "cart cart-header">Cart is empty</div>) : 
                (<div className = "cart cart-header">You have {cartItems.length} in cart {" "}</div>)
            }

                
                <div>
                    <div className = "cart">
                        <Fade left cascade>
                            <ul className = "cart-items">
                            {cartItems.map((item) => (
                                <li key = {item.id}>

                                    <div>
                                        <img src = {item.image} alt = {item.title}></img>
                                    </div>

                                    <div>
                                        <div>{item.title}</div>

                                        <div className = "right">
                                            {formatCurrency(item.price)} x {item.count} {" "}
                                            <button className = "button" onClick = {() => this.props.removeFromCart(item)}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        </Fade>
                    </div>
                    
                    {cartItems.length !== 0 && (
                        <>
                        <div className = "cart">
                            <div className = "total">
                                <div>Total: {formatCurrency(cartItems.reduce((a,c) => a + (c.price*c.count), 0))}</div>
                                <div 
                                    onClick = {() => {this.setState({showCheckout : true})}} 
                                    className = "button primary"
                                >
                                Proceed</div>
                            </div>
                        </div>

                        {this.state.showCheckout && (
                            <Fade right cascade>
                                <div className = "cart">
                                    <form onSubmit = {this.createOrder} id = "my-form" >
                                        <ul className = "form-container">
                                            <li>
                                                <label>Email: </label>
                                                <input 
                                                    type ="email" 
                                                    name = "email"
                                                    required 
                                                    onChange = {this.handleInput}
                                                />
                                            </li>
                                            <li>
                                                <label>Name: </label>
                                                <input 
                                                    type ="text" 
                                                    name = "name"
                                                    required 
                                                    onChange = {this.handleInput}
                                                />
                                            </li>
                                            <li>
                                                <label>Address: </label>
                                                <input 
                                                    type ="text" 
                                                    name = "address"
                                                    required 
                                                    onChange = {this.handleInput}
                                                />
                                            </li>
                                            <li>
                                                <button type = "submit" className = "button primary" onClick = {this.reset}>Checkout</button>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                            </Fade>
                        )}
                        </>
                    )}
                </div>
            </div>
        )
    }
}
