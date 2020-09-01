const fs = require('fs');
const util = require('util');
const inquirer = require('inquirer');
const thenableWriteFile = util.promisify(fs.writeFile);




function promptUser() {
return inquirer.prompt([
    {
        type: "input",
        name: 'title',
        message: 'What is the title of your project?'
    },
    {
        type: "input",
        name: 'description',
        message: 'What is the description of your project?'
    },
    {
        type: "input",
        name: 'installation',
        message: "What are the steps required to install your project?"
    },
    {
        type: "input",
        name: 'usage',
        message: 'Waht are the instuctions for the project and examples for use?'
    },
    {
        type: "input",
        name: "contribution",
        message: "What are the conribution guidelines?"
    },
    {
        type: "input",
        name: "tests",
        message: "Do you have any tests for your project?"
    },
    {
        type: "list",
        name: "license",
        choices: ["MIT", "Apache", "GPL"]
    }   


]);
}
// .then(promptResponses => {
    
// })

function getReadMeOutput(answers) {

    // const title = answers.title;
    // const description = answers.description;
    // const installation = answers.installation;
    // const usage = answers.usage;
    // const contribution = answers.contribution;
    // const testGuide = answers.testGuide;
    const license = answers.license;

    if(license === "MIT") {
        answers.license = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else if (license === "Apache") {
        answers.license = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else {
        answers.license = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    }
        
    return `# ${answers.title}

    ## Description 
    
    ${answers.description}
    
    
    ## Table of Contents (Optional)
    
    If your README is very long, add a table of contents to make it easy for users to find what they need.
    
    * [Installation](#installation)
    * [Usage](#usage)
    * [Credits](#credits)
    * [License](#license)
    
    
    ## Installation
    
    ${answers.installation}
    
    
    ## Usage 
    
    ${answers.usage}
    
    
    ## Credits
    
    List your collaborators, if any, with links to their GitHub profiles.
    
    If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.
    
    If you followed tutorials, include links to those here as well.
    
    
    
    ## License
    
    The last section of a good README is a license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, use [https://choosealicense.com/](https://choosealicense.com/)
    ${answers.license}
    
    
    ---
    
    🏆 The sections listed above are the minimum for a good README, but your project will ultimately determine the content of this document. You might also want to consider adding the following sections.
    
    ## Badges
    
    ![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
    
    Badges aren't _necessary_, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.
    
    
    ## Contributing
    
    ${answers.contribution}
    
    ## Tests
    
    ${answers.tests}
    
    
    `
}


promptUser()
.then(function(answers) {
    const readMe = getReadMeOutput(answers);
    return thenableWriteFile("README(generated).md", readMe)
})
.then(function() {
    console.log("Successfully generated README")
})
.catch(function(error){
    console.log("An error has occured", error)
})