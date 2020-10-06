import React from 'react'
import { Card } from 'antd'
const StatusInfo = (props) => {
    const { info, title } = props
    console.log(props)
    return <div>
        <h1>{title}</h1>
        <Card>
            {info ?
                <div>
                    <p><span style={{ fontWeight: 'bold' }}>日期:</span>{info.date && `${info.date[0]}——${info.date[1]}`}</p>
                    <p><span style={{ fontWeight: 'bold' }}>请假类型:</span>{info.leavetype === 'comleave' ? "事假" : "病假"}</p>
                    <p><span style={{ fontWeight: 'bold' }}>联系电话:</span>{info.leaveiphone}</p>
                    <p><span style={{ fontWeight: 'bold' }}>请假原因:</span>{info.leavereason}</p>
                </div>
                : null}
        </Card>
    </div>
}

export default StatusInfo