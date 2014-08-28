angular.module('ossdbWeb').controller('OsspCtrl',function($scope, $state,$ossdb){

    $ossdb.getOsspList(function(osspList) {
        $scope.osspList = osspList;
    });
    $scope.goDetail = function(id) {
        $state.go('ossp-detail', {
            id: id
        });
    }
});