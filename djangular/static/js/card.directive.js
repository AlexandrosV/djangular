(function () {
    'use strict';

    angular.module('scrumboard.demo')
        .directive('scrumboardCard', CardDirective);

        function CardDirective(){
            return{
                templateUrl: '/static/html/card.html',
                restrict: 'E',
                controller: ['$scope', '$http', function($scope, $http) {
                    var url = '/scrumboard/cards/' + $scope.card.id + '/';


                    $scope.update = function () {
                        $http.put(
                            url,
                            $scope.card
                        );
                    };

                    function removeCardFromList(card, list) {
                    var cards = list.cards;
                    cards.splice(
                        cards.indexOf(card),
                        1
                    );
                }

                    $scope.delete = function () {
                        $http.delete(url).then(
                            function(){
                                removeCardFromList($scope.card, $scope.list);
                            }
                        );
                    };

                    $scope.modelOptions = {
                        debounce: 500
                    };
                }]
            };
        }
})();