// src/pages/Courses.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const sampleCourses = [
        { id: 1, name: 'Mathematics 101', description: 'Basic Math Course' },
        { id: 2, name: 'Physics 101', description: 'Intro to Physics' },
    ];

    useEffect(() => {
        setCourses(sampleCourses);
    }, []);

    const columns = [
        { title: 'Course Name', dataIndex: 'name', key: 'name' },
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
            setCourses([...courses, { id: courses.length + 1, ...values }]);
            form.resetFields();
            setIsModalOpen(false);
        });
    };

    const handleEdit = (course) => {
        form.setFieldsValue(course);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setCourses(courses.filter((course) => course.id !== id));
    };

    return (
        <div>
            <h1>Course Management</h1>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Add Course
            </Button>
            <Table columns={columns} dataSource={courses} rowKey="id" />

            <Modal
                title="Add/Edit Course"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleAdd}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Course Name" rules={[{ required: true }]}>
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

export default Courses;
