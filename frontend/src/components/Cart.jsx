import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";

const Cart = () => {
  const location = useLocation();
  const products = location.state;
  const [state, setState] = useState(products || []);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const price = state.reduce((acc, x) => x.productPrice * x.count + acc, 0);

  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user]);

  const addToBasketINC = async (product) => {
    const url = "http://localhost:5000/cart/add-item";
    const res = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: product.productName,
        url: product.productUrl,
        userId: user,
        price: product.productPrice,
        productId: product.productId,
        inc: true,
      }),
    });
    const data = await res.json();
    setState(data.msg.products);
  };

  const removeItemFromBasket = async (product) => {
    const url = "http://localhost:5000/cart/add-item";
    const res = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: product.productName,
        url: product.productUrl,
        userId: user,
        price: product.productPrice,
        productId: product.productId,
        dec: true,
      }),
    });
    const data = await res.json();
    setState(data.msg.products);
  };

  const deleteItemFromBasket = async (_id) => {
    const url = "http://localhost:5000/cart/delete-item";
    const res = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: _id,
        userId: user,
      }),
    });
    const data = await res.json();
    setState(data?.products);
  };

  const handleOrderEvent = async () => {
    const url = "http://localhost:5000/order/add-items-order-table";
    const res = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user,
      }),
    });
    return await res.json();
  };

  const handleClearCart = async (_id) => {
    const url = "http://localhost:5000/cart/clear-cart";
    const res = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user,
      }),
    });
    return await res.json();
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <header className="w-screen h-20 shadow-2xl shadow-gray-300 px-10 flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold italic">Your Cart</h1>

        <div className="flex space-x-8 justify-center items-center">
          <div className="flex space-x-2 cursor-pointer justify-center items-center relative">
            <p className="text-xl font-semibold">Total</p>
            <p className="text-md font-bold text-red-500">{price}</p>
          </div>
          {state.length > 0 && (
            <div
              className="flex space-x-1 cursor-pointer justify-center items-center relative"
              onClick={() => {
                const p = Promise.all([
                  handleOrderEvent().then((s) => s),
                  handleClearCart().then((s) => s),
                ]);

                p.then((val) => {
                  if (
                    val[0].msg === "Order placed successfully!" &&
                    val[1].msg === "cart deleted successfully!"
                  )
                    navigate("/order-done");
                });
              }}
            >
              <i className="fa-solid fa-bag-shopping text-xl"></i>
              <p className="text-xl font-semibold">Order</p>
            </div>
          )}
        </div>
      </header>

      <main className="px-5 flex flex-col justify-center">
        {state.map((product) => (
          <div key={product._id} className="w-[95%] h-80 mb-4 flex">
            <div className="flex-1">
              <img
                className="object-cover object-center h-80 w-[100%]"
                src={product.productUrl}
                alt=""
              />
            </div>
            <div className="flex-1 justify-center items-center flex flex-col">
              <h1 className="text-3xl font-bold mb-3">{product.count}</h1>
              <div className="space-x-8 transition-all duration-300">
                <button
                  className="bg-gray-200 rounded-full px-3 py-1 hover:bg-gray-300"
                  onClick={() => addToBasketINC(product)}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
                <button onClick={() => removeItemFromBasket(product)}>
                  <i className="fa-solid fa-minus"></i>
                </button>
                <button
                  onClick={() => deleteItemFromBasket(product._id)}
                  className="bg-red-200 rounded-full px-3 py-1 hover:bg-red-300"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer className="w-screen h-1/2 flex justify-center items-center">
        {state.length > 0 ? (
          <p className="text-7xl font-bold text-gray-800">This is Footer</p>
        ) : (
          <i className="fa-solid fa-face-smile-upside-down text-7xl">
            No Items
          </i>
        )}
      </footer>
    </div>
  );
};

export default Cart;
