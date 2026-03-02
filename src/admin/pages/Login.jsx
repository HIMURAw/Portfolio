import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Typography, message, Space } from "antd";
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Title, Text } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [lockout, setLockout] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const navigate = useNavigate();
    const { login } = useAuth();

    // Environment variables (Fallback for demo)
    const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || "admin";
    const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || "admin";

    useEffect(() => {
        let timer;
        if (lockout && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setLockout(false);
            setAttempts(0);
        }
        return () => clearInterval(timer);
    }, [lockout, timeLeft]);

    const onFinish = async (values) => {
        if (lockout) {
            message.error(`Çok fazla hatalı deneme. Lütfen ${timeLeft} saniye bekleyin.`);
            return;
        }

        setLoading(true);

        // Mock network delay for security and UX
        setTimeout(() => {
            setLoading(false);
            const { username, password } = values;

            if (username === ADMIN_USER && password === ADMIN_PASS) {
                message.success("Başarıyla giriş yapıldı!");
                login();
                navigate("/admin/dashboard");
            } else {
                const newAttempts = attempts + 1;
                setAttempts(newAttempts);

                if (newAttempts >= 3) {
                    setLockout(true);
                    setTimeLeft(30);
                    message.error("Çok fazla hatalı deneme! 30 saniye kilitlendiniz.");
                } else {
                    message.error(`Hatalı kullanıcı adı veya şifre! (Kalan hak: ${3 - newAttempts})`);
                }
            }
        }, 1000);
    };

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "radial-gradient(circle at top left, #1e293b, #0f172a)",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Animated background elements */}
            <div style={{
                position: "absolute",
                width: "400px",
                height: "400px",
                background: "rgba(99, 102, 241, 0.15)",
                borderRadius: "50%",
                top: "-100px",
                right: "-100px",
                filter: "blur(80px)",
                animation: "float 20s infinite alternate"
            }} />
            <div style={{
                position: "absolute",
                width: "300px",
                height: "300px",
                background: "rgba(236, 72, 153, 0.1)",
                borderRadius: "50%",
                bottom: "-50px",
                left: "-50px",
                filter: "blur(60px)",
                animation: "float 15s infinite alternate-reverse"
            }} />

            <Card
                style={{
                    width: 400,
                    borderRadius: 24,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    background: "rgba(30, 41, 59, 0.7)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                }}
            >
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div style={{
                        display: "inline-flex",
                        padding: 16,
                        borderRadius: 20,
                        background: "rgba(99, 102, 241, 0.1)",
                        color: "#6366f1",
                        marginBottom: 16
                    }}>
                        <SafetyCertificateOutlined style={{ fontSize: 32 }} />
                    </div>
                    <Title level={2} style={{ margin: 0, fontWeight: 800 }}>Hoş Geldiniz</Title>
                    <Text style={{ color: "rgba(255, 255, 255, 0.45)" }}>Yönetim paneline güvenli giriş yapın</Text>
                </div>
                <Form
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: "Lütfen kullanıcı adınızı girin!" }]}
                    >
                        <Input
                            prefix={<UserOutlined style={{ color: "rgba(255,255,255,0.25)" }} />}
                            placeholder="Kullanıcı Adı"
                            disabled={lockout}
                            style={{ borderRadius: 12, background: "rgba(15, 23, 42, 0.5)", border: "none" }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Lütfen şifrenizi girin!" }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined style={{ color: "rgba(255,255,255,0.25)" }} />}
                            placeholder="Şifre"
                            disabled={lockout}
                            style={{ borderRadius: 12, background: "rgba(15, 23, 42, 0.5)", border: "none" }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                            disabled={lockout}
                            style={{
                                height: 50,
                                borderRadius: 12,
                                fontWeight: 700,
                                background: lockout ? "rgba(255,255,255,0.05)" : "linear-gradient(to right, #6366f1, #8b5cf6)",
                                border: "none",
                                marginTop: 8
                            }}
                        >
                            {lockout ? `Tekrar Dene (${timeLeft}s)` : "Giriş Yap"}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <style>{`
        @keyframes float {
          from { transform: translate(0, 0); }
          to { transform: translate(20px, 40px); }
        }
      `}</style>
        </div>
    );
};

export default Login;

