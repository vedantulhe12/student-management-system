import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

const Alumni = () => {
    const [alumni, setAlumni] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const sampleAlumni = [
        { id: 1, name: 'Alice Johnson', yearGraduated: 2020, email: 'alice.johnson@example.com' },
        { id: 2, name: 'Bob Brown', yearGraduated: 2019, email: 'bob.brown@example.com' },
    ];

    useEffect(() => {
        setAlumni(sampleAlumni);
    }, []);

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Year Graduated', dataIndex: 'yearGraduated', key: 'yearGraduated' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.id)} danger>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const handleAdd = () => {
        form.validateFields().then((values) => {
            setAlumni([...alumni, { id: alumni.length + 1, ...values }]);
            form.resetFields();
            setIsModalOpen(false);
        });
    };

    const handleEdit = (alumnus) => {
        form.setFieldsValue(alumnus);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setAlumni(alumni.filter((alumnus) => alumnus.id !== id));
    };

    return (
        <div>
            <h1>Alumni Management</h1>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Add Alumni
            </Button>
            <Table columns={columns} dataSource={alumni} rowKey="id" />

            <Modal
                title="Add/Edit Alumni"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleAdd}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="yearGraduated" label="Year Graduated" rules={[{ required: true }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Alumni;
