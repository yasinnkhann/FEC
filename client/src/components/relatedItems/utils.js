// HELPER FUNCTIONS

// Checks the last item of all products and last item of shown products and checks if they are the same
export function isAtFinalIndex(relatedProducts, visibleProducts) {
  if (relatedProducts && visibleProducts) {
    return relatedProducts[relatedProducts.length - 1]?.data.id === visibleProducts[visibleProducts.length - 1]?.data.id
  }
  return false;
};

// Checks the first item of all products and first item of shown products and checks if they are the same
export function isAtBeginningIndex(relatedProducts, visibleProducts) {
  if (relatedProducts && visibleProducts) {
    return relatedProducts[0]?.data.id === visibleProducts[0]?.data.id
  }
  return false;
};

// Divides width of inner window by width of a card and rounds up to the nearest integer
// then returns it. If the remainder of window width divided by card width is above zero
// then the previous calculation is return, if not then we hard set the return value to 1
export function getMaxIndexBasedOnScreenSize() {
  const width = window.innerWidth;
  const maxIndexBasedOnScreenSize = width % 200 > 0 ? Math.floor(width / 200) : 1;
  return maxIndexBasedOnScreenSize;
};

export function getMaxLengthOfCombinedArrays(arr) {
  return Math.max(...[...arr.map(e => e ? e.length : 0), arr.length]);
}

export function getFeatures(featuresArray) {
  return featuresArray?.map(product => { return product[1].feature; });
};

export function getValues(valuesArray) {
  return valuesArray?.map(product => { return product[1].value; });
};

export function mapProductValues(listToMap) {
  return listToMap.map(currentValue => {
    if (typeof currentValue === 'object' ) {
      return [...Object.entries(currentValue)];
    } else {
      return formatValue(currentValue);
    }
  });
};

export function mapCategories(categoryList) {
  return categoryList.map(product => {
    return formatWord(product);
  });
};

export function formatWord(wordToBeFormatted) {
  let capitalizedWord = capitalize(wordToBeFormatted);
  let formattedWord = capitalizedWord.replace('_', ' ');
  return formattedWord;
};

export function formatValue(valueToFormat) {
  return valueToFormat.toString();
};

export function capitalize(wordToCapitalize) {
  if (typeof wordToCapitalize !== 'string') {
    wordToCapitalize = wordToCapitalize.toString();
  }
  let capitalizedWord = wordToCapitalize.toLowerCase();
  let firstLetter = capitalizedWord.slice(0, 1).toUpperCase();
  capitalizedWord = firstLetter.concat(capitalizedWord.slice(1));
  return capitalizedWord;
};