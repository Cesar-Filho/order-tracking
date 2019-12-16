import React, { useState } from 'react';
import { Layout as LayoutAntd, Menu, Icon } from 'antd';

import styles from './Layout.module.css';
import history from '../../config/history';

const { Header, Sider, Content } = LayoutAntd;

export default function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => setCollapsed(!collapsed);

    return (
        <LayoutAntd style={{ height: '100%' }}>
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
                    <Menu.Item key="1" onClick={() => history.push('order-tracking')}>
                        <Icon type="pie-chart" />
                        <span>Acompanhamento</span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => history.push('advancing-order')}>
                        <Icon type="fast-forward" />
                        <span>Avançar pedidos</span>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => history.push('cashier')}>
                        <Icon type="calculator" />
                        <span>Caixa</span>
                    </Menu.Item>
                    <Menu.Item key="4" onClick={() => history.push('order-form')}>
                        <Icon type="form" />
                        <span>Criar novo pedido</span>
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
                        display: 'inline-table',
                    }}
                >
                    {children}
                </Content>
            </LayoutAntd>
        </LayoutAntd>
    );
}
