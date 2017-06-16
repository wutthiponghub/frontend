app.controller('authController', function($scope, Auth, $location, $rootScope) {
    console.log(Auth);
    console.log($rootScope.user);
    Auth.$onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            $rootScope.user = user;
            $rootScope.uid = user.uid;
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