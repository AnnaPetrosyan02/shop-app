import { createContext, useContext, useState, useEffect } from "react";
import { LS_Keys } from "../constants";

const CartContext = createContext();

export function useCart() {
	return useContext(CartContext);
}

export function CartProvider({ children }) {
	const [favorites, setFavorites] = useState(() => {
		const savedFavorites = localStorage.getItem(LS_Keys.FAVORITES);
		return savedFavorites ? JSON.parse(savedFavorites) : [];
	});
	const [cart, setCart] = useState(() => {
		const savedCart = localStorage.getItem(LS_Keys.CART);
		return savedCart ? JSON.parse(savedCart) : [];
	});

	useEffect(() => {
		localStorage.setItem(LS_Keys.FAVORITES, JSON.stringify(favorites));
	}, [favorites]);

	useEffect(() => {
		localStorage.setItem(LS_Keys.CART, JSON.stringify(cart));
	}, [cart]);

	const toggleFavorite = (productId) => {
		setFavorites((prev) =>
			prev.includes(productId)
				? prev.filter((id) => id !== productId)
				: [...prev, productId],
		);
	};

	const isFavorite = (productId) => favorites.includes(productId);

	// Функции для корзины
	const addToCart = (product, quantity = 1) => {
		setCart((prev) => {
			const existingItem = prev.find((item) => item.id === product.id);

			if (existingItem) {
				return prev.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + quantity }
						: item,
				);
			}

			return [...prev, { ...product, quantity }];
		});
	};

	const removeFromCart = (productId) => {
		setCart((prev) => prev.filter((item) => item.id !== productId));
	};

	const updateCartQuantity = (productId, newQuantity) => {
		if (newQuantity <= 0) {
			removeFromCart(productId);
			return;
		}

		setCart((prev) =>
			prev.map((item) =>
				item.id === productId
					? { ...item, quantity: newQuantity }
					: item,
			),
		);
	};

	const getCartTotal = () => {
		return cart.reduce(
			(total, item) => total + item.price * item.quantity,
			0,
		);
	};

	const getCartCount = () => {
		return cart.reduce((total, item) => total + item.quantity, 0);
	};

	return (
		<CartContext.Provider
			value={{
				favorites,
				cart,
				toggleFavorite,
				isFavorite,
				addToCart,
				removeFromCart,
				updateCartQuantity,
				getCartTotal,
				getCartCount,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
