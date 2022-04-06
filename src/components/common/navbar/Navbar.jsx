import React from 'react';
import { Searchbar } from '../../common';
import ItemData from "./itemData.json";

import './Navbar.css';

function Navbar () {

    return (
    <div className="navbar">
        <div className="header-left">
            <a href="/" className="navbar-item">Home</a>
        </div>
            <div className="header-right">
                    <a href="/newListing" className="navbar-item">New Listing</a>
                    <a href="/cart" className="navbar-item">Cart</a>
                    <a href="/wishlist" className="navbar-item">Wishlist</a>
                    <a href="/settings" className="navbar-item">Settings</a>
                    <a href="/sign-up" className="navbar-item">Account</a>
                    < Searchbar placeholder="Search for an item..." data={ItemData} />
            </div>      
    </div>
    )
}

export default Navbar;