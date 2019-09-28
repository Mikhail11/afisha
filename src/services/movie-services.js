export default class MovieService {
    _apiBase = 'https://api.themoviedb.org/3/movie/';
    _region = 'region=RU';
    _language = 'language=ru-RU';
    _token = 'api_key=2b626389647fb4c4d2ddf1fe0db8edd7';
    _imageBase = 'https://image.tmdb.org/t/p/';

    getResource = async(url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}`)
        }

        return await res.json()
    };

    getImage = (image, width = '92') => {
        const widthPath = `w${width}/`;
        return `${this._imageBase}${widthPath}${image}`;
    };

    getFilmList = async(type, page) => {
        const url = `${type}?${this._token}&${this._language}&${this._region}&page=${page}`;
        return await this.getResource(url);
    };

    getNowPlayingFilms = async(page=1) => {
        const res = await this.getFilmList('now_playing', page);
        return res.results.map((film) => this._transformFilms(film));
    };

    getTopRatedFilms = async(page=1) => {
        const res = await this.getFilmList('top_rated', page);
        return res.results.map((film) => this._transformFilms(film));
    };

    getPopularFilms = async(page=1) => {
        const res = await this.getFilmList('popular', page);
        return res.results.map((film) => this._transformFilms(film));
    };

    getUpcomingFilms = async(page=1) => {
        const res = await this.getFilmList('upcoming');
        return res.results.map((film) => this._transformFilms(film));
    };

    _transformFilms = (film) => {
        return {
            id: film.id,
            title: film.title,
            overview: film.overview,
            releaseDate: film.release_date,
            posterPath: this.getImage(film.poster_path, 154),
            backdropPath: this.getImage(film.backdrop_path, 154),
            voteAverage: film.vote_average,
            voteCount: film.vote_count
        };
    };
}