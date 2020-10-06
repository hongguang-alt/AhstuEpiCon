import React from 'react'
import { Card, message, Table } from 'antd'
import { allPersonEmail } from '../../axios/api'

class ShowEmail extends React.Component {
    constructor() {
        super()
        this.state = {
            dataSource: []
        }
    }


    componentDidMount() {
        this.getSource()
    }

    getSource = async () => {
        try {
            let { status, msg, data } = await allPersonEmail()
            for (let i in data) {
                data[i]['key'] = data[i]['sid']
            }
            if (status === '200') {
                this.setState({
                    dataSource: data
                })
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { dataSource } = this.state
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '学院',
                dataIndex: 'college',
                key: 'college',
            },
            {
                title: '学号',
                dataIndex: 'sid',
                key: 'sid',
            }, {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
            }, {
                title: '订阅时间',
                dataIndex: 'emailTime',
                key: 'emailTime',
            }]
        return <React.Fragment>
            <Card bordered={false} title='订阅情况查看'>
                <Table columns={columns} dataSource={dataSource} />
            </Card>
        </React.Fragment>
    }
}

export default ShowEmail