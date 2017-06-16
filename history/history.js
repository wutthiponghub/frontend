app.controller('historyController', function($scope, FBoperation) {

    $scope.history = FBoperation.getData('history');
    $scope.history.$loaded()
        .then(function() {
            $scope.load();
        });

    $scope.history.$watch(function(a) {
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
        $scope.tmp.price = '';
        $scope.tmp.type = '';
    };

    $scope.load = function() {

        function filterColumn(i) {
            $('#historytable').DataTable().column(i).search(
                $('#col' + i + '_filter').val()
            ).draw();
        }

        $(document).ready(function() {
            $scope.myTable = $('#historytable').DataTable({
                "paging": true,
                "ordering": true,
                "info": true
            });
            $('input.column_filter').on('keyup click', function() {
                filterColumn($(this).attr('data-column'));
            });
            $('select.column_filter').on('keyup click', function() {
                filterColumn($(this).attr('data-column'));
            });
        });
    }



    $scope.operation = function(tmp, action) {
        if (action == "add") {
            $scope.history.$add(tmp);
            $scope.resetForm();
        }

        if (action == "edit") {
            $scope.resetForm();
            console.log(tmp);
            $scope.tmp = tmp;
            $scope.tmp.price = parseFloat($scope.tmp.price);
            $scope.show = true;
            $scope.edit = true;
            $scope.action = 'update';
        }
        if (action == "update") {
            $scope.history.$save(tmp);
            $scope.resetForm();
        }

    }


});