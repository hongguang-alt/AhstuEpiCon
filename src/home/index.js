import React from 'react'
import { Layout, Menu, Dropdown } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
import WorldMap from '../page/worldmap'
import AnkeMap from '../page/ankemap'
import VacFind from '../page/vacfind'
import VacSub from '../page/vacsub'
import Leave from '../page/leave'
import Approval from '../page/approval'
import PersonInfo from '../page/personinfo'

import './index.css'
import {
    BarChartOutlined,
    HeatMapOutlined,
    SplitCellsOutlined,
    UserOutlined,
    DownOutlined
} from '@ant-design/icons'

const styles = {
    title: {
        backgroundColor: "#19478b",
        fontSize: '20px',
        color: 'white',
        fontWeight: 'bold',
    },
    engTitle: {
        backgroundColor: "#19478b",
        fontSize: '10px',
        color: 'white',
        fontWeight: 'bold',
        marginTop: '-40px'
    },
    headerRight: {
        height: '70px',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between'
    }
}
class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            collapsed: false,
        }
    }
    onCollapse = collapsed => {
        this.setState({ collapsed })
    }

    getContent = key => {
        switch (key) {
            case 'worldmap': return <WorldMap />
            case 'ankemap': return <AnkeMap />
            case 'vacfind': return <VacFind />
            case 'vacsub': return <VacSub />
            case 'leave': return <Leave />
            case 'approval': return <Approval />
            case 'personinfo': return <PersonInfo />
            default: return <div>404</div>
        }
    }

    handleMenu = ({ key }) => {
        this.props.history.push(`/home/${key}`)
    }

    render() {
        const { key } = this.props.match.params
        const menu = (
            <Menu>
                <Menu.Item>
                    <div>退出</div>
                </Menu.Item>
            </Menu>
        );
        return <React.Fragment>
            <Layout className='login-layout'>
                <Header className='login-header' style={styles.headerRight}>
                    <div>
                        <div style={styles.title}>安科疫情防控平台</div>
                        <div style={styles.engTitle}>Epidemic prevention control platform</div>
                    </div>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            欢迎你，{'汪红光'} <DownOutlined />
                        </a>
                    </Dropdown>
                </Header>
                <Layout>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{ paddingTop: '20px' }}>
                        <Menu theme="dark" defaultSelectedKeys={[key]} defaultOpenKeys={[key]} mode="inline" onClick={this.handleMenu}>
                            <SubMenu key="showepimap" icon={<BarChartOutlined />} title="疫情查看">
                                <Menu.Item key="worldmap">全国疫情图</Menu.Item>
                                <Menu.Item key="ankemap">安科疫情图</Menu.Item>
                            </SubMenu>
                            <SubMenu key="vaccines" icon={<HeatMapOutlined />} title="疫苗管理">
                                <Menu.Item key="vacfind">疫苗查询</Menu.Item>
                                <Menu.Item key="vacsub">疫苗订阅</Menu.Item>
                            </SubMenu>
                            <SubMenu key="whereabouts" icon={<SplitCellsOutlined />} title="行踪管理">
                                <Menu.Item key="leave">请假</Menu.Item>
                                <Menu.Item key="approval">审批</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="personinfo" icon={<UserOutlined />}>个人信息</Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content className='content-content'>
                            {this.getContent(key)}
                        </Content>
                        <Footer className='login-footer'>
                            <div style={{ textAlign: 'center' }}>Copyright©  安徽科技学院 皖ICP备12009839号 English</div>
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        </React.Fragment>
    }
}

export default Home