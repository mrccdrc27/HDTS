// import { Routes, Route, useLocation } from 'react-router-dom';
// import { useEffect } from 'react';

// import LoginPortal from './frontend/pages/authentication/login-portal.jsx';
// import UserLogin from './frontend/pages/authentication/user/user_login.jsx';
// import AdminLogin from './frontend/pages/authentication/admin/admin_login.jsx';
// import CreateAccount from './frontend/pages/authentication/user/user_create-account.jsx';
// import ForgotPassword from './frontend/pages/authentication/user/user_forgot-password.jsx';

// import UserLayout from './frontend/user/layouts/pages/user_layout.jsx';
// import UserHome from './frontend/user/pages/home/user_home.jsx';
// import FrequentlyAskedQuestions from './frontend/user/pages/faqs/user_faqs.jsx';
// import RequestTicket from './frontend/user/pages/request-ticket/user_request-ticket.jsx';
// import TicketDetailsLayout from './frontend/user/layouts/user_ticket-details-layout.jsx';
// import ActiveTickets from './frontend/user/pages/active-tickets/user_active-tickets-main.jsx';
// import TicketRecords from './frontend/user/pages/ticket-records/user_ticket-records-main.jsx';

// import UserModalLayout from './frontend/user/layouts/modals/user_modal-layout.jsx';
// import UserProfile from './frontend/user/components/modals/profile-management/user_profile.jsx';
// import UserChangePassword from './frontend/user/components/modals/profile-management/user_change-password.jsx';

// import AdminLayout from './frontend/admin/layouts/admin_layout.jsx';
// import AdminDashboard from './frontend/admin/pages/dashboard/admin_dashboard.jsx';
// import RegisterUser from './frontend/admin/pages/register-user/admin_user-access-register-user.jsx';
// import AdminSubmittedTicketReview from './frontend/admin/pages/admin_submitted-ticket-review.jsx';
// import TicketManagement from './frontend/admin/pages/ticket-management/admin_ticket-management-main.jsx';

// import NotFound from './frontend/pages/others/404-not-found.jsx';

// const App = () => {
//   const location = useLocation();
//   const state = location.state;
//   const backgroundLocation = state?.backgroundLocation || null;

//   useEffect(() => {
//     console.log('Navigated to:', location.pathname);
//   }, [location]);

//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<LoginPortal />} />
//         <Route path="/login/employee" element={<UserLogin />} />
//         <Route path="/create-account" element={<CreateAccount />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/login/admin" element={<AdminLogin />} />
//       </Routes>
        
//       {/* <Routes location={backgroundLocation || location}> */}
//         {/* DEFAULT ROUTE */}
        

//         {/* USER ROUTES */}
//         {/* <Route path="/user" element={<UserLayout />}>
//           <Route path="home" element={<UserHome />} />
//           <Route path="frequently-asked-questions" element={<FrequentlyAskedQuestions />} />
//           <Route path="request-ticket" element={<RequestTicket />} />
//           <Route path="ticket-details/:ticketNumber" element={<TicketDetailsLayout />} />
//           <Route path="active-tickets" element={<ActiveTickets />} />
//           <Route path="ticket-records" element={<TicketRecords />} />
//         </Route> */}

//         {/* ADMIN ROUTES */}
//         {/* <Route path="/admin" element={<AdminLayout />}>
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="user-access-register-user" element={<RegisterUser />} />
//           <Route path="submitted-ticket-review/:ticketNumber" element={<AdminSubmittedTicketReview />} />
//           <Route path="ticket-review/:ticketNumber" element={<TicketDetailsLayout />} />
//           <Route path="ticket-management" element={<TicketManagement />} />
//         </Route> */}

//         {/* 404 FALLBACK */}
//         {/* <Route path="*" element={<NotFound />} />
//       </Routes> */}

//       {/* MODAL ROUTES — rendered separately if backgroundLocation exists */}
//       {/* {backgroundLocation && (
//         <Routes>
//           <Route element={<UserModalLayout />}>
//             <Route path="/profile" element={<UserProfile />} />
//             <Route path="/profile/change-password" element={<UserChangePassword />} />
//           </Route>
//         </Routes>
//       )} */}
//     </>
//   );
// };

// export default App;
