import { useCart } from "../../context/CartContext";

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
									style={{
										width: "80px",
										height: "80px",
										objectFit: "cover",
									}}
								/>
							</div>
							<div className="product-info">
								<div className="title">{product.name}</div>
								<div className="price-wrapper">
									<div className="price-and-quantity">
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
										<div className="quantity">
											<div
												className="count-button"
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
											<div className="count">
												{product.quantity}
											</div>
											<div
												className="count-button"
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
									<div className="total-price">
										$
										{(
											product.price * product.quantity
										).toFixed(2)}
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
							<div className="price">${orderPrice.toFixed(2)}</div>
						</div>
						<div className="price-row">
							<div className="name">Discount for promo code</div>
							<div className={isPromoApplied ? "text-green" : ""}>
								{isPromoApplied ? "10%" : "No"}
							</div>
						</div>
						<div className="price-row delimiter">
							<div className="name">
								Delivery{" "}
								<span className="additional">
									(Aug 02 at 16:00)
								</span>
							</div>
							<div className="price">${delivery.toFixed(2)}</div>
						</div>
						<div className="price-row total">
							<div className="name">Total</div>
							<div className="price">
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
