angular.module('ossdbWeb').controller('ProjectDetailCtrl',function($scope, $state, $stateParams, $ossdb){

    var create = $stateParams.id ? false: true;
    var model = $ossdb.model('project');

    $scope.projectId = '';
    $scope.project = null;
    $scope.canSave = false;
    $scope.canDelete = !create;
    $scope.checkChanged = function() {
        if (create) {
            if ($scope.projectId) {
                $scope.canSave = true;
            }
        } else {
            if ($scope.projectId !== $scope.project.projectId) {
                $scope.canSave = true;
            }
        }
    };
    $scope.upsert = function() {
        var project = $scope.project || {};
        project.projectId = $scope.projectId;

        model.setItem(project, function(resp) {
            $state.go('project');
        });
    };
    $scope.remove = function() {
        model.remove($stateParams.id, function(resp) {
            $state.go('project');
        });
    };

    if (!create) {
        model.getById($stateParams.id, function(project) {
            $scope.projectId = project.projectId;
            $scope.project = project;
        });
    }

});