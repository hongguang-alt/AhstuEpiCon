import React from 'react'
import { Card } from 'antd'

class PersonInfo extends React.Component {
    render() {
        return <React.Fragment>
            <Card title='个人信息' bordered={false} style={{ width: '100%' }}>
                <p><span style={{ fontWeight: 'bold' }}>请假人:</span>{'汪红光'}</p>
                <p><span style={{ fontWeight: 'bold' }}>学号:</span>{'2702170119'}</p>
                <p><span style={{ fontWeight: 'bold' }}>学院:</span>{'信息与网络工程学院'}</p>
                <p><span style={{ fontWeight: 'bold' }}>风险等级:</span>{'低风险地区'}</p>
            </Card>
        </React.Fragment>
    }
}

export default PersonInfo