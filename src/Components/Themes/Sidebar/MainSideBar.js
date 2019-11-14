import React, { Component } from 'react';
import Sliders from "../Sliders/Sliders";
import data from "../../../genres";

class MainSideBar extends Component {
    constructor(props){
        super(props);

        this.state = {
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
            runtime: {
                label: "runtime",
                min: 0,
                max: 200,
                step: 15,
                value: { min: 60, max: 120 }
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
        
    }

    submitSearch = () => {
        console.log('SubmitSearch');
    }

    render() {
        return (
            <div className="filters">
                <h1 id="reactflix">CINEMAFLIX</h1>
                
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

                    <Sliders 
                        onChange={ this.onChange } 
                        data={ this.state.runtime } 
                    />
                </div>

                <button onClick={ () => this.submitSearch() } className="btn submit-btn">FIND MOVIES</button>   
            </div>
        );
    }
}

export default MainSideBar;