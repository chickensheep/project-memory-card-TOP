function Restart(props) {
	return (
		<>
			<div className="restart">
				<p>
					You lost... <br />
					<br />
					Score:{props.score}
				</p>
				<button onClick={props.restartGame} className="restartButton">
					Restart
				</button>
			</div>
		</>
	);
}

export { Restart };
