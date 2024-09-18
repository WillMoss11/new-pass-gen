#!/usr/bin/env node

//Name: William Moss
//Project: password-generator
//Date(s): 09-18-2024

const args = process.argv.slice(2);

const helpMessage = `
Usage: generate-pw [options] [arguments]

Options:
  --help, -h     Show this help message
  --version, -v  Show the version number
  --caps, -c     Include capital letters
  --numbers, -n  Include numbers
  --special, -s  Include special characters
  --length, -l   Length of the password (default: 8)
`;

const versionMessage = 'generate-pw version 1.0.0';

if (args.includes('--help') || args.includes('-h')) {
  console.log(helpMessage);
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  console.log(versionMessage);
  process.exit(0);
}

function showErrorAndExit(message) {
// This function will display an error message and exit the program.
  console.error(`Error: ${message}`);
  console.log('Use "generate-pw --help" for usage information.');
  process.exit(1); // Exit with error code
}

function main() {
// This function will generate a random password based on the options provided by the user.
  const smallSet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const largeSet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const numberSet = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const specialSet = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "{", "}", "[", "]", "|", ";", ":", "'", "<", ">", ",", ".", "?", "/", "~", "`"];
  
  let charSet = smallSet;

  if (args.includes('--caps') || args.includes('-c')) {
    charSet = charSet.concat(largeSet);
  }
  
  if (args.includes('--numbers') || args.includes('-n')) {
    charSet = charSet.concat(numberSet);
  }

  if (args.includes('--special') || args.includes('-s')) {
    charSet = charSet.concat(specialSet);
  }

  const lengthIndex = args.indexOf('--length') !== -1 ? args.indexOf('--length') + 1 : args.indexOf('-l') + 1;

  let length = 8; // Default length
  if (lengthIndex > 0) {
    if (!args[lengthIndex] || isNaN(args[lengthIndex])) {
      showErrorAndExit('Invalid or missing value for --length. Please provide a valid number.');
    } else {
      length = parseInt(args[lengthIndex]);
    }
  }

  // Ensure there are options selected for character sets
  if (charSet.length === 0) {
    showErrorAndExit('No character sets selected. Use options like --caps, --numbers, or --special to choose a set.');
  }

  // Generate password
  const password = Array.from({ length }, () => charSet[Math.floor(Math.random() * charSet.length)]).join('');
  console.log(password);
}

main();