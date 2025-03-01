import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";

import ContactForm from "./pages/contact-us/Contact";
import FAQSection from "./pages/faq/Faq";
import Blog from "./pages/blog/Blog";
import BlogDetail from "./pages/blog/BlogDetails";
import LoginPage from "./pages/auth/login/Login";
import Phone from "./pages/auth/signup/Phone";
import Otp from "./pages/auth/signup/Otp";
import SignUp from "./pages/auth/signup/GoogleAuth";
import User from "./pages/User-Dashboard/UserLayout/User";
import Settings from "./pages/User-Dashboard/Settings/Settings";
import Message from "./pages/User-Dashboard/Chat/Message";
import Profile from "./pages/User-Dashboard/Settings/Myskillovia/Profile/Profile";
import KYCPage from "./pages/User-Dashboard/Settings/Myskillovia/Kyc/Kyc";
import Identification from "./pages/User-Dashboard/Settings/Myskillovia/Kyc/Identification";
import UtilityBill from "./pages/User-Dashboard/Settings/Myskillovia/Kyc/UtilityBill";
import Payment from "./pages/User-Dashboard/Settings/General/PaymentSettings/Payment";
import LinkedDevices from "./pages/User-Dashboard/Settings/General/LinkedDevice";
import NotificationSettings from "./pages/User-Dashboard/Settings/General/NotificationSettings";
import Security from "./pages/User-Dashboard/Settings/General/Security/Security";
import Bookings from "./pages/User-Dashboard/Bookings/Booking";
import ExploreSection from "./pages/User-Dashboard/Explore/Explore";
import BookProfile from "./pages/User-Dashboard/Bookings/Book-A-Service/BookProfile";
import BookService from "./pages/User-Dashboard/Bookings/Book-A-Service/BookService";
import BookingForm from "./pages/User-Dashboard/Bookings/Book-A-Service/BookForm";
import OutwardDetails from "./pages/User-Dashboard/Bookings/Outward/OutwardDetails";
import OutwardProgress from "./pages/User-Dashboard/Bookings/Outward/OutwardProgress";
import InwardDetails from "./pages/User-Dashboard/Bookings/Inward/InwardDetails";
import Community from "./pages/User-Dashboard/Community/Community";
import MySkillsPage from "./pages/User-Dashboard/Settings/Myskillovia/MySkills/Myskill";
import SkillDetails from "./pages/User-Dashboard/Settings/Myskillovia/MySkills/SkillDetails";
import AddSkill from "./pages/User-Dashboard/Settings/Myskillovia/MySkills/AddSkill/AddSkill";
import ChatMobile from "./pages/User-Dashboard/Chat/MessageMobile/ChatMobile";
import ChatMobileDetails from "./pages/User-Dashboard/Chat/MessageMobile/ChatMobileDetails";
import PasswordReset from "./pages/User-Dashboard/Settings/General/Security/PasswordRest";
import ExploreList from "./pages/User-Dashboard/Explore/ExploreList";
import ProtectedRoute from "./Hooks/ProtectedRoutes";
import Search from "./pages/Search/Search";

import ExploreProfiles from "./pages/User-Dashboard/Explore/ExploreProfiles";
import AddBillingScreen from "./pages/User-Dashboard/Settings/General/PaymentSettings/Billing/AddBilling";
import AddWithdrawal from "./pages/User-Dashboard/Settings/General/PaymentSettings/Withdrawal/AddWithdrawal";
import WithdrawalManagement from "./pages/User-Dashboard/Settings/General/PaymentSettings/Withdrawal/WithdrawalManagment";
import BillingManagement from "./pages/User-Dashboard/Settings/General/PaymentSettings/Billing/BillingManagment";
import EditSkillPage from "./pages/User-Dashboard/Settings/Myskillovia/MySkills/EditSkill";
import PersonalDetails from "./pages/auth/signup/PersonalDetails";
import Success from "./componets/Success";
import Invite from "./pages/User-Dashboard/Settings/Myskillovia/MySkills/Invite/Invite";
import NearByDetails from "./pages/User-Dashboard/Explore/NearByDetails";
import Following from "./pages/Followers/Following";
import Followers from "./pages/Followers/Followers";
import ForgotPassword from "./pages/auth/ForgotPsw";
import ResetPassword from "./pages/auth/signup/ResetPsw";
import FailurePage from "./pages/Stripe/FailedPay";
import SuccessPage from "./pages/Stripe/SucessPay";
import CreateStripeAccount from "./pages/Stripe/CreateS";
// import BookingDetails from "./pages/User-Dashboard/Bookings/BookingDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  // {
  //   path: "/ex",
  //   element: <ExamplePage/>,
  // },

  {
    path: "/success",
    element: <Success/>,
  },


  {
    path: "/failure-pay",
    element: <FailurePage/>,
  },


  {
    path: "/success-pay",
    element: <SuccessPage/>,
  },


  {
    path: "/contact",
    element: <ContactForm/>,
  },
  {
    path: "/faqs",
    element: <FAQSection/>,
  },
  {
    path: "/blog",
    element: <Blog/>,
  },
  {
    path: "/blog-details",
    element: <BlogDetail/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/forgot-psw",
    element: <ForgotPassword/>,
  },


  {
    path: "/reset-psw",
    element: <ResetPassword/>,
  },

  {
    path: "/signup",
    element: <Phone/>,
  },
  {
    path: "/otp",
    element: <Otp/>,
  },
  
  {
    path: "/personal-details",
    element: <PersonalDetails/>,
  },
  

  {
    path: "/google-auth",
    element: <SignUp/>,
  },

  // Protected Routes
  {
    path: "/user",
    element: <ProtectedRoute><User/></ProtectedRoute>,
  },
  
  {
    path: "/explore",
    element:<ProtectedRoute><ExploreSection/></ProtectedRoute>,
  },
  {
    path: "/explore-list",
    element: <ProtectedRoute><ExploreList/></ProtectedRoute>,
  },


  {
    path: "/explore-profile",
    element: <ProtectedRoute><ExploreProfiles/></ProtectedRoute>,
  },

  {
    path: "/settings",
    element: <ProtectedRoute><Settings/></ProtectedRoute>,
  },
  {
    path: "/settings/profile",
    element: <ProtectedRoute><Profile/></ProtectedRoute>,
  },
  {
    path: "/settings/skills",
    element: <ProtectedRoute><MySkillsPage/></ProtectedRoute>,
  },
  {
    path: "/settings/skill/add",
    element: <ProtectedRoute><AddSkill/></ProtectedRoute>,
  },
  {
    path: "/settings/skills/:id",
    element: <ProtectedRoute><SkillDetails/></ProtectedRoute>,
  },

  {
    path: "/settings/skills/edit/:id",
    element: <ProtectedRoute><EditSkillPage/></ProtectedRoute>,
  },

  {
    path: "/settings/kyc",
    element: <ProtectedRoute><KYCPage/></ProtectedRoute>,
  },
  {
    path: "/settings/kyc/identification",
    element: <ProtectedRoute><Identification/></ProtectedRoute>,
  },
  {
    path: "/settings/kyc/bill",
    element: <ProtectedRoute><UtilityBill/></ProtectedRoute>,
  },
  {
    path: "/settings/payment",
    element: <ProtectedRoute><Payment/></ProtectedRoute>,
  },
  {
    path: "/settings/password",
    element: <ProtectedRoute><PasswordReset/></ProtectedRoute>,
  },
  {
    path: "/settings/devices",
    element: <ProtectedRoute><LinkedDevices/></ProtectedRoute>,
  },
  {
    path: "/settings/notify",
    element: <ProtectedRoute><NotificationSettings/></ProtectedRoute>,
  }, 
  
  {
    path: "settings/invite",
    element: <ProtectedRoute><Invite/></ProtectedRoute>,
  },
  {
    path: "/settings/security",
    element: <ProtectedRoute><Security/></ProtectedRoute>,
  },
  {
    path: "/messages",
    element: <ProtectedRoute><Message/></ProtectedRoute>,
  },
  {
    path: "/chat/:userId",
    element: <ProtectedRoute><ChatMobileDetails/></ProtectedRoute>,
  },
  {
    path: "/bookings",
    element: <ProtectedRoute><Bookings/></ProtectedRoute>,
  },
  {
    path: "/book-profile",
    element: <ProtectedRoute><BookProfile/></ProtectedRoute>,
  },
  {
    path: "/book-service",
    element: <ProtectedRoute><BookService/></ProtectedRoute>,
  },
  {
    path: "/book-form",
    element: <ProtectedRoute><BookingForm/></ProtectedRoute>,
  }, 
  
  // {
  //   path: "/bookings/:id",
  //   element: <ProtectedRoute><BookingDetails/></ProtectedRoute>,
  // },
  {
    path: "/outward-progress/:id",
    element: <ProtectedRoute><OutwardProgress/></ProtectedRoute>,
  },
  {
    path: "/outward-details/:id",
    element: <ProtectedRoute><OutwardDetails/></ProtectedRoute>,
  },
  {
    path: "/inward-details/:id",
    element: <ProtectedRoute><InwardDetails/></ProtectedRoute>,
  },
  {
    path: "/community",
    element: <ProtectedRoute><Community/></ProtectedRoute>,
  },


  {
    path: "/search",
    element: <ProtectedRoute><Search/></ProtectedRoute>,
  },


// stripe


{
  path: "/create-stripe-account",
  element: <ProtectedRoute><CreateStripeAccount/></ProtectedRoute>,
}, 


  // payment

  {
    path: "/add-bills",
    element: <ProtectedRoute><AddBillingScreen/></ProtectedRoute>,
  }, 

  {
    path: "/bills",
    element: <ProtectedRoute><BillingManagement/></ProtectedRoute>,
  },
  
  
  {
    path: "/add-withdrawal",
    element: <ProtectedRoute><AddWithdrawal/></ProtectedRoute>,
  },  
  
  
  {
    path: "/get-paid",
    element: <ProtectedRoute><WithdrawalManagement/></ProtectedRoute>,
  }, 


    
  {
    path:"/user-profile/:id",
    element: <ProtectedRoute><NearByDetails/></ProtectedRoute>,
  }, 

  {
    path:"/following",
    element: <ProtectedRoute><Following/></ProtectedRoute>,
  }, 

  {
    path:"/followers",
    element: <ProtectedRoute><Followers/></ProtectedRoute>,
  }, 

]);

export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
   
    </React.StrictMode>
  );
}