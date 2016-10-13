'use strict'


/**
 * @ngdoc function
 * @name firstAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firstAppApp
 */
angular.module('firstAppApp')
  .controller('MainCtrl', function ($scope, City) {

    $scope.cities = City.getList().$object;
    $scope.nen = new WeightedNegative();

    $scope.initMap = function(){
      var canvasElement = document.getElementById('map');
      var ctx = canvasElement.getContext('2d');

      // Draw locations to canvas
      for(var i = 0; i < $scope.cities.length; i++){

        // Get coordinates
        var x = $scope.cities[i].coordX;
        var y = $scope.cities[i].coordY;

        // Draw circle
        ctx.beginPath();
        ctx.arc(x,y,10,0,2*Math.PI);
        ctx.fillStyle = 'cyan';
        ctx.fill();

        // Draw city name nexto circle
        ctx.fillStyle = 'black';
        ctx.fillText($scope.cities[i].name, x+10, y+5);
      }

    };

    $scope.searchRoute = function(){
      var startCity = $scope.startCity;
      var endCity = $scope.endCity;

      for(var i = 0; i < $scope.cities.length; i++){
        var neighbours = [];
        for(var j = 0; j < $scope.cities[i].neighbours.length; j++){
          neighbours[$scope.cities[i].neighbours[j].name] = $scope.cities[i].neighbours[j].distance;
        }
        $scope.nen.addV($scope.cities[i].name, neighbours);
      }

      var result = $scope.nen.getWeigthed(startCity, endCity);

      $scope.distance = result.dist + "Km ";
      $scope.route = result.order.reverse().toString();
    };

  });
