import { useState, useEffect } from 'react'
import './Products.css'
import ProductsData from './ProductsData.json'
import { useApp } from './context/AppContext'

export default function Products() {
  const [products, setProducts] = useState([])
  const { isFavorite, toggleFavorite, addToCart, cart, updateCartQuantity, debouncedSearchQuery, appliedFilters } = useApp()

  useEffect(() => {
    setProducts(ProductsData)
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

    // proverka nalichiya
    const productCategories = product.categories || [];
    const matchesCategory = appliedFilters.category === 'All' || productCategories.includes(appliedFilters.category);

    const matchesPrice = product.price >= appliedFilters.priceRange[0] && product.price <= appliedFilters.priceRange[1];

    let matchesColor = true;
    if (appliedFilters.colors.length > 0){
      const productColors = (product.categories ? [product.color] : []).map(c => c?.toLowerCase());
      const selectedColorsLower = appliedFilters.colors.map(c => c?.toLowerCase());

      matchesColor = selectedColorsLower.includes(product.color?.toLowerCase());
    }

    return matchesSearch && matchesCategory && matchesPrice && matchesColor;
  });

  return (
    <div className='shop'>
      <div className="products-wrapper">
        <div className="sort-and-count">
          <div className="products-count">
            There are <span className="bold" id="products-count">{filteredProducts.length}</span> products in this category
          </div>
          <div className="sort">
            <select className="input">
              <option value="RELEVANCE">Relevance</option>
              <option value="ASC">ASC</option>
              <option value="DESC">DESC</option>
            </select>
          </div>
        </div>

        <div className="products js-products">
          {filteredProducts.map(product => {
            const cartItem = cart.find(item => item.id === product.id);
            return (
              <div className="product" key={product.id}>
                <div className="photo">
                  <div className="top-bar">
                    <div className="labels">
                      {product.isSale && <div className="label sale">Sale</div>}
                      {product.isNew && <div className="label new">New</div>}
                    </div>
                    <div 
                      className="favorites" 
                      onClick={() => toggleFavorite(product.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        src={isFavorite(product.id) ? "./icons/favorites-filled.svg" : "./icons/favorites.svg"}
                        alt="heart"
                      />
                    </div>
                  </div>

                  <img className="product-image" src={product.image} alt={product.name} />
                  {!cartItem ? (
                    <button className="buy-button" onClick={() => addToCart(product)}>
                      Купить 
                    </button>
                  ) : (
                    <div className="quantity-controls">
                      <button className="quantity-btn" onClick={() => updateCartQuantity(product.id, cartItem.quantity - 1)}>
                        -
                      </button>
                      <span className="quantity-value">
                        {cartItem.quantity}
                      </span>
                      <button className="quantity-btn" onClick={() => updateCartQuantity(product.id, cartItem.quantity + 1)}>
                        +
                      </button>
                    </div>
                  )}
                </div>

                <div className="info">
                  <div className="name">{product.name}</div>
                  <div className="price">
                    <div className="current-price">${product.price}</div>
                    {product.oldPrice && <div className="old-price">${product.oldPrice}</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pagination">
          <div className="button left">
            <img src="./icons/left-pagin-arrow.svg" alt="arrow-left"/>
          </div>
          <div className="pages">
            <div className="page active">1</div>
            <div className="page">2</div>
            <div className="page">3</div>
          </div>
          <div className="button right">
            <img src="./icons/right-pagin-arrow.svg" alt="arrow-right"/>
          </div>
        </div>
      </div>
    </div>
  )
}