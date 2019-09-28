import React, {Component} from 'react';
import FilmRow from '../film-row';
import MovieServices from '../../services/movie-services';
import {List, Spin} from 'antd';


export default class FilmList extends Component {
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

    render() {
        if(this.state.loading) {
            return (
                <div>
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
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 6,
                        }}
                        dataSource={this.state.items}
                        renderItem={item => (
                            <FilmRow item={item} />
                        )}
                    />
                </div>

            );
        }
    }
}