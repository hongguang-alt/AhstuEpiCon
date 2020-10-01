import React from 'react'
import { Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

import './index.css'
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons'

const styles = {
    title: {
        backgroundColor: "#19478b",
        fontSize: '25px',
        color: 'white',
        fontWeight: 'bold',
    },
    engTitle: {
        backgroundColor: "#19478b",
        fontSize: '15px',
        color: 'white',
        fontWeight: 'bold',
        marginTop: '-40px'
    }
}
class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            collapsed: false
        }
    }
    onCollapse = collapsed => {
        this.setState({ collapsed })
    }

    render() {
        return <React.Fragment>
            <Layout className='login-layout'>
                <Header className='login-header'>
                    <div style={styles.title}>安科疫情防控平台</div>
                    <div style={styles.engTitle}>Epidemic prevention control platform</div>
                </Header>
                <Layout>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1" icon={<PieChartOutlined />}>
                                Option 1
                            </Menu.Item>
                            <Menu.Item key="2" icon={<DesktopOutlined />}>
                                Option 2
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                                <Menu.Item key="3">Tom</Menu.Item>
                                <Menu.Item key="4">Bill</Menu.Item>
                                <Menu.Item key="5">Alex</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                                <Menu.Item key="6">Team 1</Menu.Item>
                                <Menu.Item key="8">Team 2</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9" icon={<FileOutlined />} />
                        </Menu>
                    </Sider>
                    <Content className='content-content'>Content</Content>
                </Layout>
            </Layout>
        </React.Fragment>
    }
}

export default Home