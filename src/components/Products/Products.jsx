import { useState, useEffect, useMemo } from "react";
import productsData from "../../productsData.json";
import { useCart } from "../../context/CartContext";
import { useShop } from "../../context/ShopContext";
import Pagination from "../Pagination/Pagination";
import {
    favoritesIcon,
    favoritesFilled,
} from "../../assets/icons";
import styles from "../../styles/products.module.css";


export default function Products() {
    const [products, setProducts] = useState([]);
    const { isFavorite, toggleFavorite, addToCart, cart, updateCartQuantity } =
        useCart();
    const { 
        debouncedSearchQuery, 
        appliedFilters,
        sortBy,
        setSortBy,
        productPage,
        setProductPage
    } = useShop();

    const itemsPerPage = 9;

    useEffect(() => {
        setProducts(productsData);
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase());

        const productCategories = product.categories || [];
        const matchesCategory =
            appliedFilters.category === "All" ||
            productCategories.includes(appliedFilters.category);

        const matchesPrice =
            product.price >= appliedFilters.priceRange[0] &&
            product.price <= appliedFilters.priceRange[1];

        let matchesColor = true;
        if (appliedFilters.colors.length > 0) {
            const productColorLower = product.color?.toLowerCase();

            const selectedColorsLower = appliedFilters.colors.map((c) =>
                c?.toLowerCase(),
            );

            matchesColor = selectedColorsLower.includes(productColorLower);
        }

        return matchesSearch && matchesCategory && matchesPrice && matchesColor;
    });

    const sortedProducts = useMemo(() => {
        const items = [...filteredProducts];
        
        if (sortBy === "PRICE_ASC") {
            return items.sort((a, b) => a.price - b.price);
        }
        if (sortBy === "PRICE_DESC") {
            return items.sort((a, b) => b.price - a.price);
        }
        if (sortBy === "NAME_ASC") {
            return items.sort((a, b) => a.name.localeCompare(b.name));
        }
        if (sortBy === "NAME_DESC") {
            return items.sort((a, b) => b.name.localeCompare(a.name));
        }
        
        return items;
    }, [filteredProducts, sortBy]);

    const totalItems = sortedProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    
    const indexOfLastItem = productPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className={styles.shop}>
            <div className={styles.productsWrapper}>
                <div className={styles.sortAndCount}>
                    <div className={styles.productsCount}>
                        There are{" "}
                        <span className={styles.bold} id="products-count">
                            {filteredProducts.length}
                        </span>{" "}
                        products in this category
                    </div>
                    <div className={styles.sort}>
                        <select className="input"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="RELEVANCE">Relevance</option>
                            <option value="NAME_ASC">from A to Z</option>
                            <option value="NAME_DESC">from Z to A</option>
                            <option value="PRICE_ASC">from low to high</option>
                            <option value="PRICE_DESC">from high to low</option>
                        </select>
                    </div>
                </div>

                <div className={`${styles.products} js-products`}>
                    {currentProducts.map((product) => {
                        const cartItem = cart.find(
                            (item) => item.id === product.id,
                        );
                        return (
                            <div className={styles.product} key={product.id}>
                                <div className={styles.photo}>
                                    <div className={styles.topBar}>
                                        <div className={styles.labels}>
                                            {product.isSale && (
                                                <div className={`${styles.label} ${styles.sale}`}>
                                                    Sale
                                                </div>
                                            )}
                                            {product.isNew && (
                                                <div className={`${styles.label} ${styles.new}`}>
                                                    New
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={styles.favorites}
                                            onClick={() =>
                                                toggleFavorite(product.id)
                                            }
                                            style={{ cursor: "pointer" }}
                                        >
                                            <img
                                                src={
                                                    isFavorite(product.id)
                                                        ? favoritesFilled
                                                        : favoritesIcon
                                                }
                                                alt="heart"
                                            />
                                        </div>
                                    </div>

                                    <img
                                        className={styles.productImage}
                                        src={product.image}
                                        alt={product.name}
                                    />
                                    {!cartItem ? (
                                        <button
                                            className={styles.buyButton}
                                            onClick={() => addToCart(product)}
                                        >
                                            Купить
                                        </button>
                                    ) : (
                                        <div className={styles.quantityControls}>
                                            <button
                                                className={styles.quantityBtn}
                                                onClick={() =>
                                                    updateCartQuantity(
                                                        product.id,
                                                        cartItem.quantity - 1,
                                                    )
                                                }
                                            >
                                                -
                                            </button>
                                            <span className={styles.quantityValue}>
                                                {cartItem.quantity}
                                            </span>
                                            <button
                                                className={styles.quantityBtn}
                                                onClick={() =>
                                                    updateCartQuantity(
                                                        product.id,
                                                        cartItem.quantity + 1,
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className={styles.info}>
                                    <div className={styles.name}>{product.name}</div>
                                    <div className="price">
                                        <div className="current-price">
                                            ${product.price}
                                        </div>
                                        {product.oldPrice && (
                                            <div className="old-price">
                                                ${product.oldPrice}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <Pagination
                    currentPage={productPage}
                    totalPages={totalPages}
                    onPageChange={setProductPage}
                />
            </div>
        </div>
    );
}