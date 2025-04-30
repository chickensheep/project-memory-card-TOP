function ShowScores(props) {
	return (
		<>
			<div className="scores">
				<div className="score">Score:{props.score}</div>
				<div className="highScore">High Score:{props.highScore}</div>
			</div>
		</>
	);
}

export { ShowScores };
