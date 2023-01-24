const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body){
  const ip = JSON.parse(body).ip;
  return request(`https://ipwho.is/${ip}`);
};

const fetchISSFlyoverTimes = function(body){
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json.?lat=${latitude}&lon=${longitude}`;
  return request(url);
  }

const nextISSTimesForMyLocation = function(body){
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyoverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
};

module.exports = { nextISSTimesForMyLocation };