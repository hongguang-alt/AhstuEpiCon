import React from 'react'
import { Layout, Menu, Dropdown } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
import jwt from 'jsonwebtoken'
import WorldMap from '../page/worldmap'
import AnkeMap from '../page/ankemap'
import VacFind from '../page/vacfind'
import VacSub from '../page/vacsub'
import Leave from '../page/leave'
import Approval from '../page/approval'
import PersonInfo from '../page/personinfo'
import AnkeMapManage from '../page/ankemapmanage'
import ShowEmail from '../page/showemail'
import ApprovalMap from '../page/approvalmap'
import { secret } from '../config/config'
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
            role: 'student',
            name: ''
        }
    }

    componentDidMount() {
        //设置token
        try {
            let token = location.hash.split('?')[1].split('=')[1]
            if (token) {
                window.localStorage.setItem('token', token)
            }
        } catch (e) {
            console.log('正常登陆')
        }
        this.getManage()
    }


    getManage = () => {
        let token = window.localStorage.getItem('token')
        let { admin, name } = jwt.verify(token, secret)
        this.setState({
            role: admin,
            name: name
        })
    }

    onCollapse = collapsed => {
        this.setState({ collapsed })
    }


    //退出
    logout = () => {
        window.localStorage.removeItem('token')
        this.props.history.push('/')
    }

    getContent = key => {
        const { role } = this.state
        switch (key) {
            case 'worldmap': return <WorldMap />
            case 'ankemap': return <AnkeMap />
            case 'vacfind': return <VacFind />
            case 'vacsub': return <VacSub />
            case 'leave': return <Leave />
            case 'ankemapmanage':
                if (role === 'admin') {
                    return <AnkeMapManage />
                } else {
                    return <div>404</div>
                }
            case 'approval':
                if (role === 'admin') {
                    return <Approval />
                } else {
                    return <div>404</div>
                }
            case 'showemail':
                if (role === 'admin') {
                    return <ShowEmail />
                } else {
                    return <div>404</div>
                }
            case 'approvalmap':
                if (role === 'admin') {
                    return <ApprovalMap />
                } else {
                    return <div>404</div>
                }
            case 'personinfo': return <PersonInfo />
            default: return <div>404</div>
        }
    }

    handleMenu = ({ key }) => {
        this.props.history.push(`/home/${key}`)
    }

    render() {
        const { key } = this.props.match.params
        const { role, name } = this.state
        const menu = (
            <Menu>
                <Menu.Item>
                    <div onClick={() => this.logout()}>退出</div>
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
                            欢迎你，{name} <DownOutlined />
                        </a>
                    </Dropdown>
                </Header>
                <Layout>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{ paddingTop: '20px' }}>
                        <Menu theme="dark" defaultSelectedKeys={[key]} defaultOpenKeys={[key]} mode="inline" onClick={this.handleMenu}>
                            <SubMenu key="showepimap" icon={<BarChartOutlined />} title="疫情查看">
                                <Menu.Item key="worldmap">疫情图表</Menu.Item>
                                <Menu.Item key="ankemap">安科疫情图</Menu.Item>
                                {role === 'admin' ? <Menu.Item key="ankemapmanage">安科生病人数管理</Menu.Item> : null}
                            </SubMenu>
                            <SubMenu key="vaccines" icon={<HeatMapOutlined />} title="疫苗管理">
                                <Menu.Item key="vacfind">疫苗查询</Menu.Item>
                                <Menu.Item key="vacsub">疫苗订阅</Menu.Item>
                                {role === 'admin' ? <Menu.Item key="showemail">订阅名单</Menu.Item> : null}
                            </SubMenu>
                            <SubMenu key="whereabouts" icon={<SplitCellsOutlined />} title="行踪管理">
                                <Menu.Item key="leave">请假</Menu.Item>
                                {role === 'admin' ? <Menu.Item key="approval">审批</Menu.Item> : null}
                                {role === 'admin' ? <Menu.Item key="approvalmap">请假风险图</Menu.Item> : null}
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