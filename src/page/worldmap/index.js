import React from 'react'
import ReactEcharts from 'echarts-for-react'
import '../../static/js/china'
import { Card, message, Table } from 'antd'
import { TXdataList, TogetMapListData } from '../../axios/api'



class AnkeMap extends React.Component {
    constructor() {
        super()
        this.state = {
            dataList: [],
            mapListData: []
        }
    }

    componentDidMount() {
        this.getDataList()
        this.getMapListData()
    }

    getDataList = async () => {
        try {
            let { data, status, msg } = await TXdataList()
            if (status === '200') {
                this.setState({
                    dataList: data
                })
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
        }
    }


    getMapListData = async () => {
        try {
            let { data, status, msg } = await TogetMapListData()
            if (status === '200') {
                for (let i in data) {
                    data[i]['key'] = data[i].locationId
                }
                this.setState({
                    mapListData: data
                })
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        const { dataList, mapListData } = this.state
        //地图的参数
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

        //表格的参数
        const columns = [
            { title: '地区', dataIndex: 'provinceName', key: 'provinceName' },
            { title: '累计确诊人数', dataIndex: 'confirmedCount', key: 'confirmedCount' },
            { title: '治愈人数', dataIndex: 'curedCount', key: 'curedCount' },
            { title: '当前确诊人数', dataIndex: 'currentConfirmedCount', key: 'currentConfirmedCount' },
            { title: '死亡人数', dataIndex: 'deadCount', key: 'deadCount' },
            { title: '疑似病例', dataIndex: 'suspectedCount', key: 'suspectedCount' }
        ]
        const dataSource = mapListData

        return <React.Fragment >
            <Card bordered={false} style={{ width: '100%' }}>
                <h1 style={{ textAlign: 'center', fontSize: '24px' }}>疫情表
                    <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>(每35分钟更新)</div>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        expandable={{
                            expandedRowRender: record => {
                                const { cities } = record
                                return cities.map((item, index) => {
                                    return <div style={{ display: 'flex', justifyContent: 'space-between' }} key={index}>
                                        <div style={{ width: "180px" }}>{item.cityName}</div>
                                        <div style={{ width: "100px" }}>{item.confirmedCount}</div>
                                        <div style={{ width: "100px" }}>{item.curedCount}</div>
                                        <div style={{ width: "100px" }}>{item.currentConfirmedCount}</div>
                                        <div style={{ width: "100px" }}>{item.deadCount}</div>
                                        <div style={{ width: "100px" }}>{item.suspectedCount}</div>
                                    </div>
                                })
                            }
                        }}
                    />
                </h1>
            </Card>
            <Card bordered={false} style={{ width: '100%', marginTop: '30px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '24px' }}>
                    全国疫情图
                    <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>（历史累计确诊人数）</div>
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