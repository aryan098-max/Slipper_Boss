import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";

const Card = ({ productUrl, productName, productPrice, _id, setUserData }) => {
  const { user } = useUserContext();

  const addToBasket = async () => {
    const url = "http://localhost:5000/cart/add-item";
    const res = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: productName,
        url: productUrl,
        userId: user,
        price: productPrice,
        productId: _id,
      }),
    });
    const data = await res.json();
    setUserData(data.msg?.products);
  };

  return (
    <>
      <div className="w-96 h-[360px] bg-gray-50 shadow-sm flex flex-col">
        <img src={productUrl} alt="" className="w-full h-60 object-cover" />
        <div className="flex justify-between px-5 py-4">
          <p className="text-md font-semibold">{productName}</p>
          <p className="text-md font-semibold">${productPrice}</p>
        </div>
        <button
          onClick={addToBasket}
          className="ml-4 w-32 text-center bg-gray-600 text-white px-2 py-2 rounded-md"
        >
          Add to basket
        </button>
      </div>
    </>
  );
};

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [products, setProducts] = useState([]);
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/auth");

    if (user) {
      fetchProducts();
      fetchUserInfo();
    }
  }, [user]);

  const fetchProducts = async () => {
    const url = "http://localhost:5000/fetch-all-products";
    const res = await fetch(url);
    const { all_products } = await res.json();
    setProducts(all_products);
  };

  const fetchUserInfo = async () => {
    const url = `http://localhost:5000/fetch-user-cart?_id=${user}`;
    const res = await fetch(url);
    const { products } = await res.json();
    setUserData(products);
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <header className="w-screen h-20 shadow-2xl shadow-gray-300 px-10 flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold italic">Slipper Boss</h1>
        <div className="flex space-x-5 justify-center items-center">
          <div
            className="flex space-x-1 cursor-pointer items-center"
            onClick={() => {
              navigate("/cart", { state: userData });
            }}
          >
            <i className="fa-sharp fa-solid fa-basket-shopping"></i>
            <p className="text-md font-semibold">{userData?.length}</p>
          </div>
          <div
            className="flex space-x-1 cursor-pointer"
            onClick={() => {
              setUser(null);
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <p className="text-xs font-semibold">Logout</p>
          </div>
        </div>
      </header>

      <main className="w-screen grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
        {products.map((product) => (
          <Card key={product._id} {...product} setUserData={setUserData} />
        ))}
      </main>

      {products.length > 0 ? (
        <footer className="w-screen h-1/2 flex justify-center items-center">
          <p className="text-7xl font-bold text-gray-800">This is Footer</p>
        </footer>
      ) : (
        <i className="fa-solid fa-face-smile-upside-down text-7xl text-center">
          Loading...
        </i>
      )}
    </div>
  );
};

export default Home;
