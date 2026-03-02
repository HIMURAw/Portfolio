import React, { useState } from "react";
import { Layout, Menu, Button, theme, Space, Typography, message } from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DashboardOutlined,
    ProjectOutlined,
    SafetyCertificateOutlined,
    MessageOutlined,
    BarChartOutlined,
    LogoutOutlined,
    GlobalOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, colorBgElevated, borderRadiusLG, colorPrimary, colorBgBase },
    } = theme.useToken();
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        message.success("Başarıyla çıkış yapıldı.");
        navigate("/admin/login");
    };

    const menuItems = [
        {
            key: "/admin",
            icon: <DashboardOutlined />,
            label: "Dashboard",
        },
        {
            key: "/admin/projects",
            icon: <ProjectOutlined />,
            label: "Projeler",
        },
        {
            key: "/admin/certificates",
            icon: <SafetyCertificateOutlined />,
            label: "Sertifikalar",
        },
        {
            key: "/admin/messages",
            icon: <MessageOutlined />,
            label: "Mesajlar",
        },
        {
            key: "/admin/analytics",
            icon: <BarChartOutlined />,
            label: "Analytics",
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh", background: "#0b0f19" }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="dark"
                width={260}
                style={{
                    boxShadow: "4px 0 10px rgba(0,0,0,0.3)",
                    zIndex: 100,
                    background: "#0f172a"
                }}
            >
                <div
                    style={{
                        height: 64,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 16px",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        background: "linear-gradient(45deg, #4f46e5, #6366f1)",
                        margin: "12px",
                        borderRadius: "8px",
                        color: "white",
                        fontWeight: "bold",
                        overflow: "hidden"
                    }}
                >
                    {collapsed ? "AP" : "PORTFOLIO ADMIN"}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={({ key }) => navigate(key)}
                    style={{
                        background: "transparent",
                        padding: "8px",
                        border: "none",
                        marginTop: "16px"
                    }}
                />
            </Sider>
            <Layout style={{ background: "transparent" }}>
                <Header
                    style={{
                        padding: "0 24px",
                        background: "rgba(30, 41, 59, 0.7)",
                        backdropFilter: "blur(12px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        position: "sticky",
                        top: 0,
                        zIndex: 99,
                        height: 64,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "18px",
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white"
                        }}
                    />
                    <Space size="large">
                        <Button
                            type="text"
                            icon={<GlobalOutlined />}
                            onClick={() => navigate("/")}
                            style={{ color: "rgba(255,255,255,0.65)" }}
                        >
                            Siteye Git
                        </Button>
                        <Button
                            type="primary"
                            danger
                            icon={<LogoutOutlined />}
                            onClick={handleLogout}
                            style={{
                                borderRadius: "6px",
                                boxShadow: "0 4px 10px rgba(239, 68, 68, 0.2)"
                            }}
                        >
                            Çıkış
                        </Button>
                    </Space>
                </Header>
                <Content
                    style={{
                        margin: "24px",
                        padding: 32,
                        minHeight: 280,
                        background: "rgba(30, 41, 59, 0.4)",
                        borderRadius: borderRadiusLG,
                        border: "1px solid rgba(255,255,255,0.05)",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;

