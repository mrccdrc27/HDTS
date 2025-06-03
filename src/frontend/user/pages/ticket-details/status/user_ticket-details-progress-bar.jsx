import React, { useEffect, useRef, useState, useMemo } from "react";
import { getTicketByNumber } from "../../../../../utilities/storage/ticketStorage.js";
import "./user_ticket-details-progress-bar.css";

const UserTicketProgress = ({ ticketNumber }) => {
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    if (ticketNumber) {
      const data = getTicketByNumber(ticketNumber);
      setTicket(data);
    }
  }, [ticketNumber]);

  useEffect(() => {
    function checkOverflow() {
      if (!wrapperRef.current || !cardRef.current) return;
      setIsOverflowing(cardRef.current.scrollWidth > wrapperRef.current.clientWidth);
    }

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  if (!ticket) return <div>Loading progress...</div>;

  const stepOrder = [
    "Submitted",
    "Under Review",
    "In Progress",
    "Awaiting Info",
    "Completed",
    "Closed",
  ];

  const currentIndex = stepOrder.indexOf(ticket.status);
  // If status not found, default to 0 (Submitted)
  const safeCurrentIndex = currentIndex === -1 ? 0 : currentIndex;

  const progressSteps = stepOrder.map((label, idx) => ({
    label,
    icon: {
      Submitted: "📝",
      "Under Review": "🔍",
      "In Progress": "⚙️",
      "Awaiting Info": "⏳",
      Completed: "✅",
      Closed: "📁",
    }[label],
    status:
      idx < safeCurrentIndex
        ? "completed"
        : idx === safeCurrentIndex
        ? "current"
        : "pending",
  }));

  const calculateProgress = useMemo(() => {
    const completedSteps = progressSteps.filter(step => step.status === "completed").length;
    const currentStepProgress = progressSteps.some(step => step.status === "current") ? 0.5 : 0;
    return ((completedSteps + currentStepProgress) / progressSteps.length) * 100;
  }, [progressSteps]);

  return (
    <div className="progress-container">
      <div className="progress-header">
        <h3 className="progress-title">Ticket Progress</h3>
      </div>

      <div
        ref={wrapperRef}
        className={`progress-scroll-wrapper ${
          isOverflowing ? "progress-scroll-enabled" : "progress-scroll-disabled"
        }`}
      >
        <div className="progress-card" ref={cardRef}>
          <div className="progress-line">
            <div
              className="progress-fill"
              style={{ width: `${calculateProgress}%` }}
            />
          </div>

          {progressSteps.map((step, index) => (
            <div
              className={`step step-${step.status}`}
              key={index}
              role="listitem"
              aria-label={`Step ${index + 1}: ${step.label}`}
            >
              <div className={`step-icon step-icon-${step.status}`}>
                {step.icon}
                {step.status === "current" && <div className="current-indicator" />}
              </div>
              <span className={`step-label step-label-${step.status}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="progress-legend">
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-dot legend-dot-completed" />
            <span>Completed</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot legend-dot-current" />
            <span>Current</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot legend-dot-pending" />
            <span>Pending</span>
          </div>
        </div>
        <div className="progress-percentage">
          {Math.round(calculateProgress)}% Complete
        </div>
      </div>
    </div>
  );
};

export default UserTicketProgress;
