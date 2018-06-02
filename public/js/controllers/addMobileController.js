angular.module('app').controller('addMobileController', function ($scope, $state, ApiService, $window,$rootScope) {
    $scope.mobile = {};
    ApiService.get('/addmobile').then(function (res) {
        if (res.data.success) {
            console.log(res.data.success)
            console.log("success")
            $state.go('app.addMobile')
        }
        if (res.data.error) {
            console.log(res.data.error)
            console.log("error")
            $state.go('login')
        }
    })
    $scope.addMobile = function (mobile) {
        var mobileName = mobile.mobileName;
        var mobileModel = mobile.mobileModel;
        var mobileColor = mobile.mobileColor;
        var mobileCost = mobile.mobileCost;
        var mobileBattery = mobile.mobileBattery;
        var mobilePrimaryCamera = mobile.mobilePrimaryCamera;
        var mobileSecondaryCamera = mobile.mobileSecondaryCamera;
        var mobileMemory = mobile.mobileMemory;
        if ((mobileName) && (mobileModel) && (mobileColor) && (mobileCost) && (mobileBattery) && (mobilePrimaryCamera) && (mobileSecondaryCamera) && (mobileMemory)) {
            $scope.mobileStatus = ""
            var data = {};
            data.mobileName = mobileName;
            data.mobileModel = mobileModel;
            data.mobileColor = mobileColor;
            data.mobileCost = mobileCost;
            data.mobileBattery = mobileBattery;
            data.mobilePrimaryCamera = mobilePrimaryCamera;
            data.mobileSecondaryCamera = mobileSecondaryCamera;
            data.mobileMemory = mobileMemory;
            var url = "http://localhost:3000/addmobile"
            ApiService.post(url, data).then(function (result) {
                console.log(result.data)
                if (result.data.success) {
                    $scope.mobileStatus = "mobile added successfully.";
                    $scope.mobile = {}
                    $rootScope.$emit('updateMobiles',data)
                    // $state.go('app.viewMobile')
                }
                if (result.data.error) {
                    $scope.mobileStatus = "mobile already exists."
                }
            })
        } else {
            $scope.mobileStatus = "Please fill all fields"
        }

    }
    // var mobileAdded = function (result) {
    //     console.log(result.data)
    //     if (result.data.success) {
    //         $scope.mobileStatus = "mobile added successfully.";
    //         $scope.mobile = {}
    //         $rootScope.$emit('updateMobiles',data)
    //         // $state.go('app.viewMobile')
    //     }
    //     if (result.data.error) {
    //         $scope.mobileStatus = "mobile already exists."
    //     }
    // }
})