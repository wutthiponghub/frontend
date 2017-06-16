app.controller('historyController', function($scope, FBoperation, $rootScope) {

    $scope.history = FBoperation.getDataEqualto('order', 'name', $rootScope.user.email);
    $scope.history.$loaded()
        .then(function() {
            console.log($scope.history);
        });


    $scope.cancelItem = function(listNo, dataNo) {
        console.log(listNo);
        angular.forEach($scope.history, function(value) {
            console.log(value);
            if (value.$id == dataNo) {
                for (i = 0; i < value.list.length; i++) {
                    console.log(value.list[i]);
                    if (value.list[i].no == listNo) {
                        value.list[i].status = 'cancel';
                        $scope.history.$save(value);
                    }
                }
            }
        })
    };



});