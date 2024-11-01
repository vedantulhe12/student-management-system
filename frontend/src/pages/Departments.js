// src/pages/Departments.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const sampleDepartments = [
        { id: 1, name: 'Computer Science', description: 'CS Department' },
        { id: 2, name: 'Physics', description: 'Physics Department' },
    ];

    useEffect(() => {
        setDepartments(sampleDepartments);
    }, []);

    const columns = [
        { title: 'Department Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
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
            setDepartments([...departments, { id: departments.length + 1, ...values }]);
            form.resetFields();
            setIsModalOpen(false);
        });
    };

    const handleEdit = (department) => {
        form.setFieldsValue(department);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setDepartments(departments.filter((department) => department.id !== id));
    };

    return (
        <div>
            <h1>Department Management</h1>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Add Department
            </Button>
            <Table columns={columns} dataSource={departments} rowKey="id" />

            <Modal
                title="Add/Edit Department"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleAdd}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Department Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Departments;
