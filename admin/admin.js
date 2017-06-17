app.controller('adminController', function($scope, FBoperation, $rootScope) {

    $scope.admin = FBoperation.getData('order');
    $scope.admin.$loaded()
        .then(function() {
            console.log($scope.admin);
            $scope.calculateTotal();
            $scope.uniqueUser();

        });

    $scope.uniqueUser = function() {
        $scope.userlist = [];
        angular.forEach($scope.admin, function(value) {
            console.log(value);
            if ($scope.userlist.indexOf(value.name) == -1) {
                $scope.userlist.push(value.name);
            }

        })
        console.log($scope.userlist);
    };

    $scope.confirmItem = function(listNo, dataNo) {
        console.log(listNo);
        angular.forEach($scope.admin, function(value) {
            console.log(value);
            if (value.$id == dataNo) {
                for (i = 0; i < value.list.length; i++) {
                    console.log(value.list[i]);
                    if (value.list[i].no == listNo) {
                        value.list[i].status = 'confirm';
                        $scope.admin.$save(value);
                        $scope.calculateTotal();
                    }
                }
            }
        })
    };

    $scope.calculateTotal = function() {
        var sum = [];

        for (i = 0; i < $scope.admin.length; i++) {
            sum[i] = 0;
            for (j = 0; j < $scope.admin[i].list.length; j++) {
                //console.log($scope.admin[i].list[j].price);
                if ($scope.admin[i].list[j].status != 'cancel') {
                    sum[i] = sum[i] + $scope.admin[i].list[j].price;
                }
            }

            console.log(sum[i]);

        }
        $scope.total = sum;

        var already = [];
        for (i = 0; i < $scope.admin.length; i++) {
            already[i] = true;
            for (j = 0; j < $scope.admin[i].list.length; j++) {
                if ($scope.admin[i].list[j].status == 'request') {
                    already[i] = false;
                }
            }
            console.log(sum[i]);
            console.log(already[i]);
            var tmp = $scope.admin[i];
            if (already[i] == true) {
                tmp.orderstatus = 'Already';
                tmp.total = $scope.total[i];
                $scope.admin.$save(tmp);
            } else {
                tmp.orderstatus = 'Waiting';
                tmp.total = $scope.total[i];
                $scope.admin.$save(tmp);
            }
        }

    };

});

app.filter('calTotal', function() {
    return function(data) {
        var sum = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].status != 'cancel') {
                sum = sum + data[i].price;
            }
        }
        return sum;
    }
});

app.filter('calAllTotal', function() {
    return function(data) {
        var sum = 0;
        // console.log(data);
        for (i = 0; i < data.length; i++) {

            if (data[i].status != 'cancel') {
                sum = sum + data[i].price;
            }
        }
        return sum;
    }
});