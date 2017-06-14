app.controller('bakerytypeController', function($scope, DBoperation) {

    $scope.resetForm = function() {
        $scope.show = false;
        $scope.edit = false;
        $scope.action = '';
        $scope.tmp = {};
        $scope.tmp.id = '';
        $scope.tmp.name = '';
    };


    $scope.load = function() {
        DBoperation.getData('bakerytype').then(
            function(data) {
                console.log(data);
                $scope.bakerytype = data;

                function filterColumn(i) {
                    $('#bakerytypetable').DataTable().column(i).search(
                        $('#col' + i + '_filter').val()
                    ).draw();
                }

                $(document).ready(function() {
                    $scope.myTable = $('#bakerytypetable').DataTable({
                        "paging": true,
                        "ordering": true,
                        "info": true
                    });
                    $('input.column_filter').on('keyup click', function() {
                        filterColumn($(this).attr('data-column'));
                    });
                });

            },
            function(error) {
                console.log(error);
            }
        );
    }


    $scope.operation = function(tmp, action) {
        if (action == "add") {
            tmp.table = "bakerytype";
            tmp.action = "add";
            DBoperation.addData(tmp).then(
                function(data) {
                    console.log(data);
                    $scope.resetForm();
                    $scope.myTable.destroy();
                    $scope.load();

                },
                function(error) {
                    console.log(error);
                }
            );
        }
        if (action == "delete") {
            var r = confirm("Confirm to Delete!");
            if (r == true) {
                dataDelete = {};
                dataDelete.id = tmp;
                dataDelete.primarykey = "id";
                dataDelete.table = "bakerytype";
                dataDelete.action = "delete";
                console.log(dataDelete);
                DBoperation.deleteData(dataDelete).then(
                    function(data) {
                        console.log(data);
                        $scope.resetForm();
                        $scope.myTable.destroy();
                        $scope.load();
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
        }
        if (action == "edit") {
            DBoperation.editData('bakerytype', 'id', tmp.id).then(
                function(data) {
                    $scope.resetForm();
                    console.log(data);
                    $scope.tmp = data[0];
                    $scope.show = true;
                    $scope.edit = true;
                    $scope.action = 'update';
                },
                function(error) {
                    console.log(error);
                }
            );
        }
        if (action == "update") {
            tmp.table = "bakerytype";
            tmp.primarykey = "id";
            tmp.action = "update";
            console.log(tmp);
            DBoperation.updateData(tmp).then(
                function(data) {
                    console.log(data);
                    $scope.resetForm();
                    $scope.myTable.destroy();
                    $scope.load();
                },
                function(error) {
                    console.log(error);
                }
            );

        }

    }


});