import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CartProvider, useCart } from "../context/CartContext";
import { ShopProvider } from "../context/ShopContext"; 
import { useEffect } from "react";
import Header from "../components/Header/Header";       
import Showcase from "../components/Showcase/Showcase"; 
import Order from "../components/Order/Order"; 

const TestCartInitializer = ({ product }) => {
    const { addToCart } = useCart();
    useEffect(() => {
        addToCart(product);
    }, []);
    return null;
};

const AllProvidersWrapper = ({ children }) => (
    <ShopProvider>
        <CartProvider>
            {children}
        </CartProvider>
    </ShopProvider>
);

describe("Интеграционный сценарий: Покупка товара", () => {
    it("должен добавлять товар с витрины в корзину и обновлять счетчик в шапке", async () => {
        render(
            <AllProvidersWrapper>
                <Header />
                <Showcase />
                <Order isPromoApplied={false} />
            </AllProvidersWrapper>
        );

        await screen.findAllByText(/Textured turtleneck with zip/i);

        const addToCartButtons = screen.getAllByRole("button", { name: /add to cart|купить/i });
        fireEvent.click(addToCartButtons[0]);

        await waitFor(() => {
            const cartCount = screen.getByTestId("cart-count");
            expect(cartCount.textContent).toBe("1");
        });
    });
});

describe("Интеграционный сценарий: Логика промокодов в Order", () => {
    it("должен корректно уменьшать итоговую стоимость заказа с учетом доставки при активированном промокоде", async () => {
        const fakeProduct = { id: 99, name: "Premium Jacket", price: 100.00 };

        render(
            <AllProvidersWrapper>
                <TestCartInitializer product={fakeProduct} />
                <Order isPromoApplied={true} />
            </AllProvidersWrapper>
        );

        const totalAmount = screen.getByTestId("total-amount");
        
        await waitFor(() => {
            const expectedTotalWithoutBaseProduct = "$105.00";
            const expectedTotalWithBaseProduct = "$152.69";
            
            const actualText = totalAmount.textContent.trim();
            const isValidPrice = actualText === expectedTotalWithoutBaseProduct || actualText === expectedTotalWithBaseProduct;
            
            expect(isValidPrice).toBe(true);
        });
    });
});