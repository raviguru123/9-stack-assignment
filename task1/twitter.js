let app=angular.module("app.module",[]);

//Enable html5 mode for read data from query string
app.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
}]);


//controller
app.controller('twitterCtrl', ['$scope','$rootScope','$httpParamSerializer','$location','$window',
	function($scope,$rootScope,$httpParamSerializer,$location,$window){
		$scope.logout=function(){
			let array=[{"event":"reset_all_tweets","value":"tweets"}];

			for(let i=0;i<array.length;i++){
				$window.localStorage.removeItem(array[i].value);	
				$scope.$broadcast(array[i].event);
			}

			var obj=$location.search();
			$rootScope.pageName=obj.page;

			obj.page="main";
			var path="/";
			if($httpParamSerializer(obj)!=""){
				path+="?"+$httpParamSerializer(obj);
			}

			$location.path('/twitter.html');
			$window.location.reload();


		}
	}]);


app.filter("searchFilter",function(){
	return function(array,parms){
		return array.filter(function(obj){
			console.log("parms",parms);
			if(parms==undefined || parms.length==0)
				return true;
			if(obj.value.toLowerCase().indexOf(parms.toLowerCase())>=0)
			{
				return true;
			}
		})
	}
});





app.directive('tweetView',function($window,$httpParamSerializer,$location){
	// Runs during compile
	return {
		restrict:'EA',
		replace:true,
		scope:false,
		template:`<form name="tweet" ng-show="myTemplate">
		<input ng-model="tweetobj.tweettxt" type="text"/>
		<button  type="submit" ng-click="submit(tweetobj.tweettxt,tweet.$valid)">Submit</button>
		<button ng-click="gotosearch()">Go to Search</button>
		</form>`,
		link: function($scope, iElm, iAttrs, controller) {
			$scope.tweetobj={};
			
			$scope.gotosearch=function(){
				var locationobj=$location.search();
				locationobj.page="search";
				var url='twitter.html?'+$httpParamSerializer(locationobj);
				$scope.tweetView();
				$location.url(url);
				
			}
			
			$scope.tweetView=function(){
				if($location.search().page!="search"){
					$scope.myTemplate=true;
				}
				else{
					$scope.myTemplate=false;
				}	
			}

			$scope.$watch(function(){ return $location.search() }, function(params){
				$scope.tweetView();
			});

			$scope.tweetView();
			
			$scope.submit=function(tweet){
				if(tweet!=undefined && tweet.length>0){
					$scope.$emit("push_tweet",tweet);
					$scope.tweetobj={};
				}
			}

		}
		// template:'<div ng-include="myTemplate"></div>'
	};
});






app.directive('searchView',function($window,$httpParamSerializer,$filter,$location){
	// Runs during compile
	return {
		restrict:'EA',
		replace:true,
		scope:false,
		template:`<div style="width: 100%;margin-top:50px">
		<form ng-if="localParam.page=='search'" name="searchtweet">
		<input ng-model="searchObj.searchtxt" type="text"/>
		<button  type="submit" ng-click="search(searchObj.searchtxt)">Search</button></form>
		<ul><li ng-repeat="tweet in tweets track by $index">#Tweet{{tweets.length-$index+1}} # {{tweet.value}}</li></ul>
		</div>
		`,
		link: function($scope, iElm, iAttrs, controller) {
			$scope.searchObj={};

			$scope.$on("reset_all_tweets",function(){
				$scope.init();
			});

			$scope.$watch(function(){ return $location.search() }, function(params){
				$scope.init();
			});


			$scope.search=function(searchtext){
				var locationobj=$location.search();
				locationobj.hashtag=searchtext;
				var path=$location.path();
				var url='twitter.html?'+$httpParamSerializer(locationobj);
				$location.url(url);
				$scope.searchObj.searchtxt="";
				$scope.init();
			}

			
			$scope.init=function(){
				let tweets=$window.localStorage.getItem("tweets");
				$scope.localParam=$location.search();
				if(tweets!=null){
					$scope.tweets=JSON.parse(tweets);
					if($scope.localParam.page=="search"){
						$scope.tweets=$filter('searchFilter')($scope.tweets,$scope.localParam.hashtag);
					}
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


