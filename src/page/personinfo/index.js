import React from 'react'
import { Card, message } from 'antd'
import { ToPersonInfo } from '../../axios/api'

class PersonInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            info: {}
        }
    }

    componentDidMount() {
        this.getInfo()
    }

    getInfo = async () => {
        try {
            let { status, msg, data } = await ToPersonInfo()
            if (status === '200') {
                this.setState({
                    info: data
                })
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { info } = this.state
        return <React.Fragment>
            <Card title='个人信息' bordered={false} style={{ width: '100%' }}>
                <p><span style={{ fontWeight: 'bold' }}>姓名:</span>{info.name}</p>
                <p><span style={{ fontWeight: 'bold' }}>性别:</span>{info.sex}</p>
                <p><span style={{ fontWeight: 'bold' }}>学号:</span>{info.sid}</p>
                <p><span style={{ fontWeight: 'bold' }}>学院:</span>{info.college}</p>
                <p><span style={{ fontWeight: 'bold' }}>订阅邮件:</span>{info.email || '--'}</p>
            </Card>
        </React.Fragment>
    }
}

export default PersonInfo