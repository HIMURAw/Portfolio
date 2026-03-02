import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Certificates from "./pages/Certificates";
import Messages from "./pages/Messages";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Ant Design v5 reset and theme could be applied here if needed
// For now, let's keep it simple

import { AuthProvider } from "./context/AuthContext";

const AdminApp = () => {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: "#6366f1", // Modern indigo
                    borderRadius: 8,
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                },
                components: {
                    Layout: {
                        siderBg: "#0f172a", // Very dark navy
                        headerBg: "#1e293b",
                    },
                },
            }}
        >
            <AuthProvider>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route
                        element={
                            <ProtectedRoute>
                                <AdminLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="certificates" element={<Certificates />} />
                        <Route path="messages" element={<Messages />} />
                        <Route path="analytics" element={<Analytics />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
            </AuthProvider>
        </ConfigProvider>
    );
};

export default AdminApp;
