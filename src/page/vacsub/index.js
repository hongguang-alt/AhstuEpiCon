import React from 'react'
import { Card, Form, Input, Button, Tooltip } from 'antd'
import {
    QuestionCircleFilled
} from '@ant-design/icons'

class VacSub extends React.Component {
    formRef = React.createRef()

    onFinish = (values) => {
        console.log(values)
    }

    onFinishFailed = () => {

    }

    render() {
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
                <a href="http://www.gov.cn/fuwu/2020-03/25/content_5495289.htm">如何判断风险地区</a>

                <Form
                    {...layout}
                    name="basic"
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
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
            </Card>
        </React.Fragment >
    }
}

export default VacSub