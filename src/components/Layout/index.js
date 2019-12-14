import React, { useState } from 'react';
import { Layout as LayoutAntd, Menu, Icon } from 'antd';

import styles from './Layout.module.css';

const { Header, Sider, Content } = LayoutAntd;

export default function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => setCollapsed(!collapsed);

    return (
        <LayoutAntd>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
            >
                <div className={styles.logo} />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Icon type="user" />
                        <span>nav 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="video-camera" />
                        <span>nav 2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="upload" />
                        <span>nav 3</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Header className={`${styles.header} ${collapsed ? styles.margin_left : ''}`}>
                <Icon className={styles.trigger} type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggle} />
            </Header>
            <LayoutAntd style={{ marginLeft: 200 }}>
                <Content
                    style={{
                        margin: '30px 30px',
                        marginTop: 94,
                        padding: 20,
                        background: '#fff',
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </LayoutAntd>
        </LayoutAntd>
    );
}
