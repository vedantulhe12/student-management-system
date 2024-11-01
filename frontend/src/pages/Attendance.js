import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Select, DatePicker } from 'antd';

const Attendance = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const sampleAttendance = [
        { id: 1, studentName: 'John Doe', date: '2024-11-01', status: 'Present' },
        { id: 2, studentName: 'Jane Smith', date: '2024-11-01', status: 'Absent' },
    ];

    useEffect(() => {
        setAttendanceRecords(sampleAttendance);
    }, []);

    const columns = [
        { title: 'Student Name', dataIndex: 'studentName', key: 'studentName' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
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
            setAttendanceRecords([...attendanceRecords, { id: attendanceRecords.length + 1, ...values }]);
            form.resetFields();
            setIsModalOpen(false);
        });
    };

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setAttendanceRecords(attendanceRecords.filter((record) => record.id !== id));
    };

    return (
        <div>
            <h1>Attendance Management</h1>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Add Attendance
            </Button>
            <Table columns={columns} dataSource={attendanceRecords} rowKey="id" />

            <Modal
                title="Add/Edit Attendance"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleAdd}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="studentName" label="Student Name" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="John Doe">John Doe</Select.Option>
                            <Select.Option value="Jane Smith">Jane Smith</Select.Option>
                            {/* Add other student options here */}
                        </Select>
                    </Form.Item>
                    <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="Present">Present</Select.Option>
                            <Select.Option value="Absent">Absent</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Attendance;
