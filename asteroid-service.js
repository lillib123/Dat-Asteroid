(function(){
  function AsteroidService($http) {
    var asteroidData;
    var arrayLength;
    var asteroidArray = [];
    return {
      makeRequest: makeRequest
    };
    function makeRequest() {
      return $http({
        method: "GET",
        url: "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=WJqgdCXy65yXJVQE6Se8wR4TmyDe6SqNONYiN4ef"
      }).then(function(response) {
        asteroidData = response;
        var arrayLength = asteroidData.data.near_earth_objects.length;
        var randomNumber = Math.floor(Math.random() * arrayLength);
        // console.log(asteroidData.data.near_earth_objects[0].close_approach_data[0]);

      for(var i=0; i< asteroidData.data.near_earth_objects[randomNumber].close_approach_data.length; i++) {
        asteroidArray.push(asteroidData.data.near_earth_objects[randomNumber].close_approach_data[i].close_approach_date);
        asteroidArray.push(asteroidData.data.near_earth_objects[randomNumber].close_approach_data[i].relative_velocity.kilometers_per_hour);
        asteroidArray.push(asteroidData.data.near_earth_objects[randomNumber].close_approach_data[i].relative_velocity.miles_per_hour);
        asteroidArray.push(asteroidData.data.near_earth_objects[randomNumber].close_approach_data[i].miss_distance.astronomical);
        asteroidArray.push(asteroidData.data.near_earth_objects[randomNumber].close_approach_data[i].miss_distance.miles);
        asteroidArray.push(asteroidData.data.near_earth_objects[randomNumber].close_approach_data[i].miss_distance.kilometers);
        asteroidArray.push(asteroidData.data.near_earth_objects[randomNumber].close_approach_data[i].orbiting_body);
      }
      console.log(asteroidArray);
        //display random asteroid data ^^^

      });
    }

  }
  angular
  .module("app")
  .factory("AsteroidService", AsteroidService);
})();
