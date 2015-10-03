var movieApp = angular.module('movieapp',[]);

movieApp.controller('MoviesController',['$scope','$http',function($scope, $http) {

  $scope.saveMovie = function() {
    var id=$scope.movie._id
    if(!id) {
      this.addMovie();
    } else {
      this.updateMovie();
    }
  }

  $scope.addMovie = function() {
    $http.post('/api/movies', $scope.movie).success(function(res) {
      refresh();
    });
  };

  $scope.deleteMovie = function(id) {
    $http.delete('/api/movies/'+id).success(function(res) {
      refresh();
    });
  };

  $scope.editMovie = function(id) {
    $http.get('/api/movies/'+id).success(function(res) {
      $scope.movie = res;
    });
  };

  $scope.updateMovie = function() {
    $http.put('/api/movies/'+$scope.movie._id, $scope.movie).success(function(res) {
      refresh();
    });
  };

  var refresh = function() {
    $http.get('/api/movies').success(function(data) {
      $scope.movies = data;
      $scope.movie = "";
    });
  };

  refresh();

}]);