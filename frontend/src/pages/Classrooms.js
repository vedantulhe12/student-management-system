// src/pages/Classrooms.js
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

const Classrooms = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const handleAdd = () => {
        form.validateFields().then((values) => {
            setClassrooms([...classrooms, { id: classrooms.length + 1, ...values }]);
            form.resetFields();
            setIsModalOpen(false);
        });
    };

    const handleDelete = (id) => {
        setClassrooms(classrooms.filter((classroom) => classroom.id !== id));
    };

    return (
        <div>
            <h1>Classroom Management</h1>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>Add Classroom</Button>
            <Table
                columns={[
                    { title: 'Room Number', dataIndex: 'roomNumber', key: 'roomNumber' },
                    { title: 'Building', dataIndex: 'building', key: 'building' },
                    { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
                    {
                        title: 'Actions',
                        key: 'actions',
                        render: (_, record) => (
                            <Button onClick={() => handleDelete(record.id)} danger>Delete</Button>
                        ),
                    },
                ]}
                dataSource={classrooms}
                rowKey="id"
            />
            <Modal
                title="Add Classroom"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleAdd}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="roomNumber" label="Room Number" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="building" label="Building" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="capacity" label="Capacity" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Classrooms;
