(function () {
     'use strict';

     angular.module('scrumboard.demo', ['ngRoute'])
        .controller('ScrumboardController',
            ['$scope', '$http', '$location' ,ScrumboardController]);

         function ScrumboardController($scope, $http, $location) {
                $scope.add = function (list, title) {
                    var card = {
                        list : list.id,
                        title:  title
                    };

                    $http.post('/scrumboard/cards/', card)
                      .then(function (response) {
                        list.cards.push(response.data);
                      },
                      function(){
                        alert('Could not create the card');
                      }
                  );
            };

            $scope.logout = function(){
                $http.get('/auth_api/logout/')
                    .then(function (){
                        $location.url('/login')
                    })
                    .catch(console.error);
            };

            $scope.data = [];

            $http.get('/scrumboard/lists/').then(
                function(response){
                    $scope.data = response.data;
                }
             );

             $scope.sortBy='story_points';
             $scope.reverse=true;
             $scope.showFilters=false;
         }
     }());