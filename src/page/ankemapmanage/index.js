import React from 'react'
import { Card, Table, Input, InputNumber, Popconfirm, Form } from 'antd'
import { toSourceData, ToChangePerson } from '../../axios/api'


class AnkeMapManage extends React.Component {
    formRef = React.createRef()
    constructor() {
        super()
        this.state = {
            info: [],
            editingKey: ''
        }
    }

    componentDidMount() {
        this.getSource()
    }


    isEditing = (record) => record.key === this.state.editingKey


    edit = (record) => {
        this.formRef.current.setFieldsValue({
            college: '',
            student: '',
            teacher: '',
            other: '',
            ...record,
        })
        this.setState({
            editingKey: record.key
        })
    }


    cancel = () => {
        this.setState({
            editingKey: ''
        })
    }

    EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                        children
                    )}
            </td>
        );
    }

    save = async (key) => {
        const { info } = this.state
        try {
            const row = await this.formRef.current.validateFields();
            const newData = [...info];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                this.setState({
                    info: newData,
                    editingKey: ''
                })
                this.saveChange()
            } else {
                newData.push(row)
                this.setState({
                    info: newData,
                    editingKey: ''
                })
                this.saveChange()
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };


    saveChange = async () => {
        const { info } = this.state
        try {
            let res = await ToChangePerson(info)
        } catch (e) {
            console.log(e)
        }
    }

    getSource = async () => {
        try {
            let { status, data, msg } = await toSourceData()
            if (status === '200') {
                for (let item in data) {
                    data[item]['key'] = data[item]['_id']
                }
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
        const columns = [
            {
                title: '学院',
                dataIndex: 'college',
                key: 'college',
                editable: false,
            },
            {
                title: '学生',
                dataIndex: 'student',
                key: 'student',
                editable: true,
            },
            {
                title: '老师',
                dataIndex: 'teacher',
                key: 'teacher',
                editable: true,
            }, {
                title: '其他（职工）',
                dataIndex: 'other',
                key: 'other',
                editable: true,
            }, {
                title: '操作',
                dataIndex: 'operation',
                render: (_, record) => {
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                            <a
                                onClick={() => this.save(record.key)}
                                style={{
                                    marginRight: 8,
                                }}
                            >
                                保存
                      </a>
                            <Popconfirm title="确定取消?" onConfirm={this.cancel}>
                                <a>取消</a>
                            </Popconfirm>
                        </span>
                    ) : (
                            <a disabled={this.state.editingKey !== ''} onClick={() => this.edit(record)}>
                                编辑
                            </a>
                        );
                },
            },
        ]

        const mergedColumns = columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    inputType: col.dataIndex === 'student' || col.dataIndex === 'teacher' || col.dataIndex === 'other' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        })
        return <React.Fragment >
            <Card bordered={false} style={{ width: '100%' }} title='安科生病人数填报'>
                <Form ref={this.formRef} component={false}>
                    <Table
                        dataSource={info}
                        components={{
                            body: {
                                cell: this.EditableCell
                            },
                        }}
                        bordered
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: this.cancel
                        }}
                    />
                </Form>
            </Card>
        </React.Fragment >
    }
}

export default AnkeMapManage