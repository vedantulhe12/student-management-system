// src/pages/Students.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

const Students = () => {
    const [students, setStudents] = useState([]); // State for student data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    // Sample data (Replace this with data from the database later)
    const sampleStudents = [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
    ];

    // useEffect to set sample data only once
    useEffect(() => {
        setStudents(sampleStudents);
    }, []);

    const columns = [
        { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
        { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
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

    // Add student handler
    const handleAdd = () => {
        form.validateFields().then((values) => {
            setStudents([...students, { id: students.length + 1, ...values }]);
            form.resetFields();
            setIsModalOpen(false);
        });
    };

    // Edit student handler
    const handleEdit = (student) => {
        form.setFieldsValue(student);
        setIsModalOpen(true);
    };

    // Delete student handler
    const handleDelete = (id) => {
        setStudents(students.filter((student) => student.id !== id));
    };

    return (
        <div>
            <h1>Student Management</h1>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Add Student
            </Button>
            <Table columns={columns} dataSource={students} rowKey="id" />

            <Modal
                title="Add/Edit Student"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleAdd}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Students;
