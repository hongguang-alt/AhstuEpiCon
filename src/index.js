import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import './index.css'
import 'antd/dist/antd.css'
import Login from './login'
import Home from './home'

class App extends React.Component {
    render() {
        return <React.Fragment>
            <HashRouter>
                <Route path='/' exact component={Login} />
                <Route path='/home' exact component={Home} />
            </HashRouter>
        </React.Fragment>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))