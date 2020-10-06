import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card, message } from 'antd'
import { toSourceData } from '../../axios/api'



class WordleMap extends React.Component {
    constructor() {
        super()
        this.state = {
            source: []
        }
    }
    componentDidMount() {
        this.getSource()
    }

    //获取数据
    getSource = async () => {
        try {
            let { status, data, msg } = await toSourceData()
            if (status === '200') {
                for (let item in data) {
                    data[item]['product'] = data[item]['college']
                    data[item]['老师'] = data[item]['teacher']
                    data[item]['学生'] = data[item]['student']
                    data[item]['其他（职工）'] = data[item]['other']
                }
                this.setState({
                    source: data
                })
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        const { source } = this.state
        const options = {
            legend: {},
            tooltip: {},
            dataset: {
                dimensions: ['product', '老师', '学生', '其他（职工）'],
                source
            },
            xAxis: {
                type: 'category',
                name: '学院'
            },
            yAxis: {
                name: "确诊人数"
            },
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
            ]
        };
        return <React.Fragment >
            <Card bordered={false} style={{ width: '100%' }}>
                <h1 style={{ textAlign: 'center', fontSize: '24px' }}>安科疫情图</h1>
                <ReactEcharts
                    option={options}
                    style={{ height: '500px', width: '100%' }}
                />
            </Card>
        </React.Fragment >
    }
}

export default WordleMap