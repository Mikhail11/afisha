import React from 'react';
import FilmList from '../film-list';
import FilmDetail from '../film-detail';
import ErrorBoundry from '../error-boundry';
import {Layout} from 'antd';
import {BrowserRouter as Router, Route} from 'react-router-dom';
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
                <Router>
                    <Route path="/" exact component={FilmList} />
                    <Route path="/movie/:id" render={({match})=> {
                        const {id} = match.params;
                        return <FilmDetail id={id} />
                    }} />
                </Router>
                </ErrorBoundry>
            </Content>
            <Footer />
        </Layout>

    );
};

export default App;