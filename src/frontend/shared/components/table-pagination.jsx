import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './table-pagination.css';

const TablePagination = ({
  totalItems,
  initialItemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  currentPage: controlledCurrentPage,
}) => {
  const [currentPage, setCurrentPage] = useState(controlledCurrentPage || 1);
  const [inputPage, setInputPage] = useState(String(controlledCurrentPage || 1));
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  useEffect(() => {
    if (controlledCurrentPage !== undefined) {
      setCurrentPage(controlledCurrentPage);
      setInputPage(String(controlledCurrentPage));
    }
  }, [controlledCurrentPage]);

  const changePage = (page) => {
    const clampedPage = Math.min(Math.max(page, 1), totalPages);
    if (clampedPage !== currentPage) {
      if (onPageChange) {
        onPageChange(clampedPage);
      }
      if (controlledCurrentPage === undefined) {
        setCurrentPage(clampedPage);
        setInputPage(String(clampedPage));
      }
    } else {
      setInputPage(String(currentPage));
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val === '') {
      setInputPage('');
      return;
    }
    if (/^\d+$/.test(val)) {
      setInputPage(val);
    }
  };

  const handleInputBlur = () => {
    if (inputPage === '') {
      setInputPage(String(currentPage));
      return;
    }
    const numVal = parseInt(inputPage, 10);
    if (isNaN(numVal) || numVal < 1 || numVal > totalPages) {
      setInputPage(String(currentPage));
    } else {
      changePage(numVal);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  const handleItemsPerPageChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) value = initialItemsPerPage;

    if (onItemsPerPageChange) {
      onItemsPerPageChange(value);
    }

    if (controlledCurrentPage === undefined) {
      setCurrentPage(1);
      setInputPage('1');
    }

    setItemsPerPage(value);
  };

  return (
    <div className="table-controls-row">
      <div className="items-per-page">
        <label htmlFor="itemsPerPageInput">Show </label>
        <input
          type="number"
          id="itemsPerPageInput"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          min="1"
          max="100"
        />
        <span> items per page</span>
      </div>

      <div className="pagination-wrapper">
        <div className="pagination-controls">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="nav-btn"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="page-info" style={{ userSelect: 'none' }}>
            Page&nbsp;
            <span className="page-jump">
              <input
                type="text"
                value={inputPage}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
                aria-label="Current page"
              />
              <span>of {totalPages}</span>
            </span>
          </span>

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="nav-btn"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
