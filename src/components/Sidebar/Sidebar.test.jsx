import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { useShop } from "../../context/ShopContext";

vi.mock("../../context/ShopContext", () => ({
    useShop: vi.fn()
}));

describe("Sidebar Компонент Фильтров", () => {
    it("должен корректно передавать выбранные фильтры при нажатии на Apply Filter", () => {
        const setAppliedFiltersMock = vi.fn();

        useShop.mockReturnValue({
            searchQuery: "",
            setSearchQuery: vi.fn(),
            setAppliedFilters: setAppliedFiltersMock
        });

        render(<Sidebar />);

        const categoryItem = screen.getByText("Men");
        fireEvent.click(categoryItem);

        const priceInputs = screen.getAllByRole("spinbutton");
        const minPriceInput = priceInputs[0];
        const maxPriceInput = priceInputs[1];
        
        fireEvent.change(minPriceInput, { target: { value: "35" } });
        fireEvent.change(maxPriceInput, { target: { value: "45" } });

        const applyButton = screen.getByRole("button", { name: /apply filter/i });
        fireEvent.click(applyButton);

        expect(setAppliedFiltersMock).toHaveBeenCalledWith({
            category: "Men",
            priceRange: [35, 45],
            colors: []
        });
    });
});