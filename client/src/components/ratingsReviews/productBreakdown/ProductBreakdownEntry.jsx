import React from 'react';
import styled from 'styled-components';

export default function ProductBreakdownEntry({ characteristic }) {
  const charName = characteristic[0];
  const charVal = characteristic[1].value;

  const characteristicStats = string => {
    return (Math.round(Number(string) * 4) / 4).toFixed(2);
  };

  const leftSideTiers = {
    Comfort: 'Uncomfortable',
    Fit: 'Runs tight',
    Length: 'Runs short',
    Quality: 'Poor',
    Size: 'Too small',
    Width: 'Too narrow',
  };

  const midSideTiers = {
    Fit: 'Perfect',
    Length: 'Perfect',
    Size: 'Perfect',
    Width: 'Perfect',
  };

  const rightSideTiers = {
    Comfort: 'Perfect',
    Fit: 'Runs long',
    Length: 'Runs long',
    Quality: 'Perfect',
    Size: 'Too wide',
    Width: 'Too wide',
  };

  return (
    <BreakdownContainer>
      <CharHeader>{charName}</CharHeader>
      <TierContainer>
        <LeftTier>{leftSideTiers[charName]}</LeftTier>
        {midSideTiers[charName] && <MidTier>{midSideTiers[charName]}</MidTier>}
        <RightTier>{rightSideTiers[charName]}</RightTier>
      </TierContainer>
      <Bar>
        <ArrowUp
          className='fa fa-caret-up'
          marginLeft={`${(characteristicStats(charVal) / 5) * 100 - 2}%}`}
        />
      </Bar>
    </BreakdownContainer>
  );
}

const CharHeader = styled.div`
  font-size: 1rem;
  color: #fdf0d5;
  text-decoration: underline;
`;

const TierContainer = styled.div`
  display: flex;
  color: #b1a9ac;
  margin: 0.5rem 0;
  font-size: 0.8rem;
`;

const Bar = styled.div`
  height: 0.5rem;
  width: 100%;
  border: none;
  background-color: rgba(232, 232, 232, 0.8);
`;

const RightTier = styled.div`
  margin-left: 0.5rem;
  text-align: right;
  margin-left: auto;
  position: relative;
  color: #fdf0d5;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const MidTier = styled.div`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  color: #fdf0d5;
  font-size: 0.8rem;
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const LeftTier = styled.div`
  margin-right: 0.5rem;
  position: relative;
  color: #fdf0d5;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const BreakdownContainer = styled.div`
  margin-bottom: 1rem;
`;

const ArrowUp = styled.span`
  margin-left: ${props => props.marginLeft};
  color: #fdf0d5;
  font-size: 2rem;
`;
