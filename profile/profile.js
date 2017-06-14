        app.controller('profileController', function($scope, Auth, $location, $rootScope) {
            console.log($rootScope.user);
            $scope.signOut = function() {
                Auth.$signOut().then(function() {
                    $location.path('/')
                    console.log('logout');
                }).catch(function(error) {
                    $rootScope.error = error;
                });
            };
        });