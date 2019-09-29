import React, {Component} from 'react';
import './film-detail.css';
import {Row, Col, Spin, Card} from 'antd';
import MovieServices from "../../services/movie-services";

export default class FilmDetail extends Component {
    state = {
        details: null,
        loading: true
    };
    services = new MovieServices();

    componentDidMount() {
        this.updateDetails(this.props.id);
    }

    updateDetails(id) {
        this.services.getFilm(id)
            .then((details) => {
                this.setState({
                    details,
                    loading: false
                })
            });
    }

    render() {
        const {details} = this.state;
        if(this.state.loading) {
            return (
                <div className="spin-container">
                    <Spin size="large" />
                </div>
            );
        } else {
            const genres = details.genres.map((item) => item.name).join(', ');
            const contries = details.productionCountries.map((item) => item.name).join(', ');
            return (
                <Row type="flex" justify="center">
                    <Col md={{ span: 16 }} xs={{ span: 24 }}>
                        <Card title={details.title}>
                            <div className="film-deatail__container">
                               <Row>
                                   <Col md={{ span: 10 }} xs={{ span: 24 }}>
                                        <img style={{width: 154}}
                                             src={details.posterPath}
                                        />
                                   </Col>
                                   <Col md={{ span: 12 }} xs={{ span: 24 }}>
                                       <div className="film-deatail__props-list">
                                           <PropsItem  propName="Бюджет" propValue={details.budget + '$'}/>
                                           <PropsItem  propName="Премьера" propValue={details.releaseDate}/>
                                           <PropsItem  propName="Рейтинг" propValue={details.voteAverage}/>
                                           <PropsItem  propName="Жанр" propValue={genres}/>
                                           <PropsItem  propName="Страна" propValue={contries}/>
                                       </div>
                                   </Col>
                               </Row>
                               <Row className="film-deatail__props-overview">
                                   <Col md={{ span: 24 }} xs={{ span: 24 }}>
                                       <p>{details.overview}</p>
                                   </Col>
                               </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            );
        }
    }

}

const PropsItem = ({propName, propValue}) => {
  return (
      <div className="film-deatail__props-item">
          <div className="film-deatail__props-key">{propName}:</div>
          <div className="film-deatail__props-value">{propValue}</div>
      </div>
  );
};