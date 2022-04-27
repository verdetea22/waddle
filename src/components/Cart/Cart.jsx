import React, { useEffect, useState } from 'react';
import { useFirebaseAuth } from '../../hooks/';
import ListingPreview from '../ListingPreview/ListingPreview';
import getListings from "./../../services/firebase/listings/getListings";
import "./Cart.css";
import {Card, Row, Button, Col} from "react-bootstrap";

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const { cart } = useFirebaseAuth();
    
    useEffect(() => {
        const fetchListings = async () => {
            if (cart) {
                const listings = await getListings(cart);
                setCartItems(listings);
            }
        };
        return fetchListings;
    }, [cart]);

    return (
        <Card className="container-fluid">
            <Row>
                <Col className="m-8" id="main">
                    <>{cartItems.map(item => <ListingPreview key={item.toString()} item={item} />)}</>
                </Col>
            </Row>
            <Row>
                <Button className='btn-success' href="/">Proceed to Checkout</Button>
            </Row>
        </Card>
    );
}


export default Cart