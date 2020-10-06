import React from 'react'
import { Map } from 'react-amap'
import { Card } from 'antd'
import { Cascader, Button, message } from 'antd';
const AMAP_KEY = '8ca44e4b3ae1d3e186d6ebf4e89301ca'
import './index.css'
import { toGetCityOption } from '../../axios/api'

class VacFind extends React.Component {
    constructor() {
        super()
        this.state = {
            text: '',
            cityOption: []
        }
        this.amapEvents = () => {
            return {
                created: (mapInstance) => {
                    this.mapInstance = mapInstance
                }
            }
        }
    }

    componentDidMount() {
        this.getCityOption()
    }

    getCityOption = async () => {
        try {
            let { status, msg, data } = await toGetCityOption()
            if (status === '200') {
                this.setState({
                    cityOption: data
                })
            } else {
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
        }
    }

    //改变搜索的位置
    onChange = (value, selectedOptions) => {
        this.setState({
            text: selectedOptions.map(o => o.label).join(', '),
        });
    };

    //点击搜索医院疫苗地址
    Search = () => {
        window.AMap.service(["AMap.PlaceSearch"], () => {
            //构造地点查询类
            var placeSearch = new AMap.PlaceSearch({
                pageSize: 5, // 单页显示结果条数
                pageIndex: 1, // 页码
                // city: "010", // 兴趣点城市
                // citylimit: true,  //是否强制限制在设置的城市内搜索
                map: this.mapInstance, // 展现结果的地图实例
                panel: "panel", // 结果列表将在此容器中进行展示。
                autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
            });
            //关键字查询
            placeSearch.search(this.state.text);
        });
    }

    render() {
        const { text, cityOption } = this.state
        const plugins = [
            'MapType',
            'Scale',
            'OverView',
            'ControlBar', // v1.1.0 新增
            {
                name: 'ToolBar',
                options: {
                    visible: true,  // 不设置该属性默认就是 true
                    onCreated(ins) {
                        // console.log(ins);
                    },
                },
            },

        ]
        return <React.Fragment>
            <Card bordered={false} title='疫苗地点查询' style={{ width: '100%' }}>
                {this.state.text}
                &nbsp;
                <Cascader
                    options={cityOption}
                    onChange={this.onChange}
                >
                    <a href="#">选择城市</a>
                </Cascader>
                <Button type="primary" size='small' disabled={text === ''} style={{ marginLeft: '10px' }} onClick={() => { this.Search() }}>
                    搜索
                </Button>
                <div style={{ height: '500px', marginTop: '20px' }}>
                    <Map
                        events={this.amapEvents()}
                        amapkey={AMAP_KEY}
                        plugins={plugins}
                    >
                        <div id='panel'></div>
                    </Map>
                </div>
            </Card>
        </React.Fragment>
    }
}

export default VacFind