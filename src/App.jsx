
import { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Oversized Black Tee", category: "T-Shirts", price: 599, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600" },
  { id: 2, name: "Streetwear White Tee", category: "T-Shirts", price: 499, image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600" },
  { id: 3, name: "Classic Hoodie", category: "Hoodies", price: 999, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600" },
  { id: 4, name: "Urban Denim Jacket", category: "Jackets", price: 1499, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600" },
  { id: 5, name: "Casual Street Shirt", category: "Shirts", price: 799, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600" },
  { id: 6, name: "Relaxed Fit Pants", category: "Pants", price: 899, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600" },
];

function App() {
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const categories = ["All", "T-Shirts", "Hoodies", "Jackets", "Shirts", "Pants"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
  setCart((prevCart) => {
    const existingProduct = prevCart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    }

    return [...prevCart, { ...product, quantity: 1 }];
  });

  setShowCart(true);
  
};

  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) =>
      prevCart.filter((_, index) => index !== indexToRemove)
    );
  };

   const total = cart.reduce(
  (sum, item) =>
    sum + Number(item.price) * (item.quantity || 1),
  0
);

  return (
    <div className="app">
      <div className="announcement">
        NEW DROP AVAILABLE NOW — FREE SHIPPING ON ORDERS OVER ₹1999
      </div>

      <header className="navbar">
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <a href="#" className="logo">STREET<span>MODE.</span></a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>

        <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
          Bag ({cart.length})
        </button>
      </header>

      {showCart && (
        <section className="cart-panel">
          <div className="cart-heading">
            <h2>Your Bag ({cart.length})</h2>
            <button onClick={() => setShowCart(false)}>✕</button>
          </div>

          {cart.length === 0 ? (
            <p>Your bag is empty.</p>
          ) : (
            <>
              {cart.map((product, index) => (
                <div className="cart-item" key={`${product.id}-${index}`}>
                  <img src={product.image} alt={product.name} />
                  <div>
  <h4>{product.name}</h4>
  <p>₹{product.price}</p>

  <div className="quantity-controls">
    <button
      onClick={() =>
        setCart((prevCart) =>
          prevCart.map((item, i) =>
            i === index
              ? {
                  ...item,
                  quantity: Math.max(1, (item.quantity || 1) - 1),
                }
              : item
          )
        )
      }
    >
      −
    </button>

    <span>{product.quantity || 1}</span>

    <button
      onClick={() =>
        setCart((prevCart) =>
          prevCart.map((item, i) =>
            i === index
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          )
        )
      }
    >
      +
    </button>
  </div>
</div>
                  <button onClick={() => removeFromCart(index)}>Remove</button>
                </div>
              ))}
              <h3>Total: ₹{total}</h3>
              <button
  className="checkout-btn"
  onClick={() => setShowCheckout(true)}
>
  Proceed to Checkout →
</button>
            </>
          )}
        </section>
      )}

      <main>
        <section className="hero" id="home">
  <div className="hero-content">
    <p className="eyebrow">YOUR STYLE. YOUR RULES.</p>

    <h1>
      WEAR YOUR<br />
      <span>ATTITUDE.</span>
    </h1>

    <p className="hero-description">
      Everyday essentials. Unapologetic streetwear.
    </p>

    <a href="#shop" className="shop-button">
      SHOP THE DROP ↗
    </a>

    <p className="hero-note">
      OVERSIZED FITS • EVERYDAY COMFORT • STREET CULTURE
    </p>
  </div>

  <div className="hero-image">
    <img
      src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=900"
      alt="Modern streetwear fashion collection"
    />
    <div className="image-label">
      <span>STREETMODE COLLECTION</span>
      <span>DROP 001</span>
    </div>
  </div>
</section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CURATED FOR YOU</p>
              <h2>THE LATEST DROP<span>.</span></h2>
            </div>
            <p>{filteredProducts.length} PRODUCTS</p>
          </div>

          <input
            className="search-input"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "category active" : "category"}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <span className="product-tag">NEW DROP</span>
                  <button
                    className="quick-add"
                    onClick={() => addToCart(product)}
                  >
                    QUICK ADD +
                  </button>
                </div>

                <div className="product-info">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                  </div>
                  <strong>₹{product.price}</strong>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="no-products">No products found. Try another search.</p>
          )}
        </section>

        <section className="about-section" id="about">
          <p className="eyebrow">BUILT FOR THE STREETS</p>
          <h2>NOT HERE TO FIT IN.<br />HERE TO STAND OUT.</h2>
          <p>Streetwear for people who make their own rules.</p>
          <a href="#shop" className="shop-btn">EXPLORE COLLECTION ↗</a>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="logo">STREET<span>MODE.</span></a>
        <p>OWN YOUR LOOK. © 2026 STREETMODE.</p>
      </footer>
    </div>
  );
}

export default App;
