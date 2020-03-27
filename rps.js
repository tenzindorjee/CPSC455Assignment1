"use strict"

function RPS(portNumber){

	console.log('this server is working');
	const express = require('express');
	var app = express();


	let userScore = 0;
	let computerScore = 0;
	let totalGames = 0;
	const winner = "YOU HAVE WON THE GAME";
	const tie = "YOU HAVE TIED THE GAME";
	const loser = "YOU HAVE LOST THE GAME";


	app.set('view engine','ejs');

	app.get('/',function(request,response)
	{
		response.sendFile(__dirname + "/main.html")
	});

	app.get('/rps',function(request,response)
	{
		let state = request.query.radioAnswer;
		decider(state);
	});
	
	function computerChoice() //randomly choosing computer choice
	{
		let arr = ["rock","paper","scissor"];
		let computerState = arr[Math.floor(Math.random()*arr.length)];
		return computerState;
	}

	function decider(state)
	{
		let you = state;
		let computer = computerChoice();
		function rules(you,computer)
		{
			if(you === computer){
				
				totalGames++;
			}

			if(you === "rock")
			{
				if(computer === "scissor")
				{
					userScore++;
					totalGames++;
				}

				if(computer==="paper")
				{
					computerScore++;
					totalGames++;
				}
			}

			if(you === "paper")
			{
				if(computer === "rock")
				{
					userScore++;
					totalGames++;
				}

				if(computer === "scissor")
				{
					computerScore++;
					totalGames++;
				}
			}

			if(you === "scissor")
			{
				if(computer === "paper")
				{
					userScore++;
					totalGames++;
				}

				if(computer === "rock")
				{
					computerScore++;
					totalGames++;
				}
			}



		}

		rules(you,computer);

		console.log(userScore);
	console.log(computerScore);
	console.log(totalGames);
	}

	app.listen(portNumber);

}

let myGame = new RPS(3000);