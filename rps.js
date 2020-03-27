"use strict"

function RPS(portNumber) {

	console.log('this server is working');
	const express = require('express');
	var app = express();
	var bodyParser = require("body-parser");

	app.use(bodyParser.urlencoded({ extended: true }));

	let userScore = 0;
	let computerScore = 0;
	let totalGames = 0;

	app.set('view engine', 'ejs');


	// Handles the form
	app.post("/rps", function (req, res) {
		// Print the values of the form variable
		let results = decider(req.body.radioAnswer);
		res.render("results", { gameResult: results[0], userChoice: req.body.radioAnswer, computerChoice: results[1], playerWinCount: userScore, serverWinCount: computerScore, totalGameCount: totalGames });

	});


	app.get('/', function (request, response) {
		response.sendFile(__dirname + "/main.html") // gets initial page data
	});

	function computerChoice() //randomly choosing computer choice
	{
		let arr = ["rock", "paper", "scissor"];
		let computerState = arr[Math.floor(Math.random() * arr.length)];
		return computerState;
	}

	function decider(state) { //does the math and decides everything 
		let you = state;
		let computer = computerChoice();
		function rules(you, computer) {
			if (you === computer) {

				totalGames++;
				return "tied";
			}

			if (you === "rock") {
				if (computer === "scissor") {
					userScore++;
					totalGames++;
					return "won";
				}

				if (computer === "paper") {
					computerScore++;
					totalGames++;
					return "lost";
				}
			}

			if (you === "paper") {
				if (computer === "rock") {
					userScore++;
					totalGames++;
					return "won";
				}

				if (computer === "scissor") {
					computerScore++;
					totalGames++;
					return "lost";
				}
			}

			if (you === "scissor") {
				if (computer === "paper") {
					userScore++;
					totalGames++;
					return "won";
				}

				if (computer === "rock") {
					computerScore++;
					totalGames++;
					return "lost";
				}
			}


		}

		let result = rules(you, computer);

		return [result, computer]

	}


	app.listen(portNumber);

}

let myGame = new RPS(3000);