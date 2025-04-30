import { useEffect, useState } from "react";

import { generateCards } from "./generateCards";
import { randomiseCards } from "./randomiseCards";
import { ShowScores } from "./ShowScores";
import { Restart } from "./Restart";

import backCard from "/backCard.jpg";

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
			setFlipped((prev) => !prev);
			playRestartSound();
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
		const audio = new Audio("/click.wav");
		audio.play();
	};

	const playWrongSound = () => {
		const audio = new Audio("/wrongClick.wav");
		audio.play();
	};

	const playRestartSound = () => {
		const audio = new Audio("/restartSound.mp3");
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
				const shuffled = randomiseCards(cards);
				setCards(shuffled);
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
