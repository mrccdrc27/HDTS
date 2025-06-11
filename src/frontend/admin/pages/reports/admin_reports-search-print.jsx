import './admin_reports-search-print.css';

const AdminReportsSearchPrint = () => {
  const handlePrintClick = () => {
    window.print();
  };

  return (
    <div className="reports-header">
      <button className="print-report-button" onClick={handlePrintClick}>
        Print Report
      </button>
    </div>
  );
};

export default AdminReportsSearchPrint;
