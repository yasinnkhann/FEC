
import React, {Component} from 'react';
import PinterestIcon from '@material-ui/icons/Pinterest';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import styled from 'styled-components';

// const ShareIcon = styled.button `
//   height: 20px;
//   margin: 5px;
//   width: 20px;
//   border-radius: 50%;
// `;

const ShareIconDiv = styled.div `
  padding-left: 1rem;
`;
const FBIcon = styled.button `
  margin: 0.5rem;
  color: white;
  background: #3b5998;
`;
const PinIcon = styled.button `
  margin: 0.5rem;
  color: white;
  background: #c8232c;
`;
const TwitIcon = styled.button `
  margin: 0.5rem;
  color: white;
  background: #00acee;
`;
const GramIcon = styled.button `
margin: 0.5rem;
color: white;
background: #f09433;
background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
`;


export default function Icons() {
  return (
    <ShareIconDiv>
      <FBIcon><FacebookIcon/></FBIcon>
      <GramIcon><InstagramIcon/></GramIcon>
      <TwitIcon><TwitterIcon/></TwitIcon>
      <PinIcon><PinterestIcon/></PinIcon>
    </ShareIconDiv>
  );
}



// @material-ui/icons components
// core components

// import componentStylesButtons from 'assets/theme/components/button.js';

// const useStylesButtons = makeStyles(componentStylesButtons);

