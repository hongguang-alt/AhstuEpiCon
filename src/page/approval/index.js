import React from 'react'
import { Card, Table, Space, message } from 'antd'
import { ToApproval, ToAgree, ToDeleteAgree } from '../../axios/api'

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
            dataSource: []
        }
    }

    componentDidMount() {
        this.getApproval()
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
        const { dataSource = [] } = this.state
        // const dataSource = [
        //     {
        //         date: ["2020-10-04 12:47:47", "2020-10-08 12:47:47"],
        //         leaveiphone: "17305525291",
        //         leavereason: "累了",
        //         leavetype: "comleave",
        //         name: '汪红光',
        //         sid: '2702170119',
        //         college: "信息与网络工程学院",
        //         key: 1
        //     }
        // ];

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
                filters: [
                    {
                        text: 'Joe',
                        value: 'Joe',
                    },
                    {
                        text: 'John',
                        value: 'John',
                    },
                ],
                onFilter: (value, record) => record.name.indexOf(value) === 0
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
                        {record.status === 0 ? <div> <a onClick={() => { this.getAgree(record.sid, 1) }}>同意</a>
                            <a onClick={() => { this.getAgree(record.sid, 2) }}>不同意</a></div> :
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