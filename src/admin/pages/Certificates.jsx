import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Form, Input, DatePicker, message, Typography } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { dataService } from "../data/dataService";
import dayjs from "dayjs";

const { Title } = Typography;

const Certificates = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        setData(dataService.getCertificates());
    }, []);

    const handleAdd = () => {
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleDelete = (key) => {
        Modal.confirm({
            title: "Bu sertifikayı silmek istediğinize emin misiniz?",
            onOk: () => {
                const newData = data.filter((item) => item.key !== key);
                setData(newData);
                dataService.saveCertificates(newData);
                message.success("Sertifika silindi.");
            },
        });
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            const newCert = {
                ...values,
                key: Date.now().toString(),
                date: values.date.format("YYYY"), // src/data in certificates uses year string like "2024"
            };
            const newData = [...data, newCert];
            setData(newData);
            dataService.saveCertificates(newData);
            setIsModalOpen(false);
            message.success("Sertifika eklendi.");
        });
    };

    const columns = [
        {
            title: "Sertifika Adı",
            dataIndex: "name",
            key: "name",
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: "Veren Kurum",
            dataIndex: "organization",
            key: "organization",
        },
        {
            title: "Tarih",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "İşlemler",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                    <Title level={2} style={{ margin: 0, fontWeight: 700 }}>Sertifikalar</Title>
                    <Typography.Text style={{ color: "rgba(255,255,255,0.45)" }}>Başarılarınızı ve sertifikalarınızı yönetin</Typography.Text>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                    size="large"
                    style={{ borderRadius: 8, fontWeight: 600 }}
                >
                    Yeni Sertifika Ekle
                </Button>
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


            <Modal
                title="Yeni Sertifika Ekle"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Sertifika Adı" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="organization" label="Veren Kurum" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="date" label="Tarih" rules={[{ required: true }]}>
                        <DatePicker picker="year" style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item name="verifyLink" label="Doğrulama Linki">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Certificates;
