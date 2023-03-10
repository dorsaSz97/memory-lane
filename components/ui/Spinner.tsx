import React from 'react';
import classes from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={`${classes.lds} self-center`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
