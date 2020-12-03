import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'

//国际化配置
import { ConfigProvider } from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import locale from 'antd/es/locale/zh_CN'

import './index.css'
import 'antd/dist/antd.css'
import Login from './login'
import Home from './home'

class App extends React.Component {
    render() {
        return <React.Fragment>
            <HashRouter>
                <Switch>
                    <Route path='/' exact component={Login} />
                    <Route path='/home/:key' exact component={Home} />
                    <Route component={() => { return <div>404</div> }} />
                </Switch>
            </HashRouter>
        </React.Fragment>
    }
}

ReactDOM.render(
    <ConfigProvider locale={locale}>
        <App />
    </ConfigProvider>, document.getElementById('root'))