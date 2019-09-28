import React from 'react';
import FilmList from '../film-list';
import ErrorBoundry from '../error-boundry';
import {Layout} from 'antd';
import 'antd/dist/antd.css';
import './app.css'

const {Header, Content, Footer} = Layout;
const App = () => {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" >
                    <h2 className="logo-text">Киноафиша</h2>
                </div>
            </Header>
            <Content className="content">
                <ErrorBoundry>
                    <FilmList />
                </ErrorBoundry>
            </Content>
            <Footer />
        </Layout>

    );
};

export default App;