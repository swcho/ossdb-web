angular.module('ossdbWeb').controller('ProjectCtrl',['$scope', '$ossdb', function($scope, $ossdb){

    $ossdb.getProjectList(function (projectList) {
        $scope.projectList = projectList
    });

}]);