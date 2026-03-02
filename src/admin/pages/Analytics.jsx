import React, { useState, useEffect } from "react";
import { Row, Col, Card, Statistic, Typography, Segmented, theme } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, EyeOutlined, MessageOutlined } from "@ant-design/icons";
import { dataService } from "../data/dataService";

const { Title, Text } = Typography;

const Analytics = () => {
    const { token } = theme.useToken();
    const [data, setData] = useState({ totalVisitors: 0, projectViews: 0 });

    useEffect(() => {
        setData(dataService.getAnalytics());
    }, []);

    const cardStyle = {
        background: "rgba(30, 41, 59, 0.4)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 12,
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div>
                    <Title level={2} style={{ margin: 0, fontWeight: 700 }}>Analytics</Title>
                    <Text style={{ color: "rgba(255,255,255,0.45)" }}>Ziyaretçi ve etkileşim verileri</Text>
                </div>
                <Segmented
                    options={['Günlük', 'Haftalık', 'Aylık']}
                    style={{ background: "rgba(255,255,255,0.05)" }}
                />
            </div>

            <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
                <Col xs={24} md={8}>
                    <Card style={cardStyle}>
                        <Statistic
                            title={<Text style={{ color: "rgba(255,255,255,0.45)" }}>Toplam Ziyaretçi</Text>}
                            value={data.totalVisitors}
                            precision={0}
                            valueStyle={{ color: "white", fontWeight: 700 }}
                            prefix={<UserOutlined style={{ color: token.colorPrimary }} />}
                            suffix={<span style={{ fontSize: 12, color: '#10b981' }}><ArrowUpOutlined /> 12%</span>}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card style={cardStyle}>
                        <Statistic
                            title={<Text style={{ color: "rgba(255,255,255,0.45)" }}>Proje Görüntülenme</Text>}
                            value={data.projectViews}
                            precision={0}
                            valueStyle={{ color: "white", fontWeight: 700 }}
                            prefix={<EyeOutlined style={{ color: "#ec4899" }} />}
                            suffix={<span style={{ fontSize: 12, color: '#10b981' }}><ArrowUpOutlined /> 8%</span>}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card style={cardStyle}>
                        <Statistic
                            title={<Text style={{ color: "rgba(255,255,255,0.45)" }}>Mesaj Oranı</Text>}
                            value={3.2}
                            precision={1}
                            valueStyle={{ color: "white", fontWeight: 700 }}
                            prefix={<MessageOutlined style={{ color: "#10b981" }} />}
                            suffix="%"
                        />
                    </Card>
                </Col>
            </Row>

            <Card
                title={<span style={{ color: "white" }}>Ziyaretçi Trendi</span>}
                style={cardStyle}
            >
                <div style={{ height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginBottom: 20 }}>
                        <p>Gerçek zamanlı trafik verisi yükleniyor...</p>
                    </div>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', height: 120 }}>
                        {[40, 60, 30, 80, 100, 70, 90].map((h, i) => (
                            <div key={i} style={{
                                width: 32,
                                height: `${h}%`,
                                background: `linear-gradient(to top, ${token.colorPrimary}22, ${token.colorPrimary})`,
                                borderRadius: "4px 4px 0 0",
                                position: "relative"
                            }}>
                                <div style={{
                                    position: "absolute",
                                    top: -6,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: 4,
                                    height: 4,
                                    borderRadius: "50%",
                                    background: "white",
                                    opacity: 0.5
                                }} />
                            </div>
                        ))}
                    </div>
                    <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 12, paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                        {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(d => (
                            <Text key={d} style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{d}</Text>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Analytics;

