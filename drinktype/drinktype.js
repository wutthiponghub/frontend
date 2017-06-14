app.controller('drinktypeController', function($scope, FBoperation) {

    $scope.drinktype = FBoperation.getData('drinktype');

    $scope.drinktype.$loaded()
        .then(function() {
            $scope.load();
        });

    $scope.drinktype.$watch(function(a) {
        console.log(a);
        if ($scope.myTable) {
            $scope.myTable.destroy();
            $scope.load();
        }
    });


    $scope.resetForm = function() {
        $scope.show = false;
        $scope.edit = false;
        $scope.action = '';
        $scope.tmp = {};
        $scope.tmp.name = '';
    };

    $scope.load = function() {

        function filterColumn(i) {
            $('#drinktypetable').DataTable().column(i).search(
                $('#col' + i + '_filter').val()
            ).draw();
        }

        $(document).ready(function() {
            $scope.myTable = $('#drinktypetable').DataTable();
            $('input.column_filter').on('keyup click', function() {
                filterColumn($(this).attr('data-column'));
            });
        });
    }



    $scope.operation = function(tmp, action) {
        if (action == "add") {
            $scope.drinktype.$add(tmp);
            $scope.resetForm();
        }

        if (action == "edit") {
            $scope.resetForm();
            console.log(tmp);
            $scope.tmp = tmp;
            $scope.attrForUpdate = tmp.name;
            $scope.show = true;
            $scope.edit = true;
            $scope.action = 'update';
        }
        if (action == "update") {
            $scope.drink = FBoperation.getDataEqualto('drink', 'type', $scope.attrForUpdate);
            $scope.drink.$loaded()
                .then(function() {
                    angular.forEach($scope.drink, function(value) {
                        console.log(value);
                        value.type = tmp.name;
                        $scope.drink.$save(value);
                    })
                });
            $scope.drinktype.$save(tmp);
            $scope.resetForm();
        }

    }


});