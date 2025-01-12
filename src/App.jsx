import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import ExamplePage from "./componets/Example";
import ContactForm from "./pages/contact-us/Contact";
import FAQSection from "./pages/faq/Faq";
import Blog from "./pages/blog/Blog";
import BlogDetail from "./pages/blog/BlogDetails";
import LoginPage from "./pages/auth/login/Login";
import Phone from "./pages/auth/signup/Phone";
import Otp from "./pages/auth/signup/Otp";
import SignUp from "./pages/auth/signup/S";
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











const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
 

  {
    path: "/ex",
    element: <ExamplePage/>,
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
//  ===== auth ======= //

{
  path: "/login",
  element: <LoginPage/>,
},


{
  path: "/signup",
  element: <Phone/>,
},


{
  path: "/s",
  element: <SignUp/>,
},


{
  path: "/otp",
  element: <Otp/>,
},


//  ===== auth ======= //




//  ===== user ======= //

{
  path: "/user",
  element: <User/>,
},

// ====explore====

{
  path: "/explore",
  element: <ExploreSection/>,
},

{
  path: "/explore-list",
  element: <ExploreList/>,
},


//  ===== settings======= //
{
  path: "/settings",
  element: <Settings/>,
},

{
  path: "/settings/profile",
  element: <Profile/>,
},


{
  path: "/settings/skills",
  element: <MySkillsPage/>,
},

{
  path: "/settings/skill/add",
  element: <AddSkill/>,
},

{
  path: "/settings/skills-details",
  element: <SkillDetails/>,
},

{
  path: "/settings/kyc",
  element: <KYCPage/>,
},

{
  path: "/settings/kyc/identification",
  element: <Identification/>,
},

{
  path: "/settings/kyc/bill",
  element: <UtilityBill/>,
},

{
  path: "/settings/payment",
  element: <Payment/>,
},

{
  path: "/settings/password",
  element: <PasswordReset/>,
},

{
  path: "/settings/devices",
  element: <LinkedDevices/>,
},

{
  path: "/settings/notify",
  element: <NotificationSettings/>,
},

{
  path: "/settings/security",
  element: <Security/>,
},

// ====chat ===

{
  path: "/messages",
  element: <Message/>,
},


{
  path: "/messages",
  element: <ChatMobile/>,
},

{
  path: "/chat-details",
  element: <ChatMobileDetails/>,
},

// bookings ===

{
  path: "/bookings",
  element: <Bookings/>,
},

{
  path: "/book-profile",
  element: <BookProfile/>,
},


{
  path: "/book-service",
  element: <BookService/>,
},

{
  path: "/book-form",
  element: <BookingForm/>,
},

{
  path: "/outward-progress",
  element: <OutwardProgress/>,
},

{
  path: "/outward-details",
  element: <OutwardDetails/>,
},

{
  path: "/inward-details",
  element: <InwardDetails/>,
},

// ====community
{
  path: "/community",
  element: <Community/>,
},
]);



export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}