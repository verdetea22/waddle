import React, {useState, useEffect } from 'react';
import "./ItemView.css"

import { getListing } from "./../../services/firebase/listings";

const ViewItem = () => {
    
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            let id = window.location.href.slice(-20);
            let listing = await getListing(id);
            console.log(listing);
            let item = listing.item;
            setTitle(item.title);
            setDescription(item.description);
            setImage(item.images[0]);
            setPrice(item.price);
        }
        fetchData();
    }, []);

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'usd'
    })
    return <div className="item-container">
        <h1 className="item-title">{title}</h1>
        <img src={image} className="item-image"/>
        <h3 className="price">{formatter.format(price)}</h3>
        <h3 classname="description" >{description}</h3>
    </div>
}

export default ViewItem;