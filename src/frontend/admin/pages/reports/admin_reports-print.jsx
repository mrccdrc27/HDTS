import './admin_reports-print.css';

const AdminReportsPrint = () => {
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

export default AdminReportsPrint;
