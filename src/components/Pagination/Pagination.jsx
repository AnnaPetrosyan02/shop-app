import { leftPaginArrow, rightPaginArrow } from "../../assets/icons";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

	const handlePrev = () => {
		if (currentPage > 1) onPageChange(currentPage - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) onPageChange(currentPage + 1);
	};

	return (
		<div className="pagination">
			<div 
				className={`button left ${currentPage === 1 ? "disabled" : ""}`} 
				onClick={handlePrev}
				style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: "pointer" }}
			>
				<img src={leftPaginArrow} alt="arrow-left" />
			</div>

			<div className="pages">
				{pageNumbers.map((page) => (
					<div
						key={page}
						className={`page ${currentPage === page ? "active" : ""}`}
						onClick={() => onPageChange(page)}
						style={{ cursor: "pointer" }}
					>
						{page}
					</div>
				))}
			</div>

			<div 
				className={`button right ${currentPage === totalPages ? "disabled" : ""}`} 
				onClick={handleNext}
				style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: "pointer" }}
			>
				<img src={rightPaginArrow} alt="arrow-right" />
			</div>
		</div>
	);
}