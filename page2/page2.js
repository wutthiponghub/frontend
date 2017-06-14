        app.controller('page2Controller', function($scope, bmidatajson) {

            $scope.h = 180;
            $scope.w = 80;

            // $scope.getbmidata = function() {
            //     $http.get("../data/bmidata.json")
            //         .then(function(response) {
            //             $scope.bmidata = response.data;
            //             console.log(response);
            //         });
            // }

            // $scope.getbmidata = function() {
            //     bmidatajson.getData().then(
            //         function(data) {
            //             console.log(data);
            //             $scope.bmidata = data;
            //         },
            //         function(error) {
            //             console.log(error);
            //         }
            //     );
            // }

            $scope.getbmidata = function() {
                $scope.bmidata = bmidatajson.getDataFromFirebase();
                console.log($scope.bmidata);
            }

            $scope.bmicalculator = function() {
                var tmp = $scope.h / 100;
                $scope.bmi = $scope.w / (tmp * tmp);

                $('#numberanimation').animateNumber({
                    number: $scope.bmi.toFixed(2),
                    numberStep: function(now, tween) {
                        var target = $(tween.elem);
                        target
                            .prop('number', now)
                            .text(now.toFixed(2));
                    }
                });

                $scope.resetCSS();
                $scope.meaning = $scope.bmimeaning($scope.bmi);
            };

            $scope.bmimeaning = function(bmi) {
                for (i = 0; i < $scope.bmidata.length; i++) {
                    if (bmi >= $scope.bmidata[i].min && bmi < $scope.bmidata[i].max) {
                        if (i < 2) {
                            $scope.bmidata[i].css = 'success';
                        } else if (i == 2) {
                            $scope.bmidata[i].css = 'warning';
                        } else if (i > 2) {
                            $scope.bmidata[i].css = 'danger';
                        }
                        return $scope.bmidata[i].risk;
                    }
                }
            };

            $scope.resetCSS = function() {
                // for (i = 0; i < $scope.bmidata.length; i++) {
                //     $scope.bmidata[i].css = '';
                // }
                for (i in $scope.bmidata) {
                    $scope.bmidata[i].css = '';
                }
            };
            $scope.resetBMI = function() {
                $scope.bmi = 0;
            };
        });