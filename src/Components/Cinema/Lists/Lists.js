import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { TransitionGroup } from 'react-transition-group';
import { TransitionGroup } from 'react-transition-group';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
import Sliders from "../../Themes/Sliders/Sliders";
import data from "../../../genres";
import hover from "../Hover";
import "./Lists.css";
//import dotenv from 'dotenv';
//import MainSideBar from '../Sidebar/MainSideBar';


export default class List extends Component{
    constructor(props){
        super(props);

        this.state = {
            movieList: [],
            resultList: [],
            page: 1,
            year: {
                label: "year",
                min: 1990,
                max: 2018,
                step: 1,
                value: { min: 2015, max: 2018 }
            },
            rating: {
                label: "rating",
                min: 0,
                max: 10,
                step: 1,
                value: { min: 7, max: 10 }
            },
            genres: data.genres,
            selectedGenre: 28
        }

        this.onChange = this.onChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    // Method to handle user input for Sliders.
    onChange(data){
        this.setState({ [data.type]: { ...this.state[data.type], value: data.value } });
    }

    // Method to handle user input for genre dropdown menu.
    handleGenreChange(input){
        this.setState({ selectedGenre: input });
    }
    
    // Increments the current value of page and calls the submitSearch method for the next page of results.
    nextPage(){
        const { selectedGenre, year, rating } = this.state;
        //console.log('nextPage1 : ', this.state.page);
        setTimeout(() => {
            var page = this.state.page;
            page = page+1;
            //console.log('nextPage1-1 : ', page);

            axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=126293cbe36ad88482598ec4e7595380`
                + `&certification_country=US&sort_by=popularity.desc`
                + `&with_genres=${selectedGenre}`
                + `&primary_release_date.gte=${year.value.min}-01-01&primary_release_date.lte=${year.value.max}-12-31`
                + `&vote_average.gte=${rating.value.min}`
                + `&page=${page}`)
                .then(response => { 
                    console.log('nextPage2: ', response.data.results);
                    this.setState({ 
                        resultList: response.data.results 
                    });
                });
        }, 1000);
    }

    // Sends a request to the server with user-inputted data.
    submitSearch(){
        const { selectedGenre, year, rating } = this.state;

        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=126293cbe36ad88482598ec4e7595380`
            + `&certification_country=US&sort_by=popularity.desc`
            + `&with_genres=${selectedGenre}`
            + `&primary_release_date.gte=${year.value.min}-01-01&primary_release_date.lte=${year.value.max}-12-31`
            + `&vote_average.gte=${rating.value.min}`
            + `&vote_average.lte=${rating.value.max}`)
            .then(response => { 
                this.setState({ 
                    resultList: response.data.results 
                });
            });
    }

    // Pushing DOM element atrributes as a ref into external file so I can use the data.
    pushRef(ref){
        hover.addListener(ref);
    }

    componentDidMount(){
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=126293cbe36ad88482598ec4e7595380`
        axios.get(url)
            .then(res => {
                const results = res.data.results;
                console.log('JSON ResultXX:', results);
                this.setState({
                    movieList: results,
                    resultList: results
                })
            })
    }

    render(){
        const imgURL = "http://image.tmdb.org/t/p/w342";
        const nowPlaying = this.state.movieList.map((movie, i) => {
            return(
                <Link key={i} to={ `/detail/${movie.id}` } style={{ textDecoration: "none", width: "20%"}}>
                    <div className= "movie-card" data-title= { movie.original_title } data-desc= { movie.overview } data-rating= { movie.vote_average } data-backdrop= { `http://image.tmdb.org/t/p/w1280${movie.backdrop_path}` } ref= {(ref) => { this.movie= ref; this.pushRef(ref); } }>
                        <div className= "movie-poster" style= {{ backgroundImage:`url(${ imgURL + movie.poster_path })`, height: "200px" , width: "100%" }}></div>
                        <h4>{ 
                                movie.original_title.length > 20 
                                ? movie.original_title.substring(0,21) + "..." 
                                : movie.original_title
                            }
                        </h4>

                        <div className= "movie-card-info">
                            <p>Release: { movie.release_date.substring(0,4) }</p>
                            <p>Rating: { movie.vote_average }</p>
                        </div>
                    </div>
                </Link>
            )
        });
        const results = this.state.resultList.map((movie, i)=> {
            return(
                <Link key={i} to={ `/detail/${movie.id}` } style={{ textDecoration: "none", width: "20%"}}>
                    <div in="true" className="movie-card" data-title={ movie.original_title } data-desc={ movie.overview } data-rating={ movie.vote_average } data-backdrop={ `http://image.tmdb.org/t/p/w1280${movie.backdrop_path}` } ref={(ref) => { this.movie=ref; this.pushRef(ref); } }>
                        <div className="movie-poster" style={{ backgroundImage:`url(${ imgURL + movie.poster_path })`, height:"200px" , width:"100%" }}></div>
                        <h4>{ 
                                movie.original_title.length > 20 ? movie.original_title.substring(0,21) + "..." 
                                : movie.original_title
                            }
                        </h4>

                        <div className="movie-card-info">
                            <p>Release: { movie.release_date.substring(0,4) }</p>
                            <p>Rating: { movie.vote_average }</p>
                        </div>
                    </div>
                </Link>
            )
        });
        
        return(
            <section className="moviesList-view">
                <div className="backdrop-container">
                    <div className="backdrop-gradient"></div>
                    <div className="overlay"></div>
                    <div className="backdrop-text">
                        <h1 className="backdrop-title" style={{ fontFamily:"Roboto", color: "#FFF", margin: "0px" }}>Title</h1>
                        <span className="backdrop-rating" style={{ color: "red" }}></span>
                        <p className="backdrop-desc" style={{ fontFamily:"Montserrat", color: "#999", width: "55%" }}>Hello, thank you for reading my source code :)</p>
                    </div>
                </div>
                
                <div className="movie-container">
                <InfiniteScroll    
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
                    }
                    refreshFunction={ this.refresh }
                    //hasMore={ true }
                    hasMore={ true }
                    loader={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 14 32 4" width="100vw" height="8" fill="red" preserveAspectRatio="none">
                            <path opacity="0.8" transform="translate(0 0)" d="M2 14 V18 H6 V14z">
                                <animateTransform attributeName="transform" type="translate" values="0 0; 24 0; 0 0" dur="2s" begin="0" repeatCount="indefinite" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                            </path>
                            <path opacity="0.5" transform="translate(0 0)" d="M0 14 V18 H8 V14z">
                                <animateTransform attributeName="transform" type="translate" values="0 0; 24 0; 0 0" dur="2s" begin="0.1s" repeatCount="indefinite" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                            </path>
                            <path opacity="0.25" transform="translate(0 0)" d="M0 14 V18 H8 V14z">
                                <animateTransform attributeName="transform" type="translate" values="0 0; 24 0; 0 0" dur="2s" begin="0.2s" repeatCount="indefinite" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                            </path>
                        </svg>
                    }
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            No more movies!
                        </p>
                    }>
                    <h2 className="heading">Now Playing</h2>
                    <TransitionGroup
                        transitionname="fade"
                        transitionentertimeout={ 750 }
                        transitionleavetimeout={ 500 }>
                        <div className="nowplaying-container" in="true">
                        { nowPlaying }
                        </div>
                    </TransitionGroup> 
                </InfiniteScroll>

                <InfiniteScroll    
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
                    }
                    refreshFunction={ this.refresh }
                    //next={ () => this.nextPage() }
                    hasMore={ true }
                    loader={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 14 32 4" width="100vw" height="8" fill="red" preserveAspectRatio="none">
                            <path opacity="0.8" transform="translate(0 0)" d="M2 14 V18 H6 V14z">
                                <animateTransform attributeName="transform" type="translate" values="0 0; 24 0; 0 0" dur="2s" begin="0" repeatCount="indefinite" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                            </path>
                            <path opacity="0.5" transform="translate(0 0)" d="M0 14 V18 H8 V14z">
                                <animateTransform attributeName="transform" type="translate" values="0 0; 24 0; 0 0" dur="2s" begin="0.1s" repeatCount="indefinite" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                            </path>
                            <path opacity="0.25" transform="translate(0 0)" d="M0 14 V18 H8 V14z">
                                <animateTransform attributeName="transform" type="translate" values="0 0; 24 0; 0 0" dur="2s" begin="0.2s" repeatCount="indefinite" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                            </path>
                        </svg>
                    }
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            No more movies!
                        </p>
                    }>
                    <h2 className="heading">Results</h2>
                    <TransitionGroup
                        className="results-container"
                        transitionname="fade"
                        transitionentertimeout={ 750 }
                        transitionleavetimeout={ 500 }>
                        { results }
                    </TransitionGroup> 
                </InfiniteScroll>
                </div>

        
                <div className="filters">
                <h1 id="reactflix">CINEMAFLIX</h1>

                <div>
                    <h1>Favorite</h1>
                </div>

                
                <div className="genre-container">
                    <p style={{ fontFamily: "Montserrat", fontSize: "14px" }}>Genre</p>
                    <select className="genre-menu" value={ this.state.genre } onChange={ (e)=> this.handleGenreChange(e.target.value) }>
                        {
                            this.state.genres.map(genre=> (
                                <option key={ genre.id } value={ genre.id }>{ genre.name }</option>
                            ))
                        }
                    </select>
                </div>

                <div className="sliders-container">
                    <Sliders 
                        onChange={ this.onChange } 
                        data={ this.state.year } 
                    />
                    <Sliders 
                        onChange={ this.onChange } 
                        data={ this.state.rating } 
                    />
                </div>

                <button onClick={ () => this.submitSearch() } className="btn submit-btn">FIND MOVIES</button>   
            </div>


            </section>
        )
    }
}