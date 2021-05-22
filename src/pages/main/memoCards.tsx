import React, { useState } from 'react';
import { Card, Avatar, Row, Col, Divider, Timeline, Modal, Button } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined, EnvironmentOutlined, PushpinOutlined } from '@ant-design/icons';
import { memo, info } from '../main';

export function MemoCards({ memos }) {
    return (
        <div className="site-card-wrapper">
            <Row>
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

function MemoInfo({ info }) {
    return (
        <span>
            <Row>
                <Col span={4} style={{textAlign: 'center'}}>
                    {info.weather}
                </Col>
                <Col span={20}>
                    {info.time}
                </Col>
            </Row>
            <Row>
                <Col span={4} style={{textAlign: 'center'}}>
                    <EnvironmentOutlined />
                </Col>
                <Col span={20}>
                    {info.place}
                </Col>
            </Row>
        </span>
    );
}

function MemoCardItem({ memo }) {
    const { Meta } = Card;
    // const { Step } = Steps;
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
            actions={[
            <EditOutlined key="edit" onClick={showModal}/>,
            <DeleteOutlined key="delete" />,
            ]}
        >
            <Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={
                    <>
                        <Row>
                            <Col span={20}>
                                {memo.title}
                            </Col>
                            <Col span={4}>
                                <Button shape="circle" icon={<PushpinOutlined />} />
                            </Col>
                        </Row>
                    </>
                }
                description={
                    <>
                        {memo.content.split('\n')[0]}
                        <br />
                        ...
                        <Divider />
                        <MemoInfo info={memo.infos[memo.infos.length-1]} />
                    </>
                }
            />
            <Modal title={memo.title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Timeline>
                {memo.infos.map(
                    (info: info) => {
                        return (
                            <>
                                <Timeline.Item color="blue">
                                <MemoInfo info={info} />
                                </Timeline.Item>
                            </>
                            )    
                        }
                    )
                }
                </Timeline>
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
