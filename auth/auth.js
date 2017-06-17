app.controller('authController', function($scope, Auth, $location, $rootScope, FBoperation) {
    console.log(Auth);
    Auth.$onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            $rootScope.role = '';
            $rootScope.user = user;
            $rootScope.uid = user.uid;
            $scope.admin = FBoperation.getDataEqualto('users', 'role', 'admin');
            console.log($scope.admin);
            $scope.admin.$loaded()
                .then(function() {
                    angular.forEach($scope.admin, function(value) {
                        if (value.email == user.email) {
                            console.log('admin');
                            $rootScope.role = 'admin';
                        }
                    })
                });


            console.log(user);
        } else {
            // User is signed out.
            $rootScope.uid = null;
        }
    });
    $scope.signIn = function() {
        Auth.$signInAnonymously().then(function() {
            $location.path('/menu')
        }).catch(function(error) {
            $rootScope.error = error;
        });
    };
    $scope.signInWithEmailPassword = function() {
        Auth.$signInWithEmailAndPassword($scope.email, $scope.password).then(function() {
            $location.path('/menu')
        }).catch(function(error) {
            $rootScope.error = error;
        });
    };

    $scope.signInWithFacebook = function() {
        Auth.$signInWithPopup('facebook').then(function() {
            $location.path('/menu')
        }).catch(function(error) {
            $rootScope.error = error;
        });
    };


});