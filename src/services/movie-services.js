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
        const widthPath = `w${width}`;
        return `${this._imageBase}${widthPath}${image}`;
    };

    getFilm = async(id) => {
        const url = `${id}?${this._token}&${this._language}`;
        const res = await this.getResource(url);
        return this._transformFilmDetails(res);
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
        const dateFormat = new Date(film.release_date);
        const monthName = dateFormat.toLocaleString('ru', {
            month: 'long'
        }).slice(0, 3) + '.';

        return {
            id: film.id,
            title: film.title,
            overview: film.overview,
            releaseDate: `${dateFormat.getDay()} ${monthName} ${dateFormat.getFullYear()}`,
            posterPath: this.getImage(film.poster_path, 154),
            backdropPath: this.getImage(film.backdrop_path, 154),
            voteAverage: film.vote_average,
            voteCount: film.vote_count
        };
    };

    _transformFilmDetails = (film) => {
        const dateFormat = new Date(film.release_date);
        const monthName = dateFormat.toLocaleString('ru', {
            month: 'long'
        }).slice(0, 3) + '.';

        return {
            id: film.id,
            title: film.title,
            overview: film.overview,
            releaseDate: `${dateFormat.getDay()} ${monthName} ${dateFormat.getFullYear()}`,
            posterPath: this.getImage(film.poster_path, 154),
            backdropPath: this.getImage(film.backdrop_path, 1280),
            voteAverage: film.vote_average,
            voteCount: film.vote_count,
            genres: film.genres,
            productionCountries: film.production_countries,
            budget: film.budget
        };
    };
}