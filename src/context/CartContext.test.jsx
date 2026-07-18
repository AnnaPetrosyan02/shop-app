import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe("CartContext Бизнес-Логика", () => {
    it("должен корректно рассчитывать общую стоимость при добавлении товаров", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        const product1 = { id: 1, name: "Retro style handbag", price: 35.99 };
        const product2 = { id: 2, name: "Warm casual sweater", price: 52.00 };

        act(() => {
            result.current.addToCart(product1);
        });

        expect(result.current.getCartTotal()).toBe(35.99);

        act(() => {
            result.current.addToCart(product1);
        });
        expect(result.current.getCartTotal()).toBe(35.99 * 2);

        act(() => {
            result.current.addToCart(product2);
        });
        expect(result.current.getCartTotal()).toBe((35.99 * 2) + 52.00);
    });
});