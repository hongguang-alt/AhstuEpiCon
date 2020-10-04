import React from 'react'
import { Card, Form, DatePicker, Button, Select, Input, Divider } from 'antd'
import moment from 'moment'
const { RangePicker } = DatePicker;
const { Option } = Select
const { TextArea } = Input

class Leave extends React.Component {
    formRef = React.createRef()
    onFinish = (values) => {
        const { date } = values
        for (let i = 0; i < date.length; i++) {
            date[i] = moment(date[0]).format('YYYY-MM-DD HH:mm:ss')
        }
        console.log(values)
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
            <Card bordered={false} title='请假' style={{ width: '100%' }}>
                <p><span style={{ fontWeight: 'bold' }}>请假人:</span>{'汪红光'}</p>
                <p><span style={{ fontWeight: 'bold' }}>学号:</span>{'2702170119'}</p>
                <p><span style={{ fontWeight: 'bold' }}>学院:</span>{'信息与网络工程学院'}</p>
                <Divider />
                <Form
                    name="leave"
                    ref={this.formRef}
                    onFinish={this.onFinish}
                    {...layout}
                >
                    <Form.Item
                        label="请假时间"
                        name="date"
                        rules={[{
                            required: true, message: '请输入你的请假时间'
                        }]}
                    >
                        <RangePicker showTime />
                    </Form.Item>
                    <Form.Item
                        label="请假类型"
                        name="leavetype"
                        rules={[{
                            required: true, message: '请输入你的请假类型'
                        }]}
                        initialValue='comleave'
                    >
                        <Select style={{ width: 120 }}>
                            <Option value="comleave">病假</Option>
                            <Option value="sickleave">事假</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='联系电话'
                        name='leaveiphone'
                        rules={[
                            { required: true, message: '请输入你的电话号码' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='请假理由'
                        name='leavereason'
                        rules={[
                            { required: true, message: '请输入你的请假理由' }
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            提交
                     </Button>
                    </Form.Item>
                </Form>
            </Card>
        </React.Fragment>
    }
}
export default Leave