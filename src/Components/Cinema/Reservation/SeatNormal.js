import React, { useState } from 'react';
import "./Seat.css";

const SeatNormal = (props) => {

  return (
    <div className="seat">
        <div className={ 
              props.statusBusy === true?
              `seat-busy`
              : props.status === true?`seat-order`:`seat-available`
            } 
          onClick={ () => props.onStatusNormalToggle(props.seat, props.statusBusy) } 
        >
        </div>
        <span>{ props.seat.title }</span>
    </div>
  );

};

export default SeatNormal;