function setup() {
	createCanvas(400, 300);
	let bird = "Imperial shag";
	fetch(`http://localhost:3000/birds/${bird}`)
		.then(response => response.json())
		.then(json => console.log(json));
}

function draw() {
	background(0);
}