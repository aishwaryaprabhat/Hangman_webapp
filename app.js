var app=angular.module("HangmanApp",[]);
app.controller("GameController",['$scope', '$timeout', function($scope, $timeout){
    var words = ["rat","cat","bat","mat"]
    $scope.incorrectLetters = [];
    $scope.correctLetters = [];
    $scope.guess = 6;
    $scope.displayWord = ''; //the one where we will be putting stars etc to show guess
    $scope.input = {
        letter: ''
    }

    var selectRandomWord = function(){
        var index = Math.round(Math.random()*words.length);
        return words[index]; 

    }

    var newGame = function(){
        //init game or restart game
        $scope.incorrectLetters = [];
        $scope.correctLetters = [];
        $scope.guess = 6;
        $scope.displayWord = '';
        
        selectWord = selectRandomWord();
        console.log(selectWord);
        var tempDisplayWord = '';
        for (var index = 0; index <selectWord.length; index++) {
            tempDisplayWord += "*";          
        }
        console.log(tempDisplayWord)
        $scope.displayWord =  tempDisplayWord;

    }

    $scope.letterChosen = function(){
        // console.log("letterChosen button is working!")

       // Check if $scope.input.letter is a single letter and an alphabet and not an already chosen letter.
		// Check if its correct.
		for(var i=0;i<$scope.correctLetters.length;i++) {
			if($scope.correctLetters[i].toUpperCase()==$scope.input.letter.toUpperCase()) {
				$scope.input.letter="";
				return;
			}
		}
		for(var i=0;i<$scope.incorrectLetters.length;i++) {
			if($scope.incorrectLetters[i].toUpperCase()==$scope.input.letter.toUpperCase()) {
				$scope.input.letter="";
				return;
			}
		}
		var correct=false;
		for(var i=0;i<selectWord.length;i++) {
			if(selectWord[i].toLowerCase()==$scope.input.letter.toLowerCase()) {
				$scope.displayWord=$scope.displayWord.slice(0,i)+$scope.input.letter.toUpperCase()+$scope.displayWord.slice(i+1);
				correct=true;
            }
        }

        if(correct){
            $scope.correctLetters.push($scope.input.letter.toLowerCase());
        }else{
            $scope.incorrectLetters.push($scope.input.letter.toLowerCase());
            $scope.guess--;
            
        }
        $scope.input.letter = "";
        if($scope.guess==0){
            alert("You lost!");
            $timeout(function(){
                newGame();
            },500);
        }
        if($scope.displayWord.indexOf("*")==-1){
            alert("You won!");
            $timeout(function(){
                newGame();
            },500);
        }

    }

    newGame();
}])