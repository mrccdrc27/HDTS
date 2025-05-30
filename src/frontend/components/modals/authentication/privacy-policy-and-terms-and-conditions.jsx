// Modal.js
import React, { useState, useEffect } from "react";
import "../../../styles/components/modals/authentication/privacy-policy-and-terms-and-conditions.css";

const PrivacyPolicyAndTermsAndConditions = ({ showModal, closeModal }) => {
  const [currentTab, setCurrentTab] = useState("privacy");

  // Always show Terms tab when modal opens
  useEffect(() => {
    if (showModal) {
      setCurrentTab("privacy");
    }
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className={`privacy-policy-and-terms-and-conditions-modal-overlay ${showModal ? 'show' : ''}`}>
      <div className="privacy-policy-and-terms-and-conditions-modal-content">
        {currentTab === "terms" && (
          <>
            <h2>Terms and Conditions</h2>
            <p>
              By accessing and using the SmartSupport: AI-Powered Helpdesk Ticketing System,
              you agree to comply with the following Terms and Conditions. Please read them carefully before submitting any support tickets.
            </p>

            <h3>1. Acceptance of Terms</h3>
            <p>
              By using this System, you acknowledge that you have read, understood, and agree to these Terms.
              If you do not accept any part of these terms, you must refrain from using the System.
            </p>

            <h3>2. Purpose of the System</h3>
            <p>
              This System is provided to help users (e.g., employees or authorized personnel)
              submit, track, and receive support for technical or administrative issues within the organization.
            </p>

            <h3>3. User Responsibilities</h3>
            <ul>
              <li>Provide accurate and complete information when submitting tickets.</li>
              <li>Use the System only for legitimate support requests.</li>
              <li>Avoid submitting duplicate, irrelevant, or fraudulent tickets.</li>
              <li>Respond to follow-up questions from support agents in a timely manner.</li>
              <li>Submit only appropriate and professional content.</li>
            </ul>

            <h3>4. Ticket Closure</h3>
            <ul>
              <li>Once a ticket is marked as resolved by the support team, you will no longer be able to send additional messages regarding that issue.</li>
              <li>If no action is taken by the user within the specified SLA timeline, the System will automatically close the ticket to maintain workflow efficiency and compliance with internal SLAs.</li>
              <li>Uncooperative behavior or lack of feedback may delay the closure of your ticket.</li>
            </ul>

            <h3>5. Account and Security</h3>
            <ul>
              <li>You are responsible for keeping your login credentials secure and confidential.</li>
              <li>Do not share your account with others or impersonate another user.</li>
              <li>Report any unauthorized access or suspicious activity to the system administrator immediately.</li>
            </ul>

            <h3>6. Prohibited Actions</h3>
            <ul>
              <li>You agree not to misuse the System or disrupt its normal operation.</li>
              <li>Do not upload or transmit harmful, offensive, or malicious content.</li>
              <li>Do not attempt to access restricted or administrative areas of the System.</li>
            </ul>

            <h3>7. Data Collection and Privacy</h3>
            <ul>
              <li>The System collects data such as your name, contact details, and ticket history to facilitate support.</li>
              <li>All data will be treated confidentially and used only for internal support purposes.</li>
              <li>Your data will not be shared externally without your consent, in compliance with applicable data privacy laws.</li>
            </ul>

            <h3>8. System Availability and Limitations</h3>
            <ul>
              <li>While we aim to maintain continuous service, the System may experience downtime or technical issues.</li>
              <li>We are not liable for any losses arising from unavailability, delays, or errors within the System.</li>
            </ul>

            <h3>9. Modifications to Terms</h3>
            <p>
              We reserve the right to update or revise these Terms at any time.
              Continued use of the System after such changes constitutes your acceptance of the updated Terms.
            </p>

            <h3>10. Contact Information</h3>
            <p>
              If you have questions regarding these Terms and Conditions, please contact the system administrator at:<br />
              <strong>SmartSupport operators</strong>
            </p>

            <div>
              <button onClick={() => setCurrentTab("privacy")} className="back-modal-btn">Back</button>
              <button onClick={closeModal} className="close-modal-btn">I Agree</button>
            </div>
          </>
        )}

        {currentTab === "privacy" && (
          <>
            <h2>Privacy Policy</h2>
            <p>
              This Privacy Policy outlines how the SmartSupport: AI-Powered Helpdesk Ticketing System collects, uses, stores, and protects the personal data of users who access and use the System.
            </p>

            <h3>1. Information We Collect</h3>
            <p>When you use the System, we may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, employee ID, email address, department, or other identifiers.</li>
              <li><strong>Ticket Information:</strong> The content of your submitted tickets, including descriptions of issues, attachments, and time of submission.</li>
              <li><strong>Usage Data:</strong> Logs such as login timestamps, device/browser information, and activity within the System.</li>
            </ul>

            <h3>2. How We Use Your Information</h3>
            <p>We use your data for the following purposes:</p>
            <ul>
              <li>To process and respond to your support requests.</li>
              <li>To track and manage the status of tickets.</li>
              <li>To generate internal reports for service improvement.</li>
              <li>To notify you about the progress or resolution of your submitted tickets.</li>
              <li>To improve user experience and system functionality.</li>
            </ul>

            <h3>3. Data Sharing and Disclosure</h3>
            <p>
              We do <strong>not</strong> sell or share your personal data with external third parties. However, your data may be accessed by:
            </p>
            <ul>
              <li>Authorized support personnel (e.g., ticket agents, system administrators) for the purpose of resolving your tickets.</li>
              <li>Internal management for service reporting or audits.</li>
            </ul>
            <p>We may disclose your data when legally required (e.g., in response to a court order or legal investigation).</p>

            <h3>4. Data Retention</h3>
            <p>
              We retain your personal and ticket data only for as long as necessary to fulfill the purposes described above, or as required by organizational policies.
            </p>

            <h3>5. Your Rights</h3>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data stored in the system.</li>
              <li>Request correction of inaccurate or outdated information.</li>
              <li>Request deletion of your data, subject to retention policies.</li>
              <li>Withdraw consent where applicable, which may affect your ability to use the System.</li>
            </ul>
            <p>To exercise any of these rights, please contact the system administrator at SmartSupport operators.</p>

            <h3>6. Data Security</h3>
            <p>We implement appropriate technical and organizational measures to:</p>
            <ul>
              <li>Protect your personal information against unauthorized access, alteration, or disclosure.</li>
              <li>Secure user accounts through authentication and access control.</li>
              <li>Regularly monitor system activity for suspicious behavior.</li>
            </ul>
            <p>However, no system is 100% secure, and you are also responsible for protecting your login credentials.</p>

            <h3>7. Cookies and Tracking Technologies</h3>
            <p>
              The System may use cookies or session-based tracking for authentication and performance analytics. You can manage cookie settings in your browser.
            </p>

            <h3>8. Updates to this Privacy Policy</h3>
            <p>
              We may update this policy from time to time. You will be notified of any significant changes, and continued use of the System after updates constitutes acceptance of the revised policy.
            </p>

            <h3>9. Contact Us</h3>
            <p>
              If you have any questions or concerns regarding this Privacy Policy, please contact: SmartSupport operators
            </p>

            <div>
              <button onClick={() => setCurrentTab("terms")} className="next-modal-btn">I Agree</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicyAndTermsAndConditions;