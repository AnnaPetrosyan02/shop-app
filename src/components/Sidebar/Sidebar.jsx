import { useState } from "react";
import { useShop } from "../../context/ShopContext";
import productsData from "../../productsData.json";
import { banner } from "../../assets/images";
import { search, smallRow } from "../../assets/icons";
import styles from "../../styles/sidebar.module.css";



export default function Sidebar() {
    const { searchQuery, setSearchQuery, setAppliedFilters } = useShop();
    const allCategories = [
        "All",
        ...new Set(productsData.flatMap((p) => p.categories).filter(Boolean)),
    ];

    const allColors = [
        ...new Set(
            productsData
                .flatMap((p) => {
                    if (p.colors && Array.isArray(p.colors)) return p.colors;
                    if (p.color) return [p.color];
                    return [];
                })
                .filter(Boolean),
        ),
    ];

    const prices = productsData.map((p) => p.price);
    const minPricePossible = Math.min(...prices);
    const maxPricePossible = Math.max(...prices);

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedColors, setSelectedColors] = useState([]);

    const handleColorChange = (color) => {
        setSelectedColors((prev) =>
            prev.includes(color)
                ? prev.filter((c) => c !== color)
                : [...prev, color],
        );
    };

    const handleApplyFilter = () => {
        setAppliedFilters({
            category: selectedCategory,
            priceRange: [Number(minPrice) || 0, Number(maxPrice) || Infinity],
            colors: selectedColors,
        });
    };

    return (
		<div className={styles.shop}>
			<div className={styles.sidebar}>
						<div className={styles.search}>
							<label>
								<input
									type="text"
									placeholder="Search"
									className={`input ${styles.searchRow}`}
									id="search-row"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								<img
									src={search}
									alt="Search Icon"
									className={styles.searchIcon}
								/>
							</label>
						</div>
						<div className={styles.sidebarItem}>
							<div className={styles.sidebarTitle}>Categories</div>
							<div className={styles.sidebarContent}>
								<ul className={styles.customList}>
									{allCategories.map((category) => (
										<div className={styles.customListItem} key={category}>
											<li
												className={`${styles.item} js-category ${selectedCategory === category ? styles.active : ""}`}
												onClick={() =>
													setSelectedCategory(category)
												}
												style={{ cursor: "pointer" }}
											>
												{category}
											</li>
										</div>
									))}
								</ul>
							</div>
						</div>

						<div className={styles.sidebarItem}>
							<div className={styles.sidebarTitle}>Price</div>
							<div className={styles.sidebarContent}>
								<div className={styles.priceBar}>
									<input
										type="number"
										placeholder={minPricePossible}
										className="input"
										value={minPrice}
										onChange={(e) => setMinPrice(e.target.value)}
									/>
									<input
										type="number"
										placeholder={maxPricePossible}
										className="input"
										value={maxPrice}
										onChange={(e) => setMaxPrice(e.target.value)}
									/>
								</div>
							</div>
						</div>

						<div className={styles.sidebarItem}>
							<div className={styles.sidebarTitle}>Colors</div>
							<div className={styles.sidebarContent}>
								<div className={styles.colors}>
									{allColors.map((color) => (
										<div className={styles.color} key={color}>
											<input
												type="checkbox"
												className={styles.colorCheckbox}
												id={`color-${color}`}
												checked={selectedColors.includes(color)}
												onChange={() => handleColorChange(color)}
											/>
											<label
												htmlFor={`color-${color}`}
												className={styles.colorName}
												style={{ textTransform: "capitalize" }}
											>
												{color}
											</label>
										</div>
									))}
								</div>
							</div>
						</div>

						<div className={styles.sidebarItem}>
							<div className="button-wrapper">
								<button
									className={`button ${styles.buttonApplyFilter}`}
									id="apply-filter"
									onClick={handleApplyFilter}
									disabled={selectedCategory === 'All' && !minPrice && !maxPrice && selectedColors.length === 0}
								>
									Apply Filter
								</button>
								<div className="vertical-line" id="vertical-line"></div>
							</div>
						</div>

						<div className={styles.sidebarItem}>
							<div className={styles.sidebarTitle}>Reviewed by you</div>
							<div className={styles.sidebarContent}>
								<div className={styles.reviewedProducts}>
									<div className={styles.product}>
										<div className={styles.image}></div>
										<div className={styles.info}>
											<div className={styles.name}>Retro style handbag</div>
											<div className="price">
												<div className="current-price">$35.99</div>
												<div className="old-price">$52.99</div>
											</div>
										</div>
									</div>
									<div className={styles.product}>
										<div className={styles.image}></div>
										<div className={styles.info}>
											<div className={styles.name}>Warm casual sweater</div>
											<div className="price">
												<div className="current-price">$35.99</div>
												<div className="old-price">$52.99</div>
											</div>
										</div>
									</div>
									<div className={styles.product}>
										<div className={styles.image}></div>
										<div className={styles.info}>
											<div className={styles.name}>
												Textured turtleneck with zip
											</div>
											<div className="price">
												<div className="current-price">$35.99</div>
												<div className="old-price">$52.99</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div>
							<a href="#">
								<img src={banner} alt="Season Sale Banner" />
							</a>
						</div>
			</div>
		</div>
        
    );
}