app.controller('historyController', function($scope, FBoperation, $rootScope) {

    $scope.history = FBoperation.getDataEqualto('order', 'name', $rootScope.user.email);
    $scope.history.$loaded()
        .then(function() {
            console.log($scope.history);
            $scope.calculateTotal();
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
                        $scope.calculateTotal();
                    }
                }
            }
        })
    };

    $scope.calculateTotal = function() {
        var sum = [];

        for (i = 0; i < $scope.history.length; i++) {
            sum[i] = 0;
            for (j = 0; j < $scope.history[i].list.length; j++) {
                console.log($scope.history[i].list[j].price);
                if ($scope.history[i].list[j].status != 'cancel') {
                    sum[i] = sum[i] + $scope.history[i].list[j].price;
                }
            }

            console.log(sum[i]);

        }
        $scope.total = sum;
        var already = [];
        for (i = 0; i < $scope.history.length; i++) {
            already[i] = true;
            for (j = 0; j < $scope.history[i].list.length; j++) {
                if ($scope.history[i].list[j].status == 'request') {
                    already[i] = false;
                }
            }
            console.log(sum[i]);
            console.log(already[i]);
            var tmp = $scope.history[i];
            if (already[i] == true) {
                tmp.orderstatus = 'Already';
                tmp.total = $scope.total[i];
                $scope.history.$save(tmp);
            } else {
                tmp.orderstatus = 'Waiting';
                tmp.total = $scope.total[i];
                $scope.history.$save(tmp);
            }
        }
    };

});