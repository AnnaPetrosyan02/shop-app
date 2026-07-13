import { useState } from "react";
import { useShop } from "../../context/ShopContext";
import productsData from "../../productsData.json";
import { banner } from "../../assets/images";
import { search } from "../../assets/icons";

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
		<div className="sidebar">
			<div className="search">
				<label>
					<input
						type="text"
						placeholder="Search"
						className="input search-row"
						id="search-row"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<img
						src={search}
						alt="Search Icon"
						className="search-icon"
					/>
				</label>
			</div>
			<div className="sidebar-item">
				<div className="sidebar-title">Categories</div>
				<div className="sidebar-content">
					<ul className="custom-list">
						{allCategories.map((category) => (
							<div className="custom-list-item" key={category}>
								<li
									className={`item js-category ${selectedCategory === category ? "active" : ""}`}
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

			<div className="sidebar-item">
				<div className="sidebar-title">Price</div>
				<div className="sidebar-content">
					<div className="price-bar">
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

			<div className="sidebar-item">
				<div className="sidebar-title">Colors</div>
				<div className="sidebar-content">
					<div className="colors">
						{allColors.map((color) => (
							<div className="color" key={color}>
								<input
									type="checkbox"
									className="color-checkbox"
									id={`color-${color}`}
									checked={selectedColors.includes(color)}
									onChange={() => handleColorChange(color)}
								/>
								<label
									htmlFor={`color-${color}`}
									className="color-name"
									style={{ textTransform: "capitalize" }}
								>
									{color}
								</label>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="sidebar-item">
				<div className="button-wrapper">
					<button
						className="button button-apply-filter"
						id="apply-filter"
						onClick={handleApplyFilter}
					>
						Apply Filter
					</button>
					<div className="vertical-line" id="vertical-line"></div>
				</div>
			</div>

			<div className="sidebar-item">
				<div className="sidebar-title">Reviewed by you</div>
				<div className="sidebar-content">
					<div className="reviewed-products">
						<div className="product">
							<div className="image"></div>
							<div className="info">
								<div className="name">Retro style handbag</div>
								<div className="price">
									<div className="current-price">$35.99</div>
									<div className="old-price">$52.99</div>
								</div>
							</div>
						</div>
						<div className="product">
							<div className="image"></div>
							<div className="info">
								<div className="name">Warm casual sweater</div>
								<div className="price">
									<div className="current-price">$35.99</div>
									<div className="old-price">$52.99</div>
								</div>
							</div>
						</div>
						<div className="product">
							<div className="image"></div>
							<div className="info">
								<div className="name">
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
	);
}
