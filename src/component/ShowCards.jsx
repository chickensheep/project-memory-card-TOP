import { useEffect, useState } from "react";

import { generateCards } from "./generateCards";
import { randomiseCards } from "./randomiseCards";
import { ShowScores } from "./ShowScores";
import { Restart } from "./Restart";

import backCard from "/backCard.jpg";

import correctSound from "/click.wav";
import wrongSound from "/wrongClick.wav";
import restartSound from "/restartSound.mp3";

function ShowCards() {
	const [cards, setCards] = useState([]);
	const [cardsClicked, setCardsClicked] = useState([]);

	const [score, setScore] = useState(0);
	const [highScore, setHighscore] = useState(0);

	const [showRestart, setShowRestart] = useState(false);

	const [refreshCard, setRefreshCard] = useState(false);

	const [flipped, setFlipped] = useState(false);

	//load cards

	useEffect(() => {
		async function loadCards() {
			const result = await generateCards();
			setCards(result);
		}
		loadCards();
	}, [refreshCard]);

	//handle click

	const handleClick = (e) => {
		const temp = e.currentTarget.querySelector(".name").textContent;
		setCardsClicked((prev) => [...prev, temp]);
	};

	// sound

	const playCorrectSound = () => {
		const audio = new Audio(correctSound);
		audio.play();
	};

	const playWrongSound = () => {
		const audio = new Audio(wrongSound);
		audio.play();
	};

	const playRestartSound = () => {
		const audio = new Audio(restartSound);
		audio.play();
	};

	// what happen after card is clicked

	useEffect(() => {
		if (cardsClicked.length == 0) {
			return;
		}

		const allUnique = new Set(cardsClicked).size === cardsClicked.length;
		if (allUnique) {
			setScore(cardsClicked.length);
			const newScore = cardsClicked.length;
			if (newScore > highScore) {
				setHighscore(newScore);
			}

			playCorrectSound();
			setFlipped((prev) => !prev);
			setTimeout(() => {
				randomiseCards(cards);
				setFlipped((prev) => !prev);
			}, 1000);
		} else {
			setShowRestart((prev) => !prev);
			playWrongSound();
		}
	}, [cardsClicked]);

	//restart function

	const restartGame = () => {
		setScore(0);
		setCardsClicked([]);
		setFlipped((prev) => !prev);
		setShowRestart((prev) => !prev);
		setRefreshCard((prev) => !prev);
		setTimeout(() => {
			setFlipped((prev) => !prev);
			playRestartSound();
		}, 2000);
	};

	// return stuff

	return (
		<>
			{showRestart && (
				<div>
					<Restart restartGame={restartGame} score={score} />
					<div className="overlay"></div>
				</div>
			)}
			<ShowScores score={score} highScore={highScore} />
			<div className="cardsDiv">
				{cards.map((card) => (
					<div
						className={`cardDiv ${flipped ? "disabled" : ""}`}
						onClick={(e) => {
							handleClick(e);
						}}
					>
						<div className={`cardInner ${flipped ? "flipped" : ""}`}>
							<div className="front">
								<div className="image">
									<img src={card.imageLink} alt="" />
								</div>
								<div className="name">{card.name}</div>
							</div>
							<div className="back">
								<img src={backCard} alt="" className="backImage" />
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export { ShowCards };
