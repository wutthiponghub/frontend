var app = angular.module("myApp", ['ngRoute', 'firebase']);

app.config(function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $routeProvider
        .when("/", {
            templateUrl: "menu/menu.html",
            controller: "menuController"
        })
        .when("/menu", {
            templateUrl: "menu/menu.html",
            controller: "menuController"
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.service('Auth', function($firebaseAuth) {
    return $firebaseAuth();
});

app.controller('navController', function($scope, $location) {

    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
});


app.service('FBoperation', function($firebaseArray) {
    this.getData = function(tablename) {
        var ref = firebase.database().ref().child(tablename);
        return $firebaseArray(ref);
    }
    this.getDataEqualto = function(tablename, attribute, comparedata) {
        var ref = firebase.database().ref().child(tablename);
        return $firebaseArray(ref.orderByChild(attribute).equalTo(comparedata));
    }
});


app.service('DBoperation', function($http, $q) {
    this.getData = function(tablename) {
        var deferred = $q.defer();
        $http.get('https://www.appstudio.space/angularjs/workshop/api/dboperation.php?table=' + tablename)
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }
    this.editData = function(tablename, primarykey, id) {
        var deferred = $q.defer();
        $http.get('https://www.appstudio.space/angularjs/workshop/api/dboperation.php?table=' + tablename + '&' + primarykey + '=' + id + '&primarykey=' + primarykey)
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }
    this.addData = function(data) {
        var deferred = $q.defer();
        $http.post('https://www.appstudio.space/angularjs/workshop/api/dboperation.php', data)
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }
    this.deleteData = function(data) {
        var deferred = $q.defer();
        $http.post('https://www.appstudio.space/angularjs/workshop/api/dboperation.php', data)
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }
    this.updateData = function(data) {
        var deferred = $q.defer();
        $http.post('https://www.appstudio.space/angularjs/workshop/api/dboperation.php', data)
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }
});

app.filter('changeKeytoText', function() {
    return function(tmp, data) {
        for (i = 0; i < data.length; i++) {
            if (data[i].id == tmp) {
                return data[i].name;
            }
        }
    }
});




app.directive('ngConfirmClick', [
    function() {
        return {
            link: function(scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click', function(event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }
]);

app.controller('navController', function($scope, $location) {
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
});