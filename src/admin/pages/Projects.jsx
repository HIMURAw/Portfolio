import React, { useState, useEffect } from "react";
import { Table, Button, Space, Tag, Image, Switch, Modal, Form, Input, message, Typography, theme } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { dataService } from "../data/dataService";

const { Title } = Typography;

const Projects = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [form] = Form.useForm();
    const { token } = theme.useToken();

    useEffect(() => {
        setData(dataService.getProjects());
    }, []);

    const handleAdd = () => {
        setEditingProject(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleEdit = (record) => {
        setEditingProject(record);
        form.setFieldsValue({
            ...record,
            technologies: Array.isArray(record.technologies) ? record.technologies.join(", ") : record.technologies,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (key) => {
        Modal.confirm({
            title: "Bu projeyi silmek istediğinize emin misiniz?",
            onOk: () => {
                const newData = data.filter((item) => item.key !== key);
                setData(newData);
                dataService.saveProjects(newData);
                message.success("Proje silindi.");
            },
        });
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            const techs = typeof values.technologies === 'string'
                ? values.technologies.split(",").map((t) => t.trim())
                : values.technologies;

            let newData;
            if (editingProject) {
                newData = data.map((item) =>
                    item.key === editingProject.key ? { ...item, ...values, technologies: techs } : item
                );
                message.success("Proje güncellendi.");
            } else {
                const newProject = {
                    ...values,
                    key: Date.now().toString(),
                    technologies: techs,
                    image: values.image || "https://picsum.photos/200/120?random=" + Date.now(),
                };
                newData = [...data, newProject];
                message.success("Yeni proje eklendi.");
            }
            setData(newData);
            dataService.saveProjects(newData);
            setIsModalOpen(false);
        });
    };

    const columns = [
        {
            title: "Görsel",
            dataIndex: "image",
            key: "image",
            render: (img) => <Image src={img} width={50} height={30} style={{ objectFit: "cover", borderRadius: 4 }} />,
        },
        {
            title: "Proje Adı",
            dataIndex: "name",
            key: "name",
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: "Teknolojiler",
            dataIndex: "technologies",
            key: "technologies",
            render: (techs) => (
                <>
                    {Array.isArray(techs) && techs.map((tag) => (
                        <Tag color="blue" key={tag}>
                            {tag}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: "Öne Çıkan",
            dataIndex: "featured",
            key: "featured",
            render: (val, record) => (
                <Switch
                    checked={val}
                    onChange={(checked) => {
                        const newData = data.map(item => item.key === record.key ? { ...item, featured: checked } : item);
                        setData(newData);
                        dataService.saveProjects(newData);
                    }}
                />
            ),
        },
        {
            title: "İşlemler",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                    <Title level={2} style={{ margin: 0, fontWeight: 700 }}>Proje Yönetimi</Title>
                    <Typography.Text style={{ color: "rgba(255,255,255,0.45)" }}>Portfolyonuzdaki projeleri buradan düzenleyebilirsiniz</Typography.Text>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                    size="large"
                    style={{ borderRadius: 8, fontWeight: 600 }}
                >
                    Yeni Proje Ekle
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={data}
                rowKey="key"
                pagination={{ pageSize: 8 }}
                style={{
                    background: "rgba(30, 41, 59, 0.4)",
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.05)"
                }}
            />

            <Modal
                title={editingProject ? "Projeyi Düzenle" : "Yeni Proje Ekle"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Proje Adı" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Açıklama">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item name="image" label="Görsel URL (Placeholder için boş bırakın)">
                        <Input />
                    </Form.Item>
                    <Form.Item name="technologies" label="Teknolojiler (Virgülle ayırın)" rules={[{ required: true }]}>
                        <Input placeholder="React, Node.js, CSS" />
                    </Form.Item>
                    <Form.Item name="demoLink" label="Demo URL">
                        <Input />
                    </Form.Item>
                    <Form.Item name="githubLink" label="GitHub URL">
                        <Input />
                    </Form.Item>
                    <Form.Item name="featured" label="Öne Çıkan" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Projects;
