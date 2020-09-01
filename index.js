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
    },
    {
        type: "input",
        name: "username",
        message: "Please enter your github username"
    },
    {
        type: "input",
        name: "email",
        message: "Please enter your email address"
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
    const licenseDescription = answers.licenseDescription;

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
    
    
    ## Table of Contents
    
    
    
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
    
    ${answers.licenseDescription}
    

    ## Questions

    Have any additional questions? Contact me below!

    * [GitHub](https://github.com/${answers.username})
    * [Email me!](mailto:${answers.email})
    
    
    ## Badges
    
    ![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
    
    
    ${answers.license}
    
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