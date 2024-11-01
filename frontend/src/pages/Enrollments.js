// src/pages/Enrollments.js
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

const Enrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const handleAdd = () => {
        form.validateFields().then((values) => {
            setEnrollments([...enrollments, { id: enrollments.length + 1, ...values }]);
            form.resetFields();
            setIsModalOpen(false);
        });
    };

    const handleDelete = (id) => {
        setEnrollments(enrollments.filter((enrollment) => enrollment.id !== id));
    };

    return (
        <div>
            <h1>Enrollment Management</h1>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>Enroll Student</Button>
            <Table
                columns={[
                    { title: 'Student ID', dataIndex: 'studentId', key: 'studentId' },
                    { title: 'Course ID', dataIndex: 'courseId', key: 'courseId' },
                    {
                        title: 'Actions',
                        key: 'actions',
                        render: (_, record) => (
                            <Button onClick={() => handleDelete(record.id)} danger>Delete</Button>
                        ),
                    },
                ]}
                dataSource={enrollments}
                rowKey="id"
            />
            <Modal
                title="Enroll Student"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleAdd}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="studentId" label="Student ID" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="courseId" label="Course ID" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Enrollments;
