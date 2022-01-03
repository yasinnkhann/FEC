import React from 'react';
import styled from 'styled-components';

const starStyle = {
<<<<<<< HEAD
  display: 'flex',
  marginLeft: '2px',
  marginRight: '2px',
  width: '30px',
  textAlign: 'center',
  borderRadius: '40px',
  padding: '5px',
  fontSize: '10px',
  border: 'none',
  boxShadow: '2px 2px 4px gold',
  cursor: 'pointer',
=======
  display: 'flex', marginLeft: '2px', marginRight: '2px', width: '30px', textAlign: 'center', borderRadius: '40px', padding: '5px', fontSize: '10px', border: 'none', boxShadow: '2px 2px 4px green', cursor: 'pointer',
>>>>>>> 7fe18248cadcc7c5e921efed9a1c972c932dc56e
};

const StarFilterEntry = (props) => (
  <div id={`${props.star}`} aria-hidden="true" style={starStyle} onClick={props.sortByStar}>
    <div style={{ textAlign: 'center' }}>{`${props.star} stars`}</div>
  </div>
);

export default StarFilterEntry;
