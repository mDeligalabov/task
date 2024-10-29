const calculateEstimation = (criteria, totalRequests, dataMaps) => {
  const { countries, browsernames, platformnames, vertical } = criteria;

  const sumPercentages = (dimensionData, keys) => {
    let totalPercentForDimension = 0;

    for (const key of keys) {
      totalPercentForDimension += dimensionData.get(key) ?? 0;
    }

    return totalPercentForDimension;
  };
 
  // Get percentage of requests per dimension
  const countriesSum = countries
    ? sumPercentages(dataMaps.countries, countries)
    : 1;
  const browsernameSum = browsernames
    ? sumPercentages(dataMaps.browsername, browsernames)
    : 1;
  const platformnameSum = platformnames
    ? sumPercentages(dataMaps.platformname, platformnames)
    : 1;
  const verticalSum = vertical
    ? sumPercentages(dataMaps.vertical, vertical)
    : 1;

  // Calculate total percentage accross dimensions
  const matchingPercentageTotal =
    (countriesSum * browsernameSum * platformnameSum * verticalSum);

  // Estimate traffic based on fitting percentage
  return Math.round(totalRequests * matchingPercentageTotal);
};

export { calculateEstimation };
