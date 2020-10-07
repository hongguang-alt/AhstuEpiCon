import React from 'react'
import { Card, Form, DatePicker, Button, Select, Input, Divider, message, Tooltip } from 'antd'
import moment from 'moment'
import { toLeave, ToleaveStatus, TogetDesStatus } from '../../axios/api'
const { RangePicker } = DatePicker;
const { Option } = Select
const { TextArea } = Input
import StatusInfo from './statusInfo'
import { ToPersonInfo } from '../../axios/api'

//0:未审批，1：审批通过，2：审批未通过，3.未发起审批
//0：低风险地区，1.中风险地区，2.高风险地区,3.未显示
class Leave extends React.Component {
    formRef = React.createRef()
    constructor() {
        super()
        this.state = {
            leaveStatus: 3,
            info: {},
            destinationStatus: 3,
            personInfo: {}
        }
    }

    componentDidMount() {
        this.getStatus()
        this.getInfo()
    }

    getInfo = async () => {
        try {
            let { status, msg, data } = await ToPersonInfo()
            if (status === '200') {
                this.setState({
                    personInfo: data
                })
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
        }
    }
    getStatus = async () => {
        try {
            let { status, msg, data } = await ToleaveStatus()
            if (status === '200') {
                this.setState({
                    leaveStatus: data.status,
                    info: data
                })
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
        }
    }

    onFinish = async (values) => {
        const { destinationStatus } = this.state
        const { date } = values
        for (let i = 0; i < date.length; i++) {
            date[i] = moment(date[i]).format('YYYY-MM-DD HH:mm:ss')
        }
        values.status = 3
        values.risklevel = destinationStatus
        try {
            let { status, msg } = await toLeave(values)
            if (status === '200') {
                this.getStatus()
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
        }
    }


    //判断高低风险
    getHL = () => {
        const { destinationStatus } = this.state
        switch (destinationStatus) {
            case 0: return <span style={{ color: 'red' }} >低风险地区</span>
            case 1: return <span style={{ color: 'blue' }}>中风险地区</span>
            case 2: return <span style={{ color: 'green' }}>高风险地区</span>
        }
    }



    //改变去判断高低风险地区
    handleChange = async (e) => {
        const value = e.target.value
        try {
            let { status, msg, data } = await TogetDesStatus(value)
            if (status === '200') {
                this.setState({
                    destinationStatus: data
                })
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
        }
    }

    disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    disabledDateTime = () => {
        return {
            disabledHours: () => range(0, 24).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }
    //渲染不同的请假状态
    renderStatus = () => {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 8 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };
        const { leaveStatus, info, destinationStatus } = this.state
        switch (leaveStatus) {
            case 0: return <StatusInfo info={info} title="审核中..." />
            case 1: return <StatusInfo info={info} title="假期中..." />
            case 2: return <StatusInfo info={info} title="审批失败" />
            case 3: return <Form
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
                    <RangePicker
                        // disabledDate={this.disabledDate}
                        // disabledTime={this.disabledRangeTime}
                        // showTime={{
                        //     hideDisabledOptions: true,
                        //     defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                        // }}
                        // format="YYYY-MM-DD HH:mm:ss"
                        showTime

                    />
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
                    label="目的地"
                    name="destination"
                    rules={[{
                        required: true, message: '请输入你的目的地'
                    }]}
                >
                    <Input placeholder="安徽科技学院" onChange={this.handleChange} />
                </Form.Item>
                {destinationStatus !== 3 ? <Tooltip title="风险较高的地方不建议前往">
                    <div href="#API" style={{ textAlign: 'center', cursor: 'pointer', fontSize: '12px' }}>
                        该区域的风险等级为：{this.getHL()}
                    </div>
                </Tooltip> : null}
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
            default: return null
        }

    }
    render() {
        const { personInfo } = this.state
        return <React.Fragment>
            <Card bordered={false} title='请假' style={{ width: '100%' }}>
                <p><span style={{ fontWeight: 'bold' }}>请假人:</span>{personInfo.name}</p>
                <p><span style={{ fontWeight: 'bold' }}>学号:</span>{personInfo.sid}</p>
                <p><span style={{ fontWeight: 'bold' }}>学院:</span>{personInfo.college}</p>
                <Divider />
                {this.renderStatus()}
            </Card>
        </React.Fragment>
    }
}
export default Leave