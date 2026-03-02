import React, { useState, useEffect } from "react";
import { Table, Button, Space, Tag, Drawer, Typography, Descriptions, Modal, message } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { dataService } from "../data/dataService";

const { Title } = Typography;

const Messages = () => {
    const [data, setData] = useState([]);
    const [selectedMsg, setSelectedMsg] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        setData(dataService.getMessages());
    }, []);

    const handleView = (record) => {
        setSelectedMsg(record);
        setDrawerOpen(true);
        // Mark as read
        if (!record.read) {
            const newData = data.map(m => m.key === record.key ? { ...m, read: true } : m);
            setData(newData);
            dataService.saveMessages(newData);
        }
    };

    const handleDelete = (key) => {
        Modal.confirm({
            title: "Bu mesajı silmek istediğinize emin misiniz?",
            onOk: () => {
                const newData = data.filter((item) => item.key !== key);
                setData(newData);
                dataService.saveMessages(newData);
                message.success("Mesaj silindi.");
            },
        });
    };

    const columns = [
        {
            title: "İsim",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Konu",
            dataIndex: "subject",
            key: "subject",
        },
        {
            title: "Tarih",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Durum",
            dataIndex: "read",
            key: "read",
            render: (read) => (
                <Tag color={read ? "default" : "green"}>
                    {read ? "Okundu" : "Yeni"}
                </Tag>
            ),
        },
        {
            title: "İşlemler",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="text" icon={<EyeOutlined />} onClick={() => handleView(record)} />
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 32 }}>
                <Title level={2} style={{ margin: 0, fontWeight: 700 }}>Mesajlar</Title>
                <Typography.Text style={{ color: "rgba(255,255,255,0.45)" }}>İletişim formundan gelen talepleri kontrol edin</Typography.Text>
            </div>

            <Table
                columns={columns}
                dataSource={data}
                rowKey="key"
                style={{
                    background: "rgba(30, 41, 59, 0.4)",
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.05)"
                }}
            />

            <Drawer
                title="Mesaj Detayı"
                width={500}
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
            >
                {selectedMsg && (
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Gonderen">{selectedMsg.name}</Descriptions.Item>
                        <Descriptions.Item label="E-posta">{selectedMsg.email}</Descriptions.Item>
                        <Descriptions.Item label="Tarih">{selectedMsg.date}</Descriptions.Item>
                        <Descriptions.Item label="Konu">{selectedMsg.subject}</Descriptions.Item>
                        <Descriptions.Item label="Mesaj">
                            <div style={{ padding: "10px 0", whiteSpace: "pre-wrap" }}>
                                {selectedMsg.message}
                            </div>
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Drawer>
        </div>
    );
};

export default Messages;
