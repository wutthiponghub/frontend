        app.controller('page1Controller', function($scope) {

            $scope.h = 180;
            $scope.w = 80;

            $scope.bmidata = [{
                "min": 0,
                "max": 18.5,
                "meaning": "น้ำหนักน้อย (ผอม)",
                "risk": "มากกว่าคนปกติ"
            }, {
                "min": 18.5,
                "max": 23.0,
                "meaning": "ปกติ (สุขภาพดี)",
                "risk": "เท่าคนปกติ"
            }, {
                "min": 23.0,
                "max": 25.0,
                "meaning": "ท้วม (โรคอ้วนระดับ 1)",
                "risk": "อันตรายระดับที่ 1"
            }, {
                "min": 25.0,
                "max": 30.0,
                "meaning": "อ้วน (โรคอ้วนระดับ 2)",
                "risk": "อันตรายระดับที่ 2"
            }, {
                "min": 30.0,
                "max": 100.0,
                "meaning": "อ้วนมาก (โรคอ้วนระดับ 3)",
                "risk": "อันตรายระดับที่ 3"
            }];

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