import React from 'react'
import { Layout, Row, Col, Card, Carousel, Button } from 'antd';
const { Header, Footer, Content } = Layout;
import './index.css'
import img from '../static/img/bg.jpg'
import {
    login
} from '../axios/api'
import {
    UserSwitchOutlined,
    ArrowRightOutlined,
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
    },
    contentStyle: {
        width: '100%',
        height: '500px'
    },
    inputStyle: {
        outline: 'none',
        border: "none",
        borderBottom: '1px solid gray',
        width: '100%',
        marginTop: '30px',
        paddingRight: '40px'
    },
    loginBtn: {
        position: 'absolute',
        top: '20px',
        right: '0px'
    }
}
class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            errorFont: '',
            password: '',
            user: ''
        }
    }
    handleLogin = async () => {
        const { user, password } = this.state
        if (user === '' || password === '') {
            this.setState({ errorFont: "账号或者密码不能为空" })
            return
        }
        try {
            let res = await login({ user, password })
            const { status, token, msg } = res
            if (status === '200') {
                window.localStorage.setItem('token', token)
                this.props.history.push('/home/worldmap')
            } else {
                this.setState({ errorFont: msg })
            }
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        const { errorFont, user, password } = this.state
        return <React.Fragment>
            <Layout className='login-layout' >
                <Header className='login-header'>
                    <div style={styles.title}>安科疫情防控平台</div>
                    <div style={styles.engTitle}>Epidemic prevention control platform</div>
                </Header>
                <Content className='login-content'>
                    <Row >
                        <Col span={18} style={{ height: '500px' }}>
                            <Carousel autoplay>
                                <div>
                                    <img src={img} style={styles.contentStyle} alt="" />
                                </div>
                                <div>
                                    <img src={img} style={styles.contentStyle} alt="" />
                                </div>
                                <div>
                                    <img src={img} style={styles.contentStyle} alt="" />
                                </div>
                            </Carousel>
                        </Col>
                        <Col span={6} >
                            <Card title={"登陆"} bordered={false} style={{ height: '100%' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <UserSwitchOutlined style={{ fontSize: '40px' }} />
                                </div>
                                <div>
                                    <input type="text" style={styles.inputStyle} placeholder='账号' value={user} onChange={(e) => {
                                        this.setState({
                                            user: e.target.value
                                        })
                                    }} />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <input type="password" style={styles.inputStyle} placeholder='密码' value={password}
                                        onChange={(e) => {
                                            this.setState({
                                                password: e.target.value
                                            })
                                        }}
                                        onKeyDown={(e) => {
                                            if (e && e.key == 'Enter') {
                                                this.handleLogin()
                                            }
                                        }}
                                    />
                                    <Button type="circle" style={styles.loginBtn} icon={<ArrowRightOutlined />} onClick={() => { this.handleLogin() }} />
                                </div>
                                <div style={{ fontSize: "13px", color: 'red', marginTop: "10px" }}>{errorFont ? errorFont : null}</div>
                            </Card>
                        </Col>
                    </Row>
                </Content>
                <Footer className='login-footer'>
                    <div style={{ textAlign: 'center' }}>Copyright©  安徽科技学院 皖ICP备12009839号 English</div>
                </Footer>
            </Layout>
        </React.Fragment>
    }
}

export default Login