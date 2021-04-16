import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm ">
                <div className = "container">
                    {/* Brand */}
                    <a className="navbar-brand" href="#">TRVL <i class='fas fa-dove'></i></a>
                    
                    {/* Links */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Project</a>
                        </li>
                        {/* Dropdown */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            Contact
                            </a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">Link 1</a>
                                <a className="dropdown-item" href="#">Link 2</a>
                                <a className="dropdown-item" href="#">Link 3</a>
                            </div>
                        </li>
                    </ul>
                </div>
          </nav>
        )
    }
}
