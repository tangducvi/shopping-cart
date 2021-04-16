import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from "react-reveal/Fade"
import Zoom from "react-reveal/Zoom"
import Modal from "react-modal"

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product : null
        }
    }
    openModal = (product) => {
        this.setState({
            product
        })
    }
    closeModal = () => {
        this.setState({
            product : null
        })
    }
    render() {
        const {product} = this.state;
        return (
            <div>
                <Fade bottom cascade>
                <ul className = "products">
                    {this.props.products.map(product => (
                        <li key = {product.id}>
                            <div className = "product">
                                <a href = {"#" + product.id} onClick = {() => this.openModal(product)}>
                                    <img src = {product.image} alt = {product.title}></img>
                                    <p>
                                        {product.title}
                                    </p>
                                </a>

                                <div className = "product-price">
                                    <div>
                                        Price: {formatCurrency(product.price)}
                                    </div>
                                    
                                    <button className = "button primary" onClick = {() => this.props.addToCart(product)}>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                </Fade>
                {
                    product && (
                        
                        <Modal isOpen = {true} onRequestClose = {this.closeModal}>
                            <Zoom>
                                <div className = "p-detail">
                                    <button className = "close-modal" onClick = {this.closeModal}>x</button>
                                    <div className = "product-details">
                                    <img src = {product.image} alt = {product.title}></img>
                                    <div className = "product-details-des">
                                        <p>
                                            <strong>{product.title}</strong>
                                        </p>
                                        <p>
                                            {product.des}
                                        </p>
                                        <p>
                                            Size: {product.size.map((size) => (
                                            <span>{" "} <button className = "button">{size}</button></span>
                                        ))}
                                        </p>
                                        <div className = "product-price">
                                            <div>Price: {formatCurrency(product.price)}</div>
                                            <button 
                                                className = "button primary" 
                                                onClick = {(e) => {
                                                    this.props.addToCart(product);
                                                    this.closeModal()}
                                                }
                                            >
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                </div>   
                            </Zoom>
                        </Modal>
                        
                    )
                }
            </div>
        )
    }
}
