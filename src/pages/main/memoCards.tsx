import React, { useState } from 'react';
import { Card, Avatar, Row, Col, Divider, Steps, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { memo, info } from '../main';

export function MemoCards({ memos }) {
    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                {memos.map(
                     (memo: memo, index: number) => {
                        const divider = index % 3 == 2 ? <Divider /> : "";
                            return (
                                <>
                                    <Col className="gutter-row" span={8}>
                                        <MemoCardItem memo={memo} />
                                    </Col>
                                    {divider}
                                </>
                            );
                        }
                    )
                }
            </Row>
        </div>
    );
}

function MemoCardItem({ memo }) {
    const { Meta } = Card;
    const { Step } = Steps;
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Card
            style={{ width: 300 }}
            cover={
                <Steps direction="vertical" current={0}>
                    {memo.info.map(
                            (info: info, index: number) => {
                                if (memo.info.length - index > 2) return null;
                                
                                return (
                                <Step title={info.place} description={info.time + ", " + info.weather} />
                                )
                            }
                        )
                    }
                </Steps>
            }
            actions={[
            <EditOutlined key="edit" onClick={showModal}/>,
            <DeleteOutlined key="delete" />,
            ]}
        >
            <Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={memo.title}
                description={memo.content.split('\n')[0] + "\n..."}
            />
            <Modal title={memo.title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {memo.info.map(
                    (info: info) => {
                        return (
                            <span>
                                {info.time + ", " + info.place+ ", " + info.weather}
                                <br />
                            </span>
                            )    
                        }
                    )
                }
                <Divider />
                {memo.content.split('\n').map( 
                    (line: string) => {
                        return (
                            <span>
                                {line}
                                <br/>
                            </span>
                        )
                    })    
                }
            </Modal>
        </Card>
    );
}