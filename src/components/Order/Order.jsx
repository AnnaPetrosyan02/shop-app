import { useCart } from "../../context/CartContext";
import styles from "../../styles/order.module.css";

export default function Order({ isPromoApplied }) {
    const { cart, updateCartQuantity, removeFromCart, getCartTotal } =
        useCart();

    const handleQuantityChange = (productId, change) => {
        const product = cart.find((item) => item.id === productId);
        if (product) {
            updateCartQuantity(productId, product.quantity + change);
        }
    };

    const orderPrice = getCartTotal();
    const discount = isPromoApplied ? orderPrice * 0.1 : 0;
    const delivery = orderPrice > 0 ? 15 : 0;
    const finalTotal = (orderPrice - discount) + delivery;

    const handleCheckout = () => {
        const checkoutData = {
            products: cart.map((item) => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: (item.price * item.quantity).toFixed(2),
            })),
            summary: {
                orderPrice: orderPrice.toFixed(2),
                promoApplied: isPromoApplied ? "ilovereact (10% discount)" : "No",
                discountAmount: discount.toFixed(2),
                deliveryPrice: delivery.toFixed(2),
                totalPrice: finalTotal.toFixed(2),
            },
            timestamp: new Date().toISOString(),
        };

        console.log("=== CHECKOUT DATA ===", checkoutData);
        alert("Order completed! Checkout data is logged to console.");
    };

    if (cart.length === 0) {
        return (
            <div className={styles.cart}>
                <div className={styles.orderWrapper}>
                    <div className={styles.emptyCart}>Корзина пуста</div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.cart}>
            <div className={styles.orderWrapper}>
                <div className={styles.productList}>
                    {cart.map((product) => (
                        <div className={styles.product} key={product.id}>
                            <div className={styles.photo}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{
                                        width: "130px",
                                        height: "140px",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                            <div className={styles.productInfo}>
                                <div className={styles.title}>{product.name}</div>
                                <div className={styles.priceWrapper}>
                                    <div className={styles.priceAndQuantity}>
                                        <div className="price">
                                            {product.oldPrice && (
                                                <div className="old-price">
                                                    ${product.oldPrice}
                                                </div>
                                            )}
                                            <div className="current-price">
                                                ${product.price}
                                            </div>
                                        </div>
                                        <div className={styles.quantity}>
                                            <div
                                                className={styles.countButton}
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        product.id,
                                                        -1,
                                                    )
                                                }
                                                style={{ cursor: "pointer" }}
                                            >
                                                -
                                            </div>
                                            <div className={styles.count}>
                                                {product.quantity}
                                            </div>
                                            <div
                                                className={styles.countButton}
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        product.id,
                                                        1,
                                                    )
                                                }
                                                style={{ cursor: "pointer" }}
                                            >
                                                +
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.totalPrice}>
                                        $
                                        {(
                                            product.price * product.quantity
                                        ).toFixed(2)}
                                    </div>
                                </div>
                                <div
                                    className={styles.close}
                                    onClick={() => removeFromCart(product.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    ×
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.order}>
                    <div className={styles.title}>Your Order</div>
                    <div className={styles.orderPriceWrapper}>
                        <div className={styles.priceRow}>
                            <div className={styles.name}>Order price</div>
                            <div className={styles.price}>${orderPrice.toFixed(2)}</div>
                        </div>
                        <div className={styles.priceRow}>
                            <div className={styles.name}>Discount for promo code</div>
                            <div className={isPromoApplied ? styles.textGreen : ""}>
                                {isPromoApplied ? "10%" : "No"}
                            </div>
                        </div>
                        <div className={`${styles.priceRow} ${styles.delimiter}`}>
                            <div className={styles.name}>
                                Delivery{" "}
                                <span className={styles.additional}>
                                    (Aug 02 at 16:00)
                                </span>
                            </div>
                            <div className={styles.price}>${delivery.toFixed(2)}</div>
                        </div>
                        <div className={`${styles.priceRow} ${styles.total}`}>
                            <div className={styles.name}>Total</div>
                            <div className={styles.price}>
                                ${finalTotal.toFixed(2)}
                            </div>
                        </div>
                    </div>
                    <div className="button-wrapper">
                        <button className="button" onClick={handleCheckout}>Checkout</button>
                        <div className="vertical-line"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}