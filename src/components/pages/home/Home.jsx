import React, {useState} from 'react';
import "./Home.css";
import '../../common/searchbar/Searchbar.css';
import Listing from '../../../objects/listing';
import Property from '../../../objects/property';
import Item from '../../../objects/item';

import { getListings } from '../../../backend/client/firestore';

import PreviewProducts from '../PrevProduct/PreviewProducts';

const Home = () => {

    const [previewComps, setPreviewComps] = useState(<div />);

    (async function() {
        let products = await getListings("");
        
        let previewElements = <></>;
        if (products) {
            let previewElements = products.map((product) => (
            <div className="previews-container">
                <PreviewProducts title={ product.item.title } img= { product.item.images[0] } price={ formatter.format(product.item.price)} id={product.id} />
            </div>
            ))
        }
        
        setPreviewComps(previewElements)
    }());

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'usd'
    })
    
    return (
        <div className="home-container">
            <br/>
            <br/>
            <h1 className="header-container">Welcome to Waddle!</h1>
            <div className="category-display">
                <div className="category-buttons">
                <button>Books</button>
                <button>Clothing</button>
                <button>Furniture</button>
                <button>Electronics</button>
                <button>Sports&nbsp;Gear</button>
                </div>
            </div>

            <br/>

            <div className='previews-container'>
                { previewComps }
            </div>



        </div>
    )
}

export default Home
