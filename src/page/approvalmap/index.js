import React from 'react'
import ReactEchart from 'echarts-for-react'
import { Card, message } from 'antd'
import moment from 'moment';
import { TogetArrBySeven } from '../../axios/api'

const getSevenArr = () => {
    let d = new Date()
    let arr = []
    arr[0] = moment(d).format('YYYY-MM-DD HH:mm:ss')
    for (let i = 1; i < 14; i++) {
        arr[i] = moment(d.setDate(d.getDate() - 1)).format('YYYY-MM-DD HH:mm:ss')
    }
    return arr.reverse()
}

class ApprovalMap extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
            allData: {},
            sevenDateArr: []
        }
    }

    componentDidMount() {
        this.getAllData()
    }


    getAllData = async () => {
        let sevenDateArr = getSevenArr()
        this.setState({
            sevenDateArr
        })
        try {
            let { status, msg, data } = await TogetArrBySeven({ sevenDateArr })
            if (status === '200') {
                this.setState({
                    allData: data
                })
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        const { allData, sevenDateArr } = this.state
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['高风险', '中风险', '低风险']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                data: sevenDateArr,
                name: '日期'
            },
            yAxis: {
                type: 'value',
                name: '人数'
            },
            series: [
                {
                    name: '高风险',
                    type: 'line',
                    // data: [120, 132, 101, 134, 90, 230, 210]
                    data: allData.heigh || []
                },
                {
                    name: '中风险',
                    type: 'line',
                    // data: [220, 182, 191, 234, 290, 330, 310]
                    data: allData.mid || []
                },
                {
                    name: '低风险',
                    type: 'line',
                    // data: [150, 232, 201, 154, 190, 330, 410]
                    data: allData.low || []
                }
            ]
        };
        return (
            <React.Fragment>
                <Card bordered={false} style={{ width: "100%" }} >
                    <h1 style={{ textAlign: 'center', fontSize: '24px' }}>安科请假风险图</h1>
                    <ReactEchart
                        option={option}
                        style={{ height: '500px', width: '100%' }}
                    />
                </Card>
            </React.Fragment>
        );
    }
}

export default ApprovalMap