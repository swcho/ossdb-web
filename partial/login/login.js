angular.module('ossdbWeb').controller('LoginCtrl',function($scope, $ossdb, $state){

    $scope.checkChanged = function() {
        console.log($scope.email);
        console.log($scope.password);
        $scope.canLogin = validator.isEmail($scope.email) && $scope.password && $scope.password.length;
    };

    $scope.login = function() {
        $ossdb.login($scope.email, $scope.password, function(err, user) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(user);
            $state.go('home');
        });
    };

    $scope.register = function() {
        $state.go('register');
    };

});