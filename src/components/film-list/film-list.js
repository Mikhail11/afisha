import React, {Component} from 'react';
import FilmRow from '../film-row';
import MovieServices from '../../services/movie-services';
import {List, Spin} from 'antd';
import {withRouter} from 'react-router-dom';
import './film-list.css';


class FilmList extends Component {
    state = {
        items: null,
        loading: true
    };

    services = new MovieServices();

    componentDidMount() {
        this.services.getNowPlayingFilms()
            .then((items) => {
                this.setState({
                    items,
                    loading: false
                })
            });
    }

    onRowSelect = (id) => {
        this.props.history.push(`movie/${id}`);
    };

    render() {
        if(this.state.loading) {
            return (
                <div className="spin-container">
                    <Spin size="large" />
                </div>
            );
        } else {
            return (
                <div>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            pageSize: 4,
                        }}
                        dataSource={this.state.items}
                        renderItem={item => (
                            <FilmRow item={item}  onRowSelected={this.onRowSelect}/>
                        )}
                    />
                </div>

            );
        }
    }
}

export default withRouter(FilmList);