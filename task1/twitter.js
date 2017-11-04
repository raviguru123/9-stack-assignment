let app=angular.module("app.module",[]);

//Enable html5 mode for read data from query string
app.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
}]);


//controller
app.controller('twitterCtrl', ['$scope','$location','$window', function($scope,$location,$window){
	$scope.logout=function(){
		let array=[{"event":"reset_all_tweets","value":"tweets"}];

		for(let i=0;i<array.length;i++){
			$window.localStorage.removeItem(array[i].value);	
			$scope.$broadcast(array[i].event);
		}
	}
}]);


app.directive('tweetView',function($window,$location){
	// Runs during compile
	return {
		restrict:'EA',
		replace:true,
		scope:false,
		link: function($scope, iElm, iAttrs, controller) {
			$scope.tweetobj={};
			if($location.search().page!="search"){
				$scope.myTemplate="./views/tweet.html";
			}

			$scope.submit=function(tweet){
				if(tweet!=undefined && tweet.length>0){
					$scope.$emit("push_tweet",tweet);
					$scope.tweetobj={};
				}
			}

		},
		template:'<div ng-include="myTemplate"></div>'
	};
});




app.filter("searchFilter",function(){
	return function(array,parms){
		return array.filter(function(obj){
			if(parms==undefined || parms.length==0)
				return true;
			if(obj.value.toLowerCase().indexOf(parms.toLowerCase())>=0)
			{
				return true;
			}
		})
	}
});



app.directive('searchView',function($window,$filter,$location){
	// Runs during compile
	return {
		restrict:'EA',
		replace:true,
		scope:false,
		templateUrl:"./views/search.html",
		link: function($scope, iElm, iAttrs, controller) {
			
			$scope.$on("reset_all_tweets",function(){
				$scope.init();
			});

			$scope.init=function(){
				let tweets=$window.localStorage.getItem("tweets");
				if(tweets!=null){
					$scope.tweets=JSON.parse(tweets);
					$scope.tweets=$filter('searchFilter')($scope.tweets,$location.search().hashtag);
				}
				else{
					$scope.tweets=[];
				}
			}


			$scope.$on("push_tweet",function($event,val){
				let tweet_obj={"time":new Date().getTime(),"value":val};
				
				if(Array.isArray($scope.tweets) && $scope.tweets.length>0){
					$scope.tweets.splice(0,0,tweet_obj);	
				}

				else{
					$scope.tweets.push(tweet_obj);
				}
				$window.localStorage.setItem("tweets",JSON.stringify($scope.tweets));

			});


			$scope.init();
		}
	};
});