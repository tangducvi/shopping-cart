import React, { Component } from 'react';
import  data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import Header from './components/Header';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            products : data.products,
            cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
            sort  : "",
            size: ""
        }
    }

    sortProducts = (event) => {
        const sort = event.target.value;

        this.setState((state) => ({
            sort : sort,
            products : this.state.products.slice().sort((a,b) => {
                if(sort === "lowest") {
                    return a.price - b.price
                } else if (sort === "highest") {
                    return b.price - a.price
                } else if(sort === "latest") {
                    return a.id - b.id
                }
            })
        }))
    }

    filterProducts = (event) => {
        const size = event.target.value;
        if(size === "ALL") {
            this.setState({
                size : size,
                products : data.products
            })
        } else  {
            this.setState({
                size : size,
                products : data.products.filter((product) => product.size.indexOf(size) >= 0)
            })
        }
    }

    addToCart = (product) => {
        
        const cartItems = this.state.cartItems.slice();
        var alreadyInCart = false;
        cartItems.forEach((item) => {
            if(item.id === product.id) {
                item.count++;
                alreadyInCart = true;
            }
        })
        if(!alreadyInCart) {
            cartItems.push({...product, count: 1})
        }

        this.setState({ cartItems })
        localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems))
    }

    removeFromCart = (product) => {
        console.log(product)
        const cartItems = this.state.cartItems.slice();
        this.setState({
            cartItems : cartItems.filter((x) => x.id !== product.id)
        })

        localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems.filter((x) => x.id !== product.id)))
    }

    // createOrder = () => {
    //     alert("Bạn đã đăng ký thành công!")
    // }

    render() {
        return (

                <div className = "grid-container">

                    <Header/>
               
                <main>
                    <div className = "content">
                        <div className = "main">
                            <Filter
                                count = {this.state.products.length}
                                size = {this.state.size}
                                sort = {this.state.sort}

                                sortProducts = {this.sortProducts}
                                filterProducts = {this.filterProducts}

                            />
                            <Products 
                                products = {this.state.products}
                                addToCart = {this.addToCart}
                            />
                        </div>

                        <div className = "sidebar">
                            <Cart 
                                cartItems = {this.state.cartItems}
                                removeFromCart = {this.removeFromCart}
                                createOrder = {this.createOrder}
                            />
                        </div>
                    </div>
                </main>

                <footer>
                    All right is reserved
                </footer>
            </div>

        )
    }
}
