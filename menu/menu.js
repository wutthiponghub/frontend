app.controller('menuController', function($scope, FBoperation, DBoperation, $rootScope) {



    $scope.selectType = function(tmp) {
        console.log(tmp);
        $scope.type = null;
        if (tmp == 'drink') {
            $scope.type = $scope.drink;
            $scope.selectedtype = 'drink';
        } else if (tmp == 'bakery') {
            $scope.type = $scope.bakery;
            $scope.selectedtype = 'bakery';
        }
        $scope.selectedsubtype = '';
        console.log($scope.type);
    };

    $scope.selectSubType = function(tmp) {
        console.log(tmp);
        $scope.selectedsubtype = tmp;
        console.log($scope.type);
    };

    DBoperation.getData('bakery').then(
        function(data) {
            console.log(data);
            $scope.bakery = data;
            $scope.selectType('bakery');
        },
        function(error) {
            console.log(error);
        }
    );
    DBoperation.getData('bakerytype').then(
        function(data) {
            console.log(data);
            $scope.bakerytype = data;
        },
        function(error) {
            console.log(error);
        }
    );

    $scope.drinktype = FBoperation.getData('drinktype');
    $scope.drinktype.$loaded()
        .then(function() {

        });
    $scope.drink = FBoperation.getData('drink');
    $scope.drink.$loaded()
        .then(function() {
            $scope.resetMenu();
        });

    // $scope.drink.$watch(function(a) {
    //     console.log(a);
    //     if ($scope.myTable) {
    //         $scope.myTable.destroy();
    //         $scope.load();
    //     }
    // });


    $scope.selectItem = function(item) {
        $scope.count++;
        var data = { "no": $scope.count, "name": item.name, "price": parseFloat(item.price), "status": 'request' };
        $scope.oLists.push(data);
        console.log($scope.oLists);
        $scope.calculateTotal();
    };

    $scope.removeItem = function(item) {
        for (i = 0; i < $scope.oLists.length; i++) {
            if ($scope.oLists[i].no == item.no) {
                $scope.oLists.splice(i, 1);
            }
        }
        $scope.calculateTotal();
        console.log($scope.oLists);
    };




    $scope.confirmOrder = function() {
        var tmp = {};
        tmp.name = $rootScope.user.email;
        tmp.orderstatus = 'Waiting';
        tmp.list = $scope.oLists;

        $scope.order = FBoperation.getData('order');
        $scope.order.$loaded()
            .then(function() {
                console.log(tmp);
                $scope.order.$add(tmp);
            });
        $scope.resetOrderList();
    };

    $scope.resetMenu = function() {
        $scope.selectType('bakery');
        $scope.oLists = [];
        $scope.count = 0;
        $scope.total = 0;
    };

    $scope.resetOrderList = function() {
        $scope.oLists = [];
        $scope.count = 0;
        $scope.total = 0;
    };




});