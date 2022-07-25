import React, { lazy, Suspense } from 'react';

const CharacteristicsRadioListEntry = lazy(() =>
  import('./CharacteristicsRadioListEntry.jsx')
);

const CharacteristicsRadioList = ({ metaData, characteristicsRadioClick }) => (
  <>
    {Object.keys(metaData.characteristics).map((characteristic, index) => (
      <Suspense key={index} fallback={<></>}>
        <CharacteristicsRadioListEntry
          characteristicID={metaData.characteristics[characteristic].id}
          characteristic={characteristic}
          characteristicsRadioClick={characteristicsRadioClick}
          key={index}
        />
      </Suspense>
    ))}
  </>
);

export default CharacteristicsRadioList;
