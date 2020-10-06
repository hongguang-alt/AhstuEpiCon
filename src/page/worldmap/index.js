import React from 'react'
import ReactEcharts from 'echarts-for-react'
import '../../static/js/china'
import { Card } from 'antd'
import { TXdataList } from '../../axios/api'




class AnkeMap extends React.Component {
    constructor() {
        super()
        this.state = {
            dataList: []
        }
    }
    componentDidMount() {
        this.getDataList()
    }

    getDataList = async () => {
        try {
            let { data, status, msg } = await TXdataList()
            if (status === '200') {
                this.setState({
                    dataList: data
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { dataList } = this.state
        const options = {
            tooltip: {
                triggerOn: "click",
                formatter: function (e, t, n) {
                    return .5 == e.value ? e.name + "：有疑似病例" : e.seriesName + "<br />" + e.name + "：" + e.value
                }
            },
            visualMap: {
                min: 0,
                max: 1000,
                left: 26,
                bottom: 40,
                showLabel: !0,
                text: ["高", "低"],
                pieces: [{
                    gt: 500,
                    label: "> 500 人",
                    color: "#7f1100"
                }, {
                    gte: 100,
                    lte: 500,
                    label: "100 - 500 人",
                    color: "#ff5428"
                }, {
                    gte: 10,
                    lt: 100,
                    label: "10 - 99 人",
                    color: "#ff8c71"
                }, {
                    gt: 0,
                    lt: 10,
                    label: "疑似",
                    color: "#ffd768"
                }, {
                    value: 0,
                    color: "#ffffff"
                }],
                show: !0
            },
            series: [{
                name: "确诊病例",
                mapType: 'china',
                type: "map",
                geoIndex: 0,
                zoom: 1.2,
                data: dataList
            }]
        }
        return <React.Fragment >
            <Card bordered={false} style={{ width: '100%' }}>
                <h1 style={{ textAlign: 'center', fontSize: '24px' }}>
                    全国疫情图
                    <h6>（累计确诊人数）</h6>
                </h1>
                <ReactEcharts
                    option={options}
                    style={{ height: '500px', width: '100%' }}
                />
            </Card>
        </React.Fragment >
    }
}

export default AnkeMap