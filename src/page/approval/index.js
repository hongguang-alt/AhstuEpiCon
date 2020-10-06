import React from 'react'
import { Card, Table, Space, message } from 'antd'
import { ToApproval, ToAgree, ToDeleteAgree, toSourceData } from '../../axios/api'

const changeData = (data) => {
    let newData = data.filter(item => {
        return item.leaveInfo
    })
    return newData
}

class Approval extends React.Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            filters: []
        }
    }

    componentDidMount() {
        this.getApproval()
        this.getCollege()
    }

    deleteAgree = async (sid) => {
        try {
            let { status, msg } = await ToDeleteAgree({ sid })
            if (status === '200') {
                this.getApproval()
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
        }
    }

    getApproval = async () => {
        try {
            let { status, msg, data } = await ToApproval()
            data['key'] = data._id
            if (status == '200') {
                this.setState({
                    dataSource: changeData(data)
                })
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
        }
    }

    getCollege = async () => {
        let arr = []
        try {
            let { status, msg, data } = await toSourceData()
            if (status === '200') {
                for (let i in data) {
                    arr.push({
                        text: data[i]['college'],
                        value: data[i]['college']
                    })
                }
                this.setState({
                    filters: arr
                })
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
        }
    }

    getAgree = async (sid, mystatus) => {
        try {
            let { status, msg } = await ToAgree({ sid, status: mystatus })
            if (status === '200') {
                this.getApproval()
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { dataSource = [], filters } = this.state
        const columns = [
            {
                title: "姓名",
                key: 'name',
                dataIndex: 'name'
            },
            {
                title: "学号",
                key: 'sid',
                dataIndex: 'sid'

            },
            {
                title: "学院",
                key: 'college',
                dataIndex: 'college',
                filters: filters,
                onFilter: (value, record) => {
                    console.log(value, record)
                    return record.college.indexOf(value) === 0
                }

            },
            {
                title: '请假时间',
                dataIndex: 'date',
                key: 'date',
                render: (text, record) => {
                    return text && `${text[0]}———${text[1]}`
                }
            },
            {
                title: '请假类型',
                dataIndex: 'leavetype',
                key: 'leavetype',
                render: (text) => {
                    if (text === 'comleave') {
                        return '事假'
                    } else if (text === 'sickleave') {
                        return '病假'
                    }
                }
            },
            {
                title: '联系电话',
                dataIndex: 'leaveiphone',
                key: 'leaveiphone',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        {record.status === 0 ? <Space> <a onClick={() => { this.getAgree(record.sid, 1) }}>同意</a>
                            <a onClick={() => { this.getAgree(record.sid, 2) }}>不同意</a></Space> :
                            <a onClick={() => { this.deleteAgree(record.sid) }}>销假</a>
                        }
                    </Space>
                ),
            },

        ];
        return <React.Fragment>
            <Card title='审批' bordered={false}>
                <Table dataSource={dataSource} columns={columns} />
            </Card>
        </React.Fragment>
    }
}

export default Approval