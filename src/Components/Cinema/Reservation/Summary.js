import React, { Component } from 'react';
//import { reactLocalStorage } from 'reactjs-localstorage';
import "./Summary.css";

class Summary extends Component {
    constructor(){
        super()
        console.log("Summary Constructure");
    }

    setStorage = () => {
        let id = this.props.id;

        let itemNormal = [];
        let storageNormal = JSON.parse(localStorage.getItem(id + '_normal'));
        if(storageNormal != null) {
            itemNormal = storageNormal;
        }
        this.props.orderNormal.map( (normal) => {
            itemNormal.push(normal.title);
        });
        let uniqueStorageNormal = itemNormal.filter(function(item, pos) {
            return itemNormal.indexOf(item) == pos;
        })
        console.log("GET ID : " + id + "_normal");
        console.log("storageNormal : ", storageNormal);
        console.log("itemNormal : ", itemNormal);
        console.log("uniqueStorageNormal : ", uniqueStorageNormal);
        

        let itemPremium = [];
        let storagePremium = JSON.parse(localStorage.getItem(id + '_premium'));
        if(storagePremium != null) {
            itemPremium = storagePremium;
        }
        this.props.orderPremium.map( (premium) => {
            itemPremium.push(premium.title);
        });
        let uniqueStoragePremium = itemPremium.filter(function(item, pos) {
            return itemPremium.indexOf(item) == pos;
        });

        console.log("GET ID : " + id + "_premium");
        console.log("storagePremium : ", storageNormal);
        console.log("itemPremium : ", itemNormal);
        console.log("uniqueStoragePremium", uniqueStoragePremium);

        localStorage.setItem(id + '_normal', JSON.stringify(uniqueStorageNormal));
        localStorage.setItem(id + '_premium', JSON.stringify(uniqueStoragePremium));
        
        this.props.onChangeSeatBusy(uniqueStorageNormal, uniqueStoragePremium);
    }

    render() {
        const normalLength = this.props.orderNormal.length;
        const premiumLength = this.props.orderPremium.length;

        return (
            <div>
            {
                this.props.orderNormal.length > 0 || this.props.orderPremium.length > 0  ? (
                    <div className="summary">
                        <h5>Summary</h5>
                        { 
                            normalLength ?
                                <p className="order">
                                    Seat Normal &nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;
                                    { 
                                        this.props.orderNormal.map( (seat, index) => {
                                            return `${ seat.title } ${ index === normalLength - 1?``:`, ` }`;
                                        })
                                    }
                                </p>
                            :'' 
                        }
                        { 
                            premiumLength ?
                                <p className="order">
                                    Seat Premium &nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;
                                    { 
                                        this.props.orderPremium.map( (seat, index) => {
                                            return `${ seat.title } ${ index === premiumLength - 1?``:`, ` }`;
                                        })
                                    }
                                </p>
                            :'' 
                        }
                        {
                            normalLength || premiumLength ? <hr className="hr-summary"/> :''
                        }
                        
                        { 
                            normalLength?
                                <p>Normal (200) &nbsp;&nbsp;x &nbsp; 
                                    { normalLength } &nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp; 
                                    { normalLength* 200 } 
                                </p>
                            :'' 
                        } 
                        { 
                            premiumLength?
                                <p>Premium (350) &nbsp;&nbsp;x &nbsp; 
                                    { premiumLength } &nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp; 
                                    { premiumLength* 350 } 
                                </p>
                            :'' 
                        } 
                        <p className="total">Total &nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp; 
                            { normalLength* 200 + premiumLength* 350 }
                        </p>
                        <button className="btn back-btn up-button green" onClick={ this.setStorage } >
                            <i className="fas fa-chevron-left"></i>
                            &nbsp;Confirm
                        </button>
                    </div>
                ) : ''
            }
            </div>
        );
    }
}

export default Summary;