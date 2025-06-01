import React, { useEffect, useRef, useState } from "react";
import "./user_ticket-details-progress-bar.css";

const UserTicketProgress = () => {
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    function checkOverflow() {
      if (!wrapperRef.current || !cardRef.current) return;
      setIsOverflowing(cardRef.current.scrollWidth > wrapperRef.current.clientWidth);
    }

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  const sampleSteps = [
    { label: "Submitted", icon: "📄", className: "step-icon-green" },
    { label: "Approved", icon: "✔", className: "step-icon-green" },
    { label: "Processing", icon: "⚙", className: "step-icon-dark-red" },
    { label: "Pending", icon: "⏳", className: "step-icon-red" },
    { label: "Rejected", icon: "❌", className: "step-icon-red" },
    { label: "Completed", icon: "✅", className: "step-icon-red" },
    { label: "Escalated", icon: "🚨", className: "step-icon-red" },
    { label: "On Hold", icon: "🛑", className: "step-icon-red" },
    { label: "In Review", icon: "🔍", className: "step-icon-dark-red" },
    { label: "Clarification", icon: "❓", className: "step-icon-red" },
    { label: "Follow-up", icon: "📞", className: "step-icon-red" },
    { label: "Verified", icon: "🔒", className: "step-icon-green" },
    { label: "Resolved", icon: "🟢", className: "step-icon-green" },
    { label: "Reopened", icon: "🔁", className: "step-icon-dark-red" },
    { label: "Closed", icon: "📁", className: "step-icon-red" },
  ];

  return (
    <div
      ref={wrapperRef}
      className={`progress-scroll-wrapper ${
        isOverflowing ? "progress-scroll-enabled" : "progress-scroll-disabled"
      }`}
    >
      <div className="progress-card" ref={cardRef}>
        <div className="progress-line">
          <div className="progress-fill-green"></div>
          <div className="progress-fill-red"></div>
        </div>

        {sampleSteps.map((step, index) => (
          <div className="step" key={index}>
            <div className={`step-icon ${step.className}`}>{step.icon}</div>
            <span className="step-label step-label-inactive">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTicketProgress;
