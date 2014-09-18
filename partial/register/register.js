angular.module('ossdbWeb').controller('RegisterCtrl',function($scope, $ossdb, $state){

    $scope.name = '';
    $scope.email = '';
    $scope.password = '';
    $scope.password_confirm = '';

    $scope.checkChanged = function() {
        $scope.canRegister = $scope.name.length && validator.isEmail($scope.email) && $scope.password.length && $scope.password_confirm.length && $scope.password === $scope.password_confirm;
    };

    $scope.register = function() {
        $ossdb.register($scope.name, $scope.email, $scope.password, function(err, user) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(user);
            $state.go('login');
        });
    };

});