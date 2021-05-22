import React from 'react';
import { Layout, Menu, Input, Row, Col } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { MemoCards } from './main/memoCards';

// 타입 정의

export type info = {
  time: string,
  place: string,
  weather: string
}

export type memo = {
  id: string,
  title: string,
  content: string,
  profile: string,
  info: info[]
}

// MOCK_DATA

const MOCK_DATA: memo[] = [
  {
      id: 'some-random-value-0',
      title: '5월 20일 오늘의 일기',
      content: '오늘은 제일 바쁜 목요일\n끝났으면 좋겠다 빨리\n다음주는 더 더워지겠지??',
      profile: "default",
      info: [
        {
          time: "2021년 5월 20일",
          place: "정발산동",
          weather: "🌧"
        },
        {
          time: "2021년 5월 21일",
          place: "스타벅스 주엽강선점",
          weather: "🌥"
        },
        {
          time: "2021년 5월 22일",
          place: "일산호수공원",
          weather: "🔥"
        }
      ]
  },
  {
      id: 'some-random-value-1',
      title: '스타벅스 별 많이 적립 받기',
      content: '사이렌 오더 +1\n마이 스타벅스 리뷰 참여 +1\n이벤트 음료 주문 +3\n골드레벨 12개 달성 시 무료 쿠폰',
      profile: "default",
      info: [
        {
          time: "2021년 5월 19일",
          place: "안암역 6호선",
          weather: "☀️"
        },
        {
          time: "2021년 5월 19일",
          place: "하나스퀘어",
          weather: "☁️"
        }
      ]
  },
  {
      id: 'some-random-value-2',
      title: '5월 19일 오늘의 일기',
      content: '모처럼의 휴일\n과제만 없었으면 어후',
      profile: "default",
      info: [
        {
          time: "2021년 5월 16일",
          place: "우리집",
          weather: "❓"
        }
      ]
  },
  {
      id: 'some-random-value-3',
      title: '이마트에서 장보기',
      content: '닭가슴살, 계란 한 판, 시저샐러드',
      profile: "default",
      info: [
        {
          time: "2021년 5월 14일",
          place: "이마트 풍산점",
          weather: "💨"
        }
      ]
  },
];

export default function Main() {
    const { Header, Footer, Sider, Content } = Layout;
    const { Search } = Input;

    return (
      <Layout>
      <Sider
        width="60"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />} />
          <Menu.Item key="2" icon={<VideoCameraOutlined />} />
          <Menu.Item key="3" icon={<UploadOutlined />} />
          <Menu.Item key="4" icon={<BarChartOutlined />} />
          <Menu.Item key="5" icon={<CloudOutlined />} />
          <Menu.Item key="6" icon={<AppstoreOutlined />} />
          <Menu.Item key="7" icon={<TeamOutlined />} />
          <Menu.Item key="8" icon={<ShopOutlined />} />
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 60 }}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row>
                <Col span={8}>
                    <h1>
                      Kramo
                    </h1>
                </Col>
                <Col span={8} offset={8}>
                    <Search placeholder="input search text" style={{ width: 200 }} />
                </Col>
            </Row>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
            <MemoCards memos={MOCK_DATA}/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Kramo ©2021 Created by 남창균, 서상혁, 이정주, 정성준</Footer>
      </Layout>
    </Layout>
    );
  }