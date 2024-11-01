// // src/pages/Home.js
import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    UserOutlined,
    BookOutlined,
    ApartmentOutlined,
    FileTextOutlined,
    HomeOutlined, // Updated icon for "Classrooms"
    TeamOutlined,
    CheckCircleOutlined,
} from '@ant-design/icons';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const sections = [
        { title: 'Manage Students', path: '/students', icon: <UserOutlined /> },
        { title: 'Manage Courses', path: '/courses', icon: <BookOutlined /> },
        { title: 'Manage Departments', path: '/departments', icon: <ApartmentOutlined /> },
        { title: 'Manage Enrollments', path: '/enrollments', icon: <FileTextOutlined /> },
        { title: 'Manage Classrooms', path: '/classrooms', icon: <HomeOutlined /> }, // Updated icon
        { title: 'Manage Alumni', path: '/alumni', icon: <TeamOutlined /> },
        { title: 'View Attendance', path: '/attendance', icon: <CheckCircleOutlined /> },
    ];

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Student Management System Dashboard</h1>
            <Row gutter={[16, 16]} className="dashboard-row">
                {sections.slice(0, 4).map((section, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={index}>
                        <Card
                            title={
                                <div className="card-title-with-icon">
                                    {section.icon}
                                    <span>{section.title}</span>
                                </div>
                            }
                            bordered={false}
                            className="dashboard-card"
                            hoverable
                        >
                            <Button
                                type="primary"
                                onClick={() => navigate(section.path)}
                                block
                            >
                                Go to {section.title}
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row gutter={[16, 16]} justify="center" className="dashboard-row">
                {sections.slice(4).map((section, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={index}>
                        <Card
                            title={
                                <div className="card-title-with-icon">
                                    {section.icon}
                                    <span>{section.title}</span>
                                </div>
                            }
                            bordered={false}
                            className="dashboard-card"
                            hoverable
                        >
                            <Button
                                type="primary"
                                onClick={() => navigate(section.path)}
                                block
                            >
                                Go to {section.title}
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Home;
