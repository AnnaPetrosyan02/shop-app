import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { useShop } from "../../context/ShopContext";

// Мокаем сам хук useShop
vi.mock("../../context/ShopContext", () => ({
    useShop: vi.fn()
}));

describe("Sidebar Компонент Фильтров", () => {
    it("должен корректно передавать выбранные фильтры при нажатии на Apply Filter", () => {
        const setAppliedFiltersMock = vi.fn();

        // Задаем поведение для нашего мока хука
        useShop.mockReturnValue({
            searchQuery: "",
            setSearchQuery: vi.fn(),
            setAppliedFilters: setAppliedFiltersMock
        });

        render(<Sidebar />);

        // 1. Кликаем на категорию "Men"
        const categoryItem = screen.getByText("Men");
        fireEvent.click(categoryItem);

        // 2. Находим числовые инпуты цен по их типу type="number"
        const priceInputs = screen.getAllByRole("spinbutton"); // В Testing Library инпуты type="number" имеют роль spinbutton
        const minPriceInput = priceInputs[0];
        const maxPriceInput = priceInputs[1];
        
        fireEvent.change(minPriceInput, { target: { value: "35" } });
        fireEvent.change(maxPriceInput, { target: { value: "45" } });

        // 3. Кликаем Apply Filter
        const applyButton = screen.getByRole("button", { name: /apply filter/i });
        fireEvent.click(applyButton);

        // Проверяем результат
        expect(setAppliedFiltersMock).toHaveBeenCalledWith({
            category: "Men",
            priceRange: [35, 45],
            colors: []
        });
    });
});