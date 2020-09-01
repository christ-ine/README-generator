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
        message: 'Waht are the instructions for the project and examples for use?'
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
    },
    {
        type: "input",
        name: "fullname",
        message: "Please enter your full name."
    }


]);
}


function getReadMeOutput(answers) {

    const license = answers.license;
    const licenseDescription = answers.licenseDescription;

    if(license === "MIT") {
        answers.license = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
        answers.licenseDescription = 
`MIT License

Copyright (c) 2020 ${answers.fullname}
        
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
        
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
        
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`
        
            
    } else if (license === "Apache") {
        answers.license = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
        answers.licenseDescription = 
`Copyright 2020 ${answers.fullname}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
        
    http://www.apache.org/licenses/LICENSE-2.0
        
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`
    } else {
        answers.license = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
        answers.licenseDescription = 
`Copyright (C) 2020 ${answers.fullname}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
    
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
    
You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`
    }

        
    return `# ${answers.title}

## Description 
    
${answers.description}
    
    
## Table of Contents
    
    
    
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Badges](#badges)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
    
## Installation
    
${answers.installation}
    
    
## Usage 
    
${answers.usage}
    
## License
    
${answers.licenseDescription}
    
## Badges
    
${answers.license}
    
## Contributing
    
${answers.contribution}
    
## Tests
    
${answers.tests}

## Questions

Have any additional questions? Contact me below!

* [GitHub](https://github.com/${answers.username})
* [Email me!](mailto:${answers.email})`
    
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