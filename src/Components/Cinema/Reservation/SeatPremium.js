import React, { useState } from 'react';
import "./Seat.css";

const SeatPremium = (props) => {

  return (
    <div className="seat">
        <div className={ 
              props.statusBusy === true?
              `seat-platinium-busy`
              : props.status === true?`seat-platinium-order`:`seat-platinium-available`
            } 
          onClick={ () => props.onStatusPremiumToggle(props.seat, props.statusBusy) } 
        ></div>
        <span>{ props.seat.title }</span>
    </div>
  );

};

export default SeatPremium;