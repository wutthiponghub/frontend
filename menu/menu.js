app.controller('menuController', function($scope, FBoperation, DBoperation) {



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


    $scope.resetMenu = function() {
        $scope.selectType('bakery');
    };





});