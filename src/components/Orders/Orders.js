import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewProduct from "../ReviewProduct/ReviewProduct";
import "./Order.css";

const Orders = () => {
  const { savedCart } = useLoaderData();
  const [cartProducts, setCartProducts] = useState(savedCart);
  // console.log(cartProducts);

  const handleDelete = (id) => {
    const reamining = cartProducts.filter((product) => product.id !== id);
    setCartProducts(reamining);
    removeFromDb(id);
  };

  const handleClearCart = () => {
    deleteShoppingCart();
    setCartProducts([])
    // setCartProducts([])
  }


  // console.log(savedCart);
  return (
    <div className="container">
      <div className="shop-container">
        {cartProducts.length === 0 ? (
          <div className="review-products-container">
            No Products Added
            <br />
            Please Add Some From Shop.
          </div>
        ) : (
          <div className="review-products-container">
            {cartProducts.map((product) => (
              <ReviewProduct
                key={product.id}
                product={product}
                handleDelete={handleDelete}
              ></ReviewProduct>
            ))}
          </div>
        )}

        <div className="cart-container">
          <Cart cart={cartProducts}>
          <button onClick={handleClearCart} className="btn cart-btn">Clear Cart</button>
          <Link to={'/checkout'}> <button className="btn">Proceed Checkout</button> </Link>
          </Cart>
        </div>
      </div>
    </div>
  );
};

export default Orders;
