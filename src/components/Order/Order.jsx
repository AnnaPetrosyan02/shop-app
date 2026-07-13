import { useCart } from "../../context/CartContext";

export default function Order() {
  const { cart, updateCartQuantity, removeFromCart, getCartTotal } = useCart();

  const handleQuantityChange = (productId, change) => {
    const product = cart.find((item) => item.id === productId);
    if (product) {
      updateCartQuantity(productId, product.quantity + change);
    }
  };

  const total = getCartTotal();
  const delivery = total > 0 ? 16 : 0;
  const finalTotal = total + delivery;

  if (cart.length === 0) {
    return (
      <div className="cart">
        <div className="order-wrapper">
          <div className="empty-cart">Корзина пуста</div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="order-wrapper">
        <div className="product-list">
          {cart.map((product) => (
            <div className="product" key={product.id}>
              <div className="photo">
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              </div>
              <div className="product-info">
                <div className="title">{product.name}</div>
                <div className="price-wrapper">
                  <div className="price-and-quantity">
                    <div className="price">
                      {product.oldPrice && (
                        <div className="old-price">${product.oldPrice}</div>
                      )}
                      <div className="current-price">${product.price}</div>
                    </div>
                    <div className="quantity">
                      <div
                        className="count-button"
                        onClick={() => handleQuantityChange(product.id, -1)}
                        style={{ cursor: "pointer" }}
                      >
                        -
                      </div>
                      <div className="count">{product.quantity}</div>
                      <div
                        className="count-button"
                        onClick={() => handleQuantityChange(product.id, 1)}
                        style={{ cursor: "pointer" }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="total-price">
                    ${(product.price * product.quantity).toFixed(2)}
                  </div>
                </div>
                <div
                  className="close"
                  onClick={() => removeFromCart(product.id)}
                  style={{ cursor: "pointer" }}
                >
                  ×
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="order">
          <div className="title">Your Order</div>
          <div className="order-price-wrapper">
            <div className="price-row">
              <div className="name">Order price</div>
              <div className="price">${total.toFixed(2)}</div>
            </div>
            <div className="price-row">
              <div className="name">Discount for promo code</div>
              <div>No</div>
            </div>
            <div className="price-row delimiter">
              <div className="name">
                Delivery <span className="additional">(Aug 02 at 16:00)</span>
              </div>
              <div className="price">${delivery.toFixed(2)}</div>
            </div>
            <div className="price-row total">
              <div className="name">Total</div>
              <div className="price">${finalTotal.toFixed(2)}</div>
            </div>
          </div>
          <div className="button-wrapper">
            <button className="button">Checkout</button>
            <div className="vertical-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
