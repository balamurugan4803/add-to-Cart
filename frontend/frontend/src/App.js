import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart
      .map(item =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter(item => item.qty > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // 🔍 Search filter
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      {/* 🔥 HEADER (Amazon style) */}
      <div style={{
        background: "#131921",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <h2>🛒 MyShop</h2>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "40%",
            padding: "8px",
            borderRadius: "4px",
            border: "none"
          }}
        />

        <div>
          🛒 Cart ({cart.length})
        </div>
      </div>

      {/* 🔥 MAIN */}
      <div style={{ display: "flex", padding: "20px", gap: "20px" }}>

        {/* 🛍 PRODUCTS GRID */}
        <div style={{
          flex: 3,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "15px"
        }}>
          {filteredProducts.map(p => (
            <div key={p.id} style={{
              background: "white",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}>
              <img 
  src={p.image} 
  alt="" 
  style={{ width: "100%", height: "150px", objectFit: "cover" }} 
/>

<h4>{p.name}</h4>

<p>₹{p.price}</p>

<p>{"⭐".repeat(p.rating || 0)}</p>

<button
  onClick={() => addToCart(p)}
  style={{
    width: "100%",
    background: "#ffd814",
    border: "none",
    padding: "8px",
    cursor: "pointer",
    borderRadius: "5px"
  }}
>
  Add to Cart
</button>
            </div>
          ))}
        </div>

        {/* 🛒 CART SIDEBAR */}
        <div style={{
          flex: 1,
          background: "white",
          padding: "15px",
          borderRadius: "8px",
          height: "fit-content",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}>
          <h3>Your Cart</h3>

          {cart.length === 0 && <p>Empty</p>}

          {cart.map(item => (
            <div key={item.id} style={{
              marginBottom: "10px",
              borderBottom: "1px solid #eee",
              paddingBottom: "5px"
            }}>
              <strong>{item.name}</strong>
              <p>₹{item.price} × {item.qty}</p>

              <div>
                <button onClick={() => increaseQty(item.id)}>➕</button>
                <button onClick={() => decreaseQty(item.id)}>➖</button>
              </div>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>

          <button style={{
            width: "100%",
            background: "#ffa41c",
            border: "none",
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer"
          }}>
            Proceed to Buy
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;