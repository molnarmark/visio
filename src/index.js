(function() {

  const os = require('os');
  const fs = require('fs');
  const chalk = require('chalk');
  const readlineSync = require('readline-sync');

  const difficultyOptions = [
    'Easy',
    'Medium',
    'Semi-hard',
    'Hard',
  ]

  const responses = {
    description: [
      'Ah, nice. 🥂\n',
      'Not bad.. not bad at all. 🎈\n',
      'Sounds great! 🎉\n',
      'Please, implement this! 🎈\n'
    ]
  }

  let currentProjects = {}
  let fileName = os.homedir() + '\\.visio';

  function parseCommand() {
    const commands = process.argv.splice(2);
    init();

    switch(commands[0]) {
    case 'new':
      newProject();
      break;

    case 'help':
      showHelp();
      break;
    }
  }

  function init() {
    // read the json file in
  }

  function getRandomLine(type) {
    const from = responses[type];
    return chalk.red.bold(from[Math.floor(Math.random() * from.length)]);
  }

  function listProjects() {
    // loop through each project and print the name of it
  }

  function appendProject(project) {
    // append given JSON object. key => project.projectName
    // write to file
  }

  function removeProject(projectName) {
    // check if project exists
    // remove project object by key => projectName
    // write to file
  }

  function newProject() {
    let project = {};
    console.log(chalk.bold.magenta('Let\'s do the Open Source magic! 🚀\n'));
    process.stdout.write(chalk.white('What would you like to name your project? '));
    project.projectName = readlineSync.question('');

    process.stdout.write(chalk.white(`Alright.. so it's ${chalk.bold.yellow(project.projectName + ',')} but what does it do? `));
    project.projectDescription = readlineSync.question('');
    process.stdout.write(getRandomLine('description'));

    process.stdout.write(chalk.white(`What technologies/or languages do you plan on using for ${chalk.bold.yellow(project.projectName + '?')} `));
    project.projectStack = readlineSync.question('');
    process.stdout.write(getRandomLine('description'));

    process.stdout.write(chalk.white(`How hard do you think implementing ${chalk.bold.yellow(project.projectName)} is? (${chalk.grey(difficultyOptions.join(', ') + ') ')} `));
    project.hardness = readlineSync.question('');
    process.stdout.write(chalk.cyan.bold(`\n🚀  Good luck on your development journey implementing ${project.projectName + '! 🚀'}`));

    appendProject(project);
  }

  function showHelp() {
    console.log('visio help');
  }

  parseCommand();
})();