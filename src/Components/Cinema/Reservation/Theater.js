import React, { Component } from 'react';
import { Link } from "react-router-dom";
//import { reactLocalStorage } from 'reactjs-localstorage';
import axios from "axios";
import "./Theater.css";
import SeatNormal from "./SeatNormal";
import SeatPremium from "./SeatPremium";
import Summary from "./Summary";

class Theater extends Component {
    constructor(props){
        super(props);

        let itemBusyNormal = [];
        let storageBusyNormal = JSON.parse(localStorage.getItem(props.match.params.id + '_normal'));
        if (storageBusyNormal != null) {
            itemBusyNormal = storageBusyNormal;
        }
        console.log("Theater GET ID : " + props.match.params.id + '_normal');
        console.log("Theater storageBusyNormal : ", storageBusyNormal);

        let itemBusyPremium = [];
        let storageBusyPremium = JSON.parse(localStorage.getItem(props.match.params.id + '_premium'));
        if (storageBusyPremium != null) {
            itemBusyPremium = storageBusyPremium;
        }

        console.log("Theater GET ID : " + props.match.params.id + '_premium');
        console.log("Theater storageBusyPremium : ", storageBusyPremium);

        this.state = {
            movie: {},
            genres: [],
            seatNormal: this.setSeatNormal(),
            seatPremium: this.setSeatPremium(),
            orderNormal: [],
            orderPremium: [],
            orderSeat: [],
            busyNormal: itemBusyNormal,
            busyPremium: itemBusyPremium,
            msgSuccess: '',
            msgError: ''
        }
    }

    setSeatNormal = () => {
        const rows = ['A', 'B'];
        return this.calSeat(rows, 200);
    }

    setSeatPremium = () => {
        const rows = ['P'];
        return this.calSeat(rows, 350);
    }

    calSeat = (rows, price) => {
        const items    = [];
        //const numbers  = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
        const numbers  = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

        rows.forEach(function(row){
            numbers.forEach(function(num){
                items.push({
                    "title": row + num,
                    "price": price
                });
            });
        });
    
        return items;
    }

    onStatusNormalToggle = (seat, statusBusy) =>{
        if(statusBusy) {
            let msg = `The chair [${ seat.title }] has been reserved.`;
            this.setMassage('error', msg);
            //alert("The chair has been reserved.");
        } else {
            const newOrderNormal = this.state.orderNormal.slice()
            const seatIndex = this.state.orderNormal.indexOf(seat)
        
            if( seatIndex === -1) {
                newOrderNormal.push(seat)
            } else { 
                newOrderNormal.splice(seatIndex, 1)
            } 
        
            this.setState({
                orderNormal: newOrderNormal,
            })
        }
    }

    setMassage = (type, msg) => {
        if(type === 'error') {
            this.setState({
                msgError: msg,
                msgSuccess: ''
            });
        } else {
            this.setState({
                msgSuccess: msg,
                msgError: ''
            });
        }
        
        window.setTimeout( () => {
            this.setState({
                msgSuccess: '',
                msgError: ''
            });
        }, 5000);
    }

    onStatusPremiumToggle = (seat, statusBusy) =>{
        console.log("handle onStatusPremiumToggle ", seat)
        if(statusBusy) {
            let msg = `The chair [${ seat.title }] has been reserved.`;
            this.setMassage('error', msg);
        } else {
            const neworderPremium = this.state.orderPremium.slice()
            const seatIndex = this.state.orderPremium.indexOf(seat)
        
            if( seatIndex === -1) {
                neworderPremium.push(seat)
            } else { 
                neworderPremium.splice(seatIndex, 1)
            } 
        
            this.setState({
                orderPremium: neworderPremium,
            })
        }
    }

    onClearOrder = (id) =>{
        localStorage.removeItem(id + '_normal');
        localStorage.removeItem(id + '_premium');

        this.setState({
            busyNormal: [],
            busyPremium: [],
            orderNormal: [],
            orderPremium: []
        });

        let msg = `Clear all reservation seats completed.`;
        this.setMassage('success', msg);
    }

    onChangeSeatBusy = (uniqueStorageNormal, uniqueStoragePremium) =>{
        this.setState({
            busyNormal: uniqueStorageNormal,
            busyPremium: uniqueStoragePremium,
            orderNormal: [],
            orderPremium: []
        });

        let msg = `Your chair has been reserve completed.`;
        this.setMassage('success', msg);
    }

    // Makes a call to API to request movie details for the selected movie.
    componentDidMount(){
        let id = this.props.match.params.id;

        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=126293cbe36ad88482598ec4e7595380&language=en-US`)
            .then(response => { 
                this.setState({ 
                    movie: response.data, 
                    genres: response.data.genres 
                });
            }).catch(console.log);
    }

    render(){

        return(
            <section className="theater-info-view">
                <div className="theater-info-backdrop-container">
                <div className="screen card-holder card"> 
                    <span className="txt-screen">Screen</span> 
                    <Summary 
                        id={ this.state.movie.id }
                        orderNormal={ this.state.orderNormal } 
                        orderPremium= { this.state.orderPremium } 
                        onClearOrder={ this.onClearOrder }
                        onChangeSeatBusy={ this.onChangeSeatBusy }
                    />
                </div>

                    <Link to={ `/detail/${ this.state.movie.id }` }>
                        <button className="btn back-btn">
                            <i className="fas fa-chevron-left"></i>
                            <i className="fas fa-chevron-left"></i>
                            &nbsp;BACK
                        </button>
                    </Link>

                    <button 
                        className="btn back-btn up-button" 
                        onClick={ () => this.onClearOrder(this.state.movie.id) } 
                    >
                        <i className="fas fa-chevron-left"></i>
                        &nbsp;Reset
                    </button>

                    {
                        this.state.msgError !== '' ? 
                            <div class="error-msg right padding-right">
                                <i class="fa fa-times-circle"></i>
                                { this.state.msgError }
                            </div>
                         : ''
                    }

                    {
                        this.state.msgSuccess !== '' ? 
                            <div class="success-msg right padding-right">
                                <i class="fa fa-times-circle"></i>
                                { this.state.msgSuccess }
                            </div>
                         : ''
                    }
                    
                </div>

                <div className="theater-info-container">
                    <div className="theater-info-row">
                            <h1 style={{ margin:"0px" }}>
                                { this.state.movie.title } 
                                <span style={{ color:"#888" }}> ({ this.state.movie.release_date }) </span>
                            </h1>
                    </div>

                   <div className="theater-info-row">
                        <div className="genre-list"><b>Seat Price => Normal 200 || Premium 350</b></div>
                    </div>

                    <div className="description-container">
                        <div className="seat-rows">
                            {
                                this.state.seatNormal.map( (seat, i) => {
                                    return(
                                        <SeatNormal 
                                            id={ this.state.movie.id } 
                                            key={ i } 
                                            status={ this.state.orderNormal.includes(seat) } 
                                            statusBusy={ this.state.busyNormal.includes(seat.title) }
                                            onStatusNormalToggle={ this.onStatusNormalToggle }
                                            busyNormal={ this.state.busyNormal }
                                            seat={seat}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className="walk"></div>
                        <div className="seat-rows">
                            {
                                this.state.seatPremium.map( (seat, i) => {
                                    //console.log("busyPremium :", this.state.busyPremium);
                                    //console.log("Title : ", seat.title);
                                    return(
                                        <SeatPremium 
                                            id={ this.state.movie.id } 
                                            key={ i } 
                                            status={ this.state.orderPremium.includes(seat) } 
                                            statusBusy={ this.state.busyPremium.includes(seat.title) }
                                            onStatusPremiumToggle={ this.onStatusPremiumToggle }
                                            seat={ seat }
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Theater;