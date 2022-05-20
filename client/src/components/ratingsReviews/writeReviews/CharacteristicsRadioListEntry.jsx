import React from 'react';
import styled from 'styled-components';

const centerFlex = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const descriptionFlex = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
};

export default function CharacteristicsRadioListEntry({
  characteristicID,
  characteristic,
  characteristicsRadioClick,
}) {
  return (
    <CharContainer>
      <Char>
        <Asterisk>* </Asterisk>
        {`${characteristic}`}
      </Char>
      <CharChoices>
        <div style={centerFlex}>
          <input
            type='radio'
            id={`${characteristic}1`}
            name={characteristicID}
            value='1'
            onClick={characteristicsRadioClick}
          />
          <label htmlFor='size1' style={descriptionFlex}>
            {characteristic === 'Size' && <div> A size too small</div>}
            {characteristic === 'Width' && <div> Too narrow </div>}
            {characteristic === 'Comfort' && <div> Uncomfortable </div>}
            {characteristic === 'Quality' && <div> Poor </div>}
            {characteristic === 'Length' && <div> Runs short </div>}
            {characteristic === 'Fit' && <div> Runs tight </div>}
          </label>
        </div>
        <div style={centerFlex}>
          <input
            type='radio'
            id={`${characteristic}2`}
            name={characteristicID}
            value='2'
            onClick={characteristicsRadioClick}
          />
          <label htmlFor='size2' style={descriptionFlex}>
            {characteristic === 'Size' && <div> ½ a size too small </div>}
            {characteristic === 'Width' && <div> Slightly narrow </div>}
            {characteristic === 'Comfort' && <div> Slightly uncomfortable</div>}
            {characteristic === 'Quality' && <div> Below average </div>}
            {characteristic === 'Length' && <div> Runs slightly short </div>}
            {characteristic === 'Fit' && <div> Runs slightly tight </div>}
          </label>
        </div>
        <div style={centerFlex}>
          <input
            type='radio'
            id={`${characteristic}3`}
            name={characteristicID}
            value='3'
            onClick={characteristicsRadioClick}
          />
          <label htmlFor='size3' style={descriptionFlex}>
            {characteristic === 'Size' && <div> Perfect </div>}
            {characteristic === 'Width' && <div> Perfect </div>}
            {characteristic === 'Comfort' && <div> Ok </div>}
            {characteristic === 'Quality' && <div> What I expected </div>}
            {characteristic === 'Length' && <div> Perfect </div>}
            {characteristic === 'Fit' && <div> Perfect </div>}
          </label>
        </div>
        <div style={centerFlex}>
          <input
            type='radio'
            id={`${characteristic}4`}
            name={characteristicID}
            value='4'
            onClick={characteristicsRadioClick}
          />
          <label htmlFor='size4' style={descriptionFlex}>
            {characteristic === 'Size' && <div> ½ a size too big </div>}
            {characteristic === 'Width' && <div> Slightly wide </div>}
            {characteristic === 'Comfort' && <div> Comfortable </div>}
            {characteristic === 'Quality' && <div> Pretty great </div>}
            {characteristic === 'Length' && <div> Runs slightly long </div>}
            {characteristic === 'Fit' && <div> Runs slightly long </div>}
          </label>
        </div>
        <div style={centerFlex}>
          <input
            type='radio'
            id={`${characteristic}5`}
            name={characteristicID}
            value='5'
            onClick={characteristicsRadioClick}
          />
          <label htmlFor='size5' style={descriptionFlex}>
            {characteristic === 'Size' && <div> A size too wide </div>}
            {characteristic === 'Width' && <div> Too wide </div>}
            {characteristic === 'Comfort' && <div> Perfect </div>}
            {characteristic === 'Quality' && <div> Perfect </div>}
            {characteristic === 'Length' && <div> Runs long </div>}
            {characteristic === 'Fit' && <div> Runs long </div>}
          </label>
        </div>
      </CharChoices>
    </CharContainer>
  );
}

const CharContainer = styled.div`
  margin: 1.5rem 0;
  padding: 0 4rem;
`;

const Char = styled.p`
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
`;

const CharChoices = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  border-bottom: 2px solid black;
  font-size: 0.8rem;
  padding-bottom: 1rem;
`;

const Asterisk = styled.strong`
  color: red;
`;
