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
            {characteristic === 'Size' && <CharTag> A size too small</CharTag>}
            {characteristic === 'Width' && <CharTag> Too narrow </CharTag>}
            {characteristic === 'Comfort' && <CharTag> Uncomfortable </CharTag>}
            {characteristic === 'Quality' && <CharTag> Poor </CharTag>}
            {characteristic === 'Length' && <CharTag> Runs short </CharTag>}
            {characteristic === 'Fit' && <CharTag> Runs tight </CharTag>}
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
            {characteristic === 'Size' && (
              <CharTag> ½ a size too small </CharTag>
            )}
            {characteristic === 'Width' && <CharTag> Slightly narrow </CharTag>}
            {characteristic === 'Comfort' && (
              <CharTag> Slightly uncomfortable</CharTag>
            )}
            {characteristic === 'Quality' && <CharTag> Below average </CharTag>}
            {characteristic === 'Length' && (
              <CharTag> Runs slightly short </CharTag>
            )}
            {characteristic === 'Fit' && (
              <CharTag> Runs slightly tight </CharTag>
            )}
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
            {characteristic === 'Size' && <CharTag> Perfect </CharTag>}
            {characteristic === 'Width' && <CharTag> Perfect </CharTag>}
            {characteristic === 'Comfort' && <CharTag> Ok </CharTag>}
            {characteristic === 'Quality' && (
              <CharTag> What I expected </CharTag>
            )}
            {characteristic === 'Length' && <CharTag> Perfect </CharTag>}
            {characteristic === 'Fit' && <CharTag> Perfect </CharTag>}
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
            {characteristic === 'Size' && <CharTag> ½ a size too big </CharTag>}
            {characteristic === 'Width' && <CharTag> Slightly wide </CharTag>}
            {characteristic === 'Comfort' && <CharTag> Comfortable </CharTag>}
            {characteristic === 'Quality' && <CharTag> Pretty great </CharTag>}
            {characteristic === 'Length' && (
              <CharTag> Runs slightly long </CharTag>
            )}
            {characteristic === 'Fit' && (
              <CharTag> Runs slightly long </CharTag>
            )}
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
            {characteristic === 'Size' && <CharTag> A size too wide </CharTag>}
            {characteristic === 'Width' && <CharTag> Too wide </CharTag>}
            {characteristic === 'Comfort' && <CharTag> Perfect </CharTag>}
            {characteristic === 'Quality' && <CharTag> Perfect </CharTag>}
            {characteristic === 'Length' && <CharTag> Runs long </CharTag>}
            {characteristic === 'Fit' && <CharTag> Runs long </CharTag>}
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

const CharTag = styled.p`
  margin-top: 0.5rem;
`;
