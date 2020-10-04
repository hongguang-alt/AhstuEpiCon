import React from 'react'
import { Card, Table, Space } from 'antd'

class Approval extends React.Component {

    render() {
        const dataSource = [
            {
                date: ["2020-10-04 12:47:47", "2020-10-08 12:47:47"],
                leaveiphone: "17305525291",
                leavereason: "累了",
                leavetype: "comleave",
                name: '汪红光',
                sid: '2702170119',
                college: "信息与网络工程学院",
                key: 1
            }

        ];

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
                    return `${text[0]}———${text[1]}`
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
                        <a >同意</a>
                        <a>不同意</a>
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