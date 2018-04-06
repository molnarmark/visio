(function() {

  const os = require('os');
  const fs = require('fs');
  const chalk = require('chalk');
  const readlineSync = require('readline-sync');

  const debugMode = false;

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

  function debug(message) {
    if (debugMode)
      console.warn(message);
  }

  function parseCommand() {
    const commands = process.argv.splice(2);
    init();

    switch(commands[0]) {
    case 'new':
      newProject();
      break;

    case 'list':
      listProjects();
      break;

    case 'remove':
    case 'delete':
      removeProject(commands[1]);
      break;

    case 'view':
      viewProject(commands[1]);
      break;

    case 'finish':
      finishProject(commands[1]);
      break;

    case 'help':
      showHelp();
      break;
    }
  }

  function init() {
    if (fs.existsSync(fileName)) {
      currentProjects = JSON.parse(fs.readFileSync(fileName, 'UTF-8'));
      debug('Projects file was read.');
    } else {
      debug('Should create the file.');
      fs.openSync(fileName, 'w+');
    }
  }

  function getRandomLine(type) {
    const from = responses[type];
    return chalk.red.bold(from[Math.floor(Math.random() * from.length)]);
  }

  function listProjects() {
    if (Object.keys(currentProjects) == 0) {
      console.log(chalk.red.bold('You don\'t have any ideas as of now!\n'));
    } else {
      console.log(chalk.cyan.bold('Your stored ideas:\n'));
      for (let key in currentProjects) {
        console.log(chalk.white(`${chalk.yellow.underline(key)} with the difficulty listed as ${chalk.yellow.underline(currentProjects[key].hardness)}, to be implemented using ${chalk.yellow.underline(currentProjects[key].stack )}.`));
      }
    }
  }

  function viewProject(projectName) {
    if (currentProjects[projectName] == null)
      return console.log(chalk.red('This project does not exist.'));

    console.log(`${chalk.cyan.underline('Project name:')} ${chalk.white(projectName)}`);
    console.log(`${chalk.cyan.underline('Project description:')} ${chalk.white(currentProjects[projectName].description)}`);
    console.log(`${chalk.cyan.underline('Project stack:')} ${chalk.white(currentProjects[projectName].stack)}`);
    console.log(`${chalk.cyan.underline('Project difficulty:')} ${chalk.white(currentProjects[projectName].hardness)}`);
  }

  function appendProject(project) {
    currentProjects[project.projectName] = {
      description : project.projectDescription,
      stack       : project.projectStack,
      hardness    : project.hardness
    }

    fs.writeFileSync(fileName, JSON.stringify(currentProjects), 'UTF-8');
  }

  function finishProject(projectName) {
    if (currentProjects[projectName] == null)
      return console.log(chalk.red('This project does not exist.'));
    console.log(`${chalk.yellow('Congratulations!')} You just finished ${projectName}!`);
    removeProject(projectName);
  }

  function removeProject(projectName) {
    if (currentProjects[projectName] != null) {
      delete currentProjects[projectName];
    }

    fs.writeFileSync(fileName, JSON.stringify(currentProjects), 'UTF-8');
  }

  function newProject() {
    let project = {};
    console.log(chalk.bold.magenta('Let\'s do the Open Source magic! 🚀\n'));
    process.stdout.write(chalk.white('What would you like to name your project? '));
    project.projectName = readlineSync.question('');

    process.stdout.write(chalk.white(`Alright.. so it's ${chalk.bold.yellow(project.projectName + ',')} but what does it do? `));
    project.projectDescription = readlineSync.question('');
    process.stdout.write(getRandomLine('description'));

    process.stdout.write(chalk.white(`What technologies/languages do you plan on using for ${chalk.bold.yellow(project.projectName + '?')} `));
    project.projectStack = readlineSync.question('');
    process.stdout.write(getRandomLine('description'));

    process.stdout.write(chalk.white(`How hard do you think implementing ${chalk.bold.yellow(project.projectName)} is? (${chalk.grey(difficultyOptions.join(', ') + ')')} `));
    project.hardness = readlineSync.question('');
    process.stdout.write(chalk.cyan.bold(`\n🚀  Good luck on your development journey implementing ${project.projectName + '! 🚀'}`));

    appendProject(project);
  }

  function showHelp() {
    console.log(chalk.white.underline('Commands:\n'));
    console.log(`${chalk.yellow.underline('visio new')}:  ${chalk.white('Gives you a nice prompt to add a new project idea.\n')}`);
    console.log(`${chalk.yellow.underline('visio list')}: ${chalk.white('Lists your stored project ideas, showing the name and the difficulty.\n')}`);
    console.log(`${chalk.yellow.underline('visio view')}: ${chalk.white('View details about the given project idea.\n')}`);
    console.log(`${chalk.yellow.underline('visio remove/delete <project-idea-name>')}: ${chalk.white('Deletes the given project idea.\n')}`);
    console.log(`${chalk.yellow.underline('visio help')}: ${chalk.white('Shows this.\n')}`);
    console.log(`${chalk.yellow.underline('visio finish')}: ${chalk.white('Finishes a project idea.\n')}`);

    console.log(chalk.white.underline('About:\n'));

    console.log(`${chalk.cyan.underline('visio')} ${chalk.white('was written by Mark Molnar.')}`);

  }

  parseCommand();
})();