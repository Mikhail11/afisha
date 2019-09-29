import React, {Component} from 'react';
import {Radio} from 'antd';

export default class FilmSelector extends Component {
    state = {
        type: 'NowPlayingFilms'
    };

    onItemSelect = ({target}) => {
        this.props.onFilmListSelect(target.value);
    };

    render() {
        return(
            <Radio.Group value={this.props.type} onChange={this.onItemSelect}>
                <Radio.Button value="NowPlayingFilms">В прокате</Radio.Button>
                <Radio.Button value="TopRatedFilms">Рейтинговые</Radio.Button>
                <Radio.Button value="PopularFilms">Популярные</Radio.Button>
                <Radio.Button value="UpcomingFilms">Ожидаемые</Radio.Button>
            </Radio.Group>
        );
    }

};
