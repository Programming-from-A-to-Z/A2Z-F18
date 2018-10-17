// A2Z F18
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F18

// Venue IDs
// 108-131 and...
let venues = [4, 8, 31, 44, 48, 60, 73, 81, 89, 101, 107, 96, 146, 142, 137];

// An array of lines from a text file
let lines;

// Two generators, one for titles one for elevator pitches
let titleMarkov;
let elevatorMarkov;


async function loadThesis(url) {
  let response = await fetch(url);
  return response.json();
}

function setup() {
  noCanvas();

  // The Markov Generator
  // First argument is N-gram length, second argument is max length of generated text
  titleMarkov = new MarkovGenerator(3, 40);
  elevatorMarkov = new MarkovGenerator(6, 1000);

  let button = select('#button');
  button.mousePressed(generate);
  button.hide();

  let requests = [];

  // Grab data from the APIs
  for (let i = 108; i < 132; i++) {
    let url = 'https://itp.nyu.edu/projects/public/projectsJSON.php?venue_id=' + i;
    requests.push(loadThesis(url));
  }

  for (let i = 0; i < venues.length; i++) {
    let url = 'https://itp.nyu.edu/projects/public/projectsJSON.php?venue_id=' + venues[i];
    requests.push(loadThesis(url));
  }


  Promise.all(requests)
    .then(response => {
      console.log('data loaded');
      for (let i = 0; i < response.length; i++) {

        process(response[i]);
      }
      button.show();
    })
    .catch(error => console.error(error))
}

function process(data) {
  //console.log(data);
  for (let i = 0; i < data.length; i++) {
    // Feed in project names
    if (data[i].project_name) {
      titleMarkov.feed(data[i].project_name);
    }

    let elevator = data[i].elevator_pitch;
    // Not all the data has elevator pitches
    if (elevator) {
      // Doing some cleanup to get rid of nonsense text
      // This is a somewhat terrible job
      elevator = elevator.replace(/&lt;/g, '<');
      elevator = elevator.replace(/&gt;/g, '>');
      elevator = elevator.replace(/&.*?;/g, '');
      elevator = elevator.replace(/<.*?>/g, '');
      // Feed in elevator pitches
      elevatorMarkov.feed(elevator);
    }
  }
}

function generate() {
  // Generate a title
  let title = select('#title');
  title.html(titleMarkov.generate());

  // And a decription
  let description = select('#description');
  description.html(elevatorMarkov.generate());
}