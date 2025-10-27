import type { JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";

// Pages
import LandingPage from "../pages/landing/landing";
import SignIn from "../pages/auth/signin/signin";
import SignUp from "../pages/auth/signup/signup";
// import Dashboard from "../pages/dashboard/dashboard";
import Cookies from "js-cookie";
import EmailVerification from "../pages/emailverification/emailverification";
import ForgetPassword from "../pages/auth/forgetPassword/forgetPassword";
import ResetPassword from "../pages/auth/resetPassword/resetPassword";
import Chatbots from "../pages/chatbots/chatbots";

interface RouteWrapperProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<RouteWrapperProps> = ({ children }) => {
    const token = Cookies.get('authToken')
    return token ? children : <Navigate to="/auth/signin" replace />;
};

const PublicRoute: React.FC<RouteWrapperProps> = ({ children }) => {
    const token = Cookies.get('authToken')
    return !token ? children : <Navigate to="/dashboard" replace />;
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={
                <PublicRoute>
                    <LandingPage />
                </PublicRoute>
            } />
            <Route
                path="/auth/signin"
                element={
                    <PublicRoute>
                        <SignIn />
                    </PublicRoute>
                }
            />
            <Route
                path="/auth/signup"
                element={
                    <PublicRoute>
                        <SignUp />
                    </PublicRoute>
                }
            />

            <Route
                path="/auth/forget-password"
                element={
                    <PublicRoute>
                        <ForgetPassword />
                    </PublicRoute>
                }
            />

            <Route
                path="/auth/reset-password/:token"
                element={
                    <PublicRoute>
                        <ResetPassword />
                    </PublicRoute>
                }
            />

            {/* Shared Routes */}

            <Route path="/verify-email/:token" element={<EmailVerification />} />

            {/* Protected Routes */}
            {/* <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            /> */}
            <Route
                path="/chatbots"
                element={
                    <ProtectedRoute>
                        <Chatbots />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <>
                            {""}
                        </>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <>
                            {""}
                        </>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/support"
                element={
                    <ProtectedRoute>
                        <>
                            {""}
                        </>
                    </ProtectedRoute>
                }
            />

            {/* Fallback */}
            <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
    );
};

export default AppRoutes;
