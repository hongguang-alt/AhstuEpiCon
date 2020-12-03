import React from 'react'
import { Card, Form, Input, Button, Tooltip, message, Divider, Modal } from 'antd'
const { confirm } = Modal;
import { toHasEmail, toBindEmail, toUntieEmail } from '../../axios/api'
import moment from 'moment';
import {
    QuestionCircleFilled,
    ExclamationCircleOutlined
} from '@ant-design/icons'



class VacSub extends React.Component {
    formRef = React.createRef()

    constructor() {
        super()
        this.state = {
            isEmail: false
        }
    }

    componentDidMount() {
        this.getHasEmail()
    }

    getHasEmail = async () => {
        try {
            let { status, data, msg } = await toHasEmail()
            if (status == '200') {
                const { isTrue, emailTime, email } = data
                this.setState({
                    isEmail: isTrue,
                    emailTime: emailTime,
                    email: email
                })
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
        }
    }

    //解除绑定
    getUntie = () => {
        confirm({
            title: '解绑',
            icon: <ExclamationCircleOutlined />,
            content: '确定解除订阅？',
            onOk: async () => {
                try {
                    let { status, msg } = await toUntieEmail()
                    if (status === '200') {
                        this.getHasEmail()
                    } else {
                        message.error(msg)
                    }
                } catch (e) {
                    console.log(e)
                }
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    }
    onFinish = async (values) => {
        values.emailTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        try {
            let { status, msg } = await toBindEmail(values)
            if (status === '200') {
                this.getHasEmail()
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
        }
    }



    render() {
        const { isEmail, email, emailTime } = this.state

        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 8 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };

        return <React.Fragment>
            <Card bordered={false} title='疫苗订阅' style={{ width: '100%' }}>
                <h3>因疫苗紧张，建议如下：</h3>
                <div>高风险地区人员：立即订阅</div>
                <div>中风险地区人员：立即订阅</div>
                <div>低风险地区人员：建议订阅</div>
                <a href="http://www.gov.cn/fuwu/2020-03/25/content_5495289.htm" >如何判断风险地区</a>
                <Divider />
                {
                    isEmail ? <div>
                        <p>你已经订阅，邮箱为：{email}
                            <Button size={'small'} style={{ marginLeft: '20px' }} type='primary' onClick={() => this.getUntie()}>解绑</Button>
                        </p>
                        <p>订阅时间为：{emailTime}</p>
                    </div> : <Form
                        {...layout}
                        name="basic"
                        onFinish={this.onFinish}
                        ref={this.formRef}
                    >
                            <Form.Item
                                label={
                                    <div>
                                        <span>订阅邮箱</span>
                                        <Tooltip title="此邮箱作为你订阅的唯一邮箱，与你的账号进行绑定" >
                                            <span style={{ cursor: 'pointer', margin: '0 5px' }}><QuestionCircleFilled /></span>
                                        </Tooltip>
                                    </div>
                                }
                                name="email"
                                rules={[{
                                    required: true, message: '请输入你的邮箱'
                                }, {
                                    type: 'email',
                                    message: '请输入邮箱格式',
                                },]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    订阅
                     </Button>
                            </Form.Item>
                        </Form>
                }

            </Card>
        </React.Fragment >
    }
}

export default VacSub