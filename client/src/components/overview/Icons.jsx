import React from 'react';
import PinterestIcon from '@material-ui/icons/Pinterest';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import styled from 'styled-components';

const ShareIconDiv = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: space-around;
`;

const FBIcon = styled.button`
  color: white;
  background: #3b5998;
  border: none;
  &:hover {
    transform: scale(1.1);
  }
`;

const PinIcon = styled.button`
  color: white;
  background: #c8232c;
  border: none;
  &:hover {
    transform: scale(1.1);
  }
`;

const TwitIcon = styled.button`
  color: white;
  background: #00acee;
  border: none;
  &:hover {
    transform: scale(1.1);
  }
`;

const GramIcon = styled.button`
  border: none;
  color: white;
  background: #f09433;
  background: -moz-linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  background: -webkit-linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  &:hover {
    transform: scale(1.1);
  }
`;

export default function Icons() {
  return (
    <ShareIconDiv>
      <FBIcon>
        <FacebookIcon />
      </FBIcon>
      <GramIcon>
        <InstagramIcon />
      </GramIcon>
      <TwitIcon>
        <TwitterIcon />
      </TwitIcon>
      <PinIcon>
        <PinterestIcon />
      </PinIcon>
    </ShareIconDiv>
  );
}
