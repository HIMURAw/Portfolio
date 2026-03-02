import React, { useState, useEffect } from "react";
import { Row, Col, Card, Statistic, List, Typography, Divider, theme, Button, Progress } from "antd";
import {
    ProjectOutlined,
    SafetyCertificateOutlined,
    MessageOutlined,
    UserOutlined,
    RiseOutlined,
} from "@ant-design/icons";
import { dataService } from "../data/dataService";

const { Title, Text } = Typography;


const Dashboard = () => {
    const { token } = theme.useToken();
    const [stats, setStats] = useState({
        projects: 0,
        certificates: 0,
        unreadMessages: 0,
        visitors: 0,
        recentMessages: []
    });

    useEffect(() => {
        const projects = dataService.getProjects();
        const certificates = dataService.getCertificates();
        const messages = dataService.getMessages();
        const analytics = dataService.getAnalytics();

        setStats({
            projects: projects.length,
            certificates: certificates.length,
            unreadMessages: messages.filter(m => !m.read).length,
            visitors: analytics.totalVisitors,
            recentMessages: messages.slice(0, 5)
        });
    }, []);

    const cardStyle = {
        background: "rgba(30, 41, 59, 0.4)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 12,
    };

    return (
        <div>
            <div style={{ marginBottom: 32 }}>
                <Title level={2} style={{ margin: 0, fontWeight: 700 }}>Genel Bakış</Title>
                <Text style={{ color: "rgba(255,255,255,0.45)" }}>Sistemdeki son durum ve istatistikler</Text>
            </div>

            <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={cardStyle}>
                        <Statistic
                            title={<Text style={{ color: "rgba(255,255,255,0.45)" }}>Toplam Proje</Text>}
                            value={stats.projects}
                            prefix={<ProjectOutlined style={{ color: token.colorPrimary }} />}
                            valueStyle={{ color: "white", fontWeight: 700 }}
                        />
                        <div style={{ marginTop: 8 }}>
                            <Tag color="success" icon={<RiseOutlined />}>Güncel</Tag>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={cardStyle}>
                        <Statistic
                            title={<Text style={{ color: "rgba(255,255,255,0.45)" }}>Sertifikalar</Text>}
                            value={stats.certificates}
                            prefix={<SafetyCertificateOutlined style={{ color: "#ef4444" }} />}
                            valueStyle={{ color: "white", fontWeight: 700 }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={cardStyle}>
                        <Statistic
                            title={<Text style={{ color: "rgba(255,255,255,0.45)" }}>Okunmamış Mesajlar</Text>}
                            value={stats.unreadMessages}
                            prefix={<MessageOutlined style={{ color: "#10b981" }} />}
                            valueStyle={{ color: "white", fontWeight: 700 }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={cardStyle}>
                        <Statistic
                            title={<Text style={{ color: "rgba(255,255,255,0.45)" }}>Toplam Ziyaretçi</Text>}
                            value={stats.visitors}
                            prefix={<UserOutlined style={{ color: "#f59e0b" }} />}
                            valueStyle={{ color: "white", fontWeight: 700 }}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
                <Col xs={24} lg={16}>
                    <Card
                        title={<span style={{ color: "white" }}>Son Mesajlar</span>}
                        style={cardStyle}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={stats.recentMessages}
                            renderItem={(item) => (
                                <List.Item
                                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                                    actions={[<Button type="link" size="small">Detay</Button>]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <div style={{
                                                width: 40, height: 40, borderRadius: "50%",
                                                background: token.colorFillSecondary,
                                                display: "flex", alignItems: "center", justifyContent: "center"
                                            }}>
                                                {item.name[0]}
                                            </div>
                                        }
                                        title={<Text style={{ color: "white", fontWeight: 500 }}>{item.name}</Text>}
                                        description={<Text style={{ color: "rgba(255,255,255,0.3)" }}>{item.subject} • {item.date}</Text>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card
                        title={<span style={{ color: "white" }}>Sistem Durumu</span>}
                        style={cardStyle}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div>
                                <Text style={{ color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 4 }}>Versiyon</Text>
                                <Text style={{ color: "white" }}>1.2.0-stable</Text>
                            </div>
                            <div>
                                <Text style={{ color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 4 }}>Sunucu Lokasyonu</Text>
                                <Text style={{ color: "white" }}>Frankfurt (DE)</Text>
                            </div>
                            <div>
                                <Text style={{ color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 4 }}>Bellek Kullanımı</Text>
                                <Progress percent={45} size="small" status="active" strokeColor="#6366f1" />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};


// Sub-components used in Dashboard
const Tag = ({ children, color, icon }) => (
    <span style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: 12,
        background: color === "success" ? "rgba(16, 185, 129, 0.1)" : "rgba(255,255,255,0.1)",
        color: color === "success" ? "#10b981" : "white"
    }}>
        {icon}
        {children}
    </span>
);

export default Dashboard;
