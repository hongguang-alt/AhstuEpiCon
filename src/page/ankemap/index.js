import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card } from 'antd'

const options = {
    legend: {},
    tooltip: {},
    dataset: {
        dimensions: ['product', '老师', '学生', '其他（职工）'],
        source: [
            { product: '信息与网络工程学院', '老师': 3, '学生': 3, '其他（职工）': 23 },
            { product: '建筑学院', '老师': 4, '学生': 45, '其他（职工）': 34 },
            { product: '财经学院', '老师': 6, '学生': 3, '其他（职工）': 4 },
            { product: '管理学院', '老师': 8, '学生': 45, '其他（职工）': 45 },
            { product: '电气与电子工程学院', '老师': 34, '学生': 45, '其他（职工）': 67 }
        ]
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


class WordleMap extends React.Component {
    render() {
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