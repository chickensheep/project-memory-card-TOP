async function generateCards() {
	const idsSet = new Set();

	while (idsSet.size < 12) {
		idsSet.add(Math.floor(Math.random() * 898 + 1));
	}

	const ids = [...idsSet];

	const responses = await Promise.all(
		ids.map((id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`))
	);
	const responseJSON = await Promise.all(
		responses.map((response) => response.json())
	);
	const data = responseJSON.map((response) => ({
		name: response.name,
		imageLink: response.sprites.front_default,
	}));

	return data;
}

export { generateCards };
