(function(){
  function AsteroidService($http) {
    var asteroidData;
    var arrayLength;
    var asteroidArray = [];
    var moreAsteriod = [];
    return {
      makeRequest: makeRequest,
      getData: getData
    };
    function makeRequest() {
      return $http({
        method: "GET",
        url: "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=WJqgdCXy65yXJVQE6Se8wR4TmyDe6SqNONYiN4ef"
      }).then(function(response) {
        asteroidData = response;
        console.log(asteroidData);
        var asteroidObj;
        var arrayLength = asteroidData.data.near_earth_objects.length;
        var randomNumber = Math.floor(Math.random() * arrayLength);
        asteroidArray.push("Name: " + asteroidData.data.near_earth_objects[randomNumber].name);
        if (asteroidData.data.near_earth_objects[randomNumber].is_potentially_hazardous_asteroid === true){
          asteroidArray.push("Is potentially hazardous? Yes");
        } else if (asteroidData.data.near_earth_objects[randomNumber].is_potentially_hazardous_asteroid === false){
          asteroidArray.push("Is potentially hazardous? No");
        }

        asteroidArray.push("Average estimated diameter: "+((asteroidData.data.near_earth_objects[randomNumber].estimated_diameter.kilometers.estimated_diameter_min)+(asteroidData.data.near_earth_objects[randomNumber].estimated_diameter.kilometers.estimated_diameter_max))/2);

        for(var i=0; i< asteroidData.data.near_earth_objects[randomNumber].close_approach_data.length; i++) {
          asteroidObj = {
            "Close Approach Date: ": asteroidData.data.near_earth_objects[randomNumber].close_approach_data[i].close_approach_date,
            "Relative Velocity(kph): ": asteroidData.data.near_earth_objects[randomNumber].close_approach_data[i].relative_velocity.kilometers_per_hour + "kph",
            "Relative Velocity(mph): ": asteroidData.data.near_earth_objects[randomNumber].close_approach_data[i].relative_velocity.miles_per_hour + "mph",
            "Miss Distance(AU): ": asteroidData.data.near_earth_objects[randomNumber].close_approach_data[i].miss_distance.astronomical + "AU",
            "Miss Distance(miles): ": asteroidData.data.near_earth_objects[randomNumber].close_approach_data[i].miss_distance.miles + " miles",
            "Miss Distance(km): ": asteroidData.data.near_earth_objects[randomNumber].close_approach_data[i].miss_distance.kilometers + " kilometers",
            "Orbiting Body: ": asteroidData.data.near_earth_objects[randomNumber].close_approach_data[i].orbiting_body
          }
          asteroidArray.push(asteroidObj);
        }

        // console.log(asteroidData.data.near_earth_objects[randomNumber]);
        //display random asteroid data ^^^

      });
    }

    function getData() {
      return asteroidArray;
    }

  }
  angular
  .module("app")
  .factory("AsteroidService", AsteroidService);
})();
