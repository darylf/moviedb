var myApp = angular.module('movieapp',[]);

myApp.controller('MovieCtrl',['$scope','$http',function($scope, $http) {

  var refresh = function() {
    $http.get('/api/movies').success(function(data) {
      $scope.movies = data;
      $scope.movie = "";
    });
  };

  refresh();

  $scope.addMovie = function() {
    $http.post('/api/movies', $scope.movie).success(function(res) {
      console.log(res);
      refresh();
    });
  };

  $scope.remove = function(id) {
    $http.delete('/api/movies/'+id).success(function(res) {
      refresh();
    });
  };

  $scope.edit = function(id) {
    $http.get('/api/movies/'+id).success(function(res) {
      $scope.movie = res;
    });
  };

  $scope.update = function() {
    $http.put('/api/movies/'+$scope.movie.id, $scope.movie).success(function(res) {
      refresh();
    });
  };
}]);