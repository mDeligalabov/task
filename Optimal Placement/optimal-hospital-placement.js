function calculateDistance(point1, point2) {
  // Euclidean distance between two points
  return Math.sqrt(
    Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2)
  );
}

function placeHospitals(cityCoordinates) {
  // Pick the first two cities as the initial hospital positions
  let hospital1 = cityCoordinates[0];
  let hospital2 = cityCoordinates[1];

  let changed = true;

  // Find closes hospital helper function
  function closestHospital(city) {
    const distanceToHospital1 = calculateDistance(city, hospital1);
    const distanceToHospital2 = calculateDistance(city, hospital2);
    return distanceToHospital1 < distanceToHospital2 ? hospital1 : hospital2;
  }

  // Iteratively rfind the best placement for each hospital
  while (changed) {
    let sum1 = [0, 0],
      sum2 = [0, 0];
    let count1 = 0,
      count2 = 0;

    // Assign cities to their closest hospitals
    for (let city of cityCoordinates) {
      if (closestHospital(city) === hospital1) {
        sum1[0] += city[0];
        sum1[1] += city[1];
        count1++;
      } else {
        sum2[0] += city[0];
        sum2[1] += city[1];
        count2++;
      }
    }

    // Calculate new centroids
    let newHospital1 =
      count1 > 0 ? [sum1[0] / count1, sum1[1] / count1] : hospital1;
    let newHospital2 =
      count2 > 0 ? [sum2[0] / count2, sum2[1] / count2] : hospital2;

    // Check if the hospitals have changed
    changed =
      calculateDistance(hospital1, newHospital1) > 0.1 ||
      calculateDistance(hospital2, newHospital2) > 0.1;

    hospital1 = newHospital1;
    hospital2 = newHospital2;
  }

  return [hospital1, hospital2];
}

// Test Cities
const cityCoordinates = [
  [100, 200],
  [300, 250],
  [250, 320],
  [120, 50],
  [400, 90],
  [560, 750],
  [550, 850],
  [740, 650],
  [790, 850],
  [950, 550],
];

console.log(placeHospitals(cityCoordinates));
