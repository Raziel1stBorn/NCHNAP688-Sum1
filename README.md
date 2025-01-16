<details>
  <summary>Assessment Details</summary>

|                    | Description                                 |
| ------------------ | ------------------------------------------- |
| Course Title:      | Software Engineering                        |
| Course Code:       | NCHNAP688                                   |
| Assessment Title:  | Summative Assessment One                    |
| Assessment Number: | AE1                                         |
| Restrictions:      | 1,500 words +/- 10%,  excluding data tables |
| Description:       | Report (workplace case study)               |
| Hand-in Deadline:  | 17th January 2025, 23:59                    |

</details>

# Project: Time Zone Meeting Aid
[Access the live app](https://raziel1stborn.github.io/NCHNAP688-Sum1/)

<details>
  <summary>1. User and Technical Documentation</summary>
  <hr>

  ## Prerequisites

  The following files are needed to run this product. <br>
  And an internet connection to access the APIs. 

| File                        | Purpose                                                               |
| ------------------          | -------------------------------------------                           |
| index.html                  | The welcome web page containing user instructions                     |
| index.css                   | Cascading style sheet to control formatting on the index.html page    |
| app.html                    | The application web page, where the application is displayed          |
| application_page.css        | Cascading style sheet to control formatting on the app.html page      |
| open_streetmap.css          | Cascading style sheet to control the Leaflet OpenStreetMap            |
| map.js                      | Javascript which gives the application its functionality              |
| images/index_background.png | Background image for the index.html page                              |
| images/location_pin.gif     | Custom pin image for marking the first (your) location                |
| images/participant_pin.gif  | Custom pin image for marking the second (participant) location        |

<br>

  ## Clone and Initialise Repository

  Provide step-by-step instructions to clone the repository and set up the environment

  To clone this repository, and set up a test environment of your own:

  1. Install [Git](https://git-scm.com/) (if not already installed)
  
  2. Open your Git terminal and run: git clone https://github.com/Raziel1stBorn/NCHNAP688-Sum1
     <br>
  ![Image showing Git Bash cloning of a repository.](/development_progress_images/bash_clone_repository.jpg)

  3. Navigate to the project directory
     <br>
  ![Image showing project directory path in Git Bash Terminal.](/development_progress_images/bash_directory_navigate.jpg)

  4. Open [Visual Studio Code](https://code.visualstudio.com/) (assuming installed) on your local PC with the command <**code .**>
     <br>
  ![Image showing visual studio code bash open command.](/development_progress_images/bash_vs_code.jpg)
     
  5. Set up the environment
      - Ensure [Node.js](https://nodejs.org/) is installed
      - From the GitBash terminal run the command <**npm install**>
      - From the GitBash terminal run the command <**npm install jest --save-dev**>
<br>

  6. In Visual Studio Code, edit the map.js file, removing the comment markers on lines 11 and 22. All tests will fail if this code is left commented, but the app will not run in a web browser if it is uncommented. Save the map.js change.
     <br>
  ![Image showing code edit of map.js.](/development_progress_images/map_js_code_edit.jpg)

  7. Open a terminal in Visual Studio Code and run the command <**npm test**>
     <br>
  ![Image showing npm test command in Visual Studio Code.](/development_progress_images/npm_test_vs.jpg)  

  <br>
  Note: There are still bugs and testing coverage is not complete at time of release.   
  <br><br>

  ## Third-Party Code and APIs

  [Leaflet](https://leafletjs.com/) for the interactive map.<br>
  [OpenCage](https://opencagedata.com/) for the geocode locations and time zones. 

  <br>

  ## Technology Stack
  
  [HyperText Markup Language](https://developer.mozilla.org/en-US/docs/Web/HTML) <br>
  [Cascading Style Sheets](https://developer.mozilla.org/en-US/docs/Web/CSS) <br>
  [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) <br>
 
  <hr>
</details>


<details>
  <summary>2. Purpose</summary>  
  <hr>
  
  ## Purpose
  
  My employer is part of Associated British Foods plc, which is multi-national business with operations in [56 countries around the world](https://www.abf.co.uk/about-us/where-we-operate). With colleagues in multiple time zones, planning meetings with consideration and convenience can be challenging. My product proposal is for an easy-to-use application where users can set the date and time they would like the meeting, their location, and then select a second location relating to a meeting participant in another location. The application will give the equivalent date and time for the participants location, thus enabling the meeting organiser to see the relative date and time they are requesting.   
<hr>
</details>

<details>
  <summary>3. Design</summary>  
  <hr>
  
## Low-Fidelity Plan
A low-fidelity flow for the application was prototyped using Figma and is available at [Figma.com](https://www.figma.com/proto/kTpbqRqdkA15Keu1uF1nJs/Summative-1?node-id=1-2&t=BiJiPwSoCtLmuO3u-1/).

A welcome screen will provide the user with some basic information about the application, and will feature some appropriate imagery and branding.
The user can start using the functionality of the application, or quit. As this is a web-based application, quitting will take them to the ABF homepage.
 
  ![Image of Low-fidelity Figma mock up of the application.](/images/figma_low_fi_01.jpg)


## Moodboard

To aid decision making regarding colour schemes and design choices, I created a moodboard. I identified HEX and RGB values of company colours for easy reference. A list of CSS web safe fonts was obtained from [w3schools.com](https://www.w3schools.com/cssref/css_websafe_fonts.php), Verdana was chosen as it is stylistically complementary to the font used for the Associated British Foods plc text. An AI generated image of the globe was created using [Microsoft Designer](https://designer.microsoft.com/image-creator?scenario=texttoimage).            

  ![Image of moodboard showing colour and font design elements.](/images/mood_board.png)



  <hr>
</details>

<details>
  <summary>4. Project Planning</summary>
  <hr>

  ## Development Approach
  
The development approach of this project will be iterative and agile, with an expectation of three sprints. A significant component of this product is the user interface (UI), an [iterative agile approach](https://ieeexplore-ieee-org.ezproxy.neu.edu/document/4293575) allows for the testing of useable software and UI at earlier stages in the software development lifecycle, and results from this can lead to changes in development. 
<br><br>

  ## Features and Branches

In addition to the 'main' branch, there will be three additional branches, containing the features as shown in the table below. The names of the branches relate to the distinct areas of the project, Documentation, Welcome, Application.   
  
<table>
  <thead>
    <tr>
      <th>Branch/Page</th>
      <th>Feature</th>
      <th>Detail</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Documentation</td>
      <td>Development Images</td>
      <td>Upload development images for use in README.md.</td>
    </tr>
    <tr>
      <td>Welcome (index.html)</td>
      <td>Page Set Up</td>
      <td>Create page with basic layout.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>Background Image</td>
      <td>Create and place the image.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>Instructional Text</td>
      <td>Write and place the instructional text.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>Buttons</td>
      <td>Add buttons and test link functionality.</td>
    </tr>
    <tr>
      <td>Application (app.html)</td>
      <td>Page Set Up</td>
      <td>Create page with basic layout.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>Map</td>
      <td>Get a map to display.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>Your Location</td>
      <td>Build functionality for selecting a date and time, logging and clearing a location.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>Participant Location</td>
      <td>Build functionality for selecting a location for the meeting participant.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>Results</td>
      <td>Build functionality for obtaining the particpants date and time.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>Message Section</td>
      <td>Write code to appropriately update the message section with user prompts.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>Buttons</td>
      <td>Add in buttons and build functionality for the the 'Another' and 'Exit' buttons.</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>Save Feature</td>
      <td>Build functionality to save an image of the selected locations.</td>
    </tr>
  </tbody>
</table>
  <br><br>

  ## Ticketing System / Labels

  To standardise tickets and encourage good practice of providing relevant information and context, templates will be used for tickets, with bug :trollface: :hammer: tickets having a different template to feature tickets.
  <br><br>

  ### Feature Ticket Template

| Ticket Section      | Description                                                                          |
| ------------------- | ------------------------------------------------------------------------------------ |
| Title               | Write the Feature ID, followed by a short unique description                         |
| What                | What is being implemented/fixed                                                      |
| Why                 | Why is this needed                                                                   |
| Outcome             | What is the expected behaviour/result of this change                                 |
| Acceptance Criteria | What needs to be true for this change to be approved and merged with the main branch |

Also included will be who the ticket is assigned to, and any labels. 
<br><br>

  ### Bug Ticket Template

| Ticket Section      | Description                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------                                       |
| Title               | Write the Feature ID, followed by a short unique indicator of the bug                                                      |
| What Happens        | Describe the nature of the bug, including a screenshot if possible                                                         |
| What Should Happen  | Describe what the normal/expected behaviour is                                                                             |
| Impact              | Describe the impact of this bug, and why it is important to resolve it                                                     |
| Steps to Reproduce  | Describe how to reproduce the occurance of the bug so it can be investigated i.e. what you did/were doing when it happened |

Also included will be who the ticket is assigned to, and any labels. 
  <br><br>

  <img src="/development_progress_images/bug_example.jpg" alt="Image showing a filled in bug ticket." width="800"/>

  
  ### Labels
  
  I created the following custom labels to classify and identify ticket purposes.
 <br><br>
 ![Image showing custom GitHub Projects labels created for this project.](/development_progress_images/custom_labels_01.jpg)
  <br><br>
  <hr>
  
</details>

<details>
  <summary>5. Project Management Tools (DS)</summary>
  <hr>

## Project Management Tools

  Project management was via GitHub Projects. The Iterative Project Planning template was selected so that iterations/sprints can be clearly identified and managed.

  1) <b>Iteration 01</b><br>
     09 December 2024 - 15 December 2024<br>
     <b>Goal:</b> Produce a basic framework for the app, showing very basic functionality. 
      
  2) <b>Iteration 02</b><br>
     16 December 2024 - 20 December 2024<br>
     <b>Goal:</b> Acquire user feedback, add visualisation, testing.
  
  3) <b>Iteration 03</b><br>
     21 December 2024 - 04 January 2025<br>
     <b>Goal:</b> Acquire user feedback, testing.      

  <br>

  Iterations as configured in GitHub projects. 
  ![Image of GitHub projects iteration planning.](/images/github_projects_iterations.jpg)

  Basic tasks for the first iteration. 
  ![Image showing kanban style cards for To Do, In Progress, and Done.](/images/kanban_style_cards_iteration01.jpg)




  <hr>
</details>



<details>
  <summary>6. Build Process Narration (DS)</summary>
  <hr>
  
  ## Sprint 1
  By the end of the first sprint, the Welcome page was completed with basic formatting and container areas for a welcome message and links. Links to the Application page and the abf.co.uk site were included but lacked image buttons. The Application page featured three container areas for Date/Time Entry, the map, and actions/links. The map was interactive, allowing zoom and navigation, but lacked customization and additional functionality for this specific application.       

<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/development_progress_images/sprint_1_welcome_end.jpg" alt="Image showing the welcome Page progress by the end of the first sprint." width="500" style="margin-right: 10px;"/>
  <img src="/development_progress_images/sprint_1_app_end.jpg" alt="Image showing the App Page progress by the end of the first sprint" width="500"/>
</div>


  ## Sprint 2
Limited developer resources and an overly optimistic schedule resulted in less progress than expected during sprint 2. Efforts focused on the Application page, with no updates to the Welcome page. 
<br><br>
Development began on selecting the source location's date and time and marking the source on the map, using a temporary pin image. Page formatting evolved to include three sections: Source, Destination, and Results. A button was added to log source coordinates, ensuring the program recognises the intended click. A clear button was also introduced to reset the source coordinates for corrections. Elements displaying exact longitude and latitude were added for clarity. 
<br><br>
Testing revealed the need for user feedback, leading to the creation of a dynamic "MESSAGE" section. This section provides instructions and feedback based on user actions. Temporary button images were created for the three main actions at the bottom of the application.  

<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/development_progress_images/sprint_2_welcome_end.jpg" alt="Image showing the welcome Page progress by the end of the second sprint." width="500" style="margin-right: 10px;"/>
  <img src="/development_progress_images/sprint_2_app_end.jpg" alt="Image showing the App Page progress by the end of the second sprint" width="500"/>
</div>
  
  ## Sprint 3
  Similar to Sprint 2, Sprint 3 was impacted by limited developer availability, resulting in the missed MVP delivery deadline of 4th January 2025. However, the project remains on track to meet the hard deadline of 17th January 2025. Despite delays, progress was made on the Application page.
    
<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/development_progress_images/sprint_3_welcome_mid.jpg" alt="Image showing the welcome Page progress during the third sprint." width="500" style="margin-right: 10px;"/>
  <img src="/development_progress_images/sprint_3_app_mid.jpg" alt="Image showing the App Page progress during the third sprint" width="500"/>
</div>

Real column headings have replaced placeholders. Functionality to select a second location has been added, and the "Results" section now displays the First Location information. However, the code to calculate and display the Second Location's date and time is still pending. Frame sizes were adjusted to ensure all elements are visible on a 1920x1080 resolution display without vertical scrolling, though visibility may vary based on individual user setups.
<br>
  The timeframe for this sprint has been extended as feedback from a third-party user has not yet been sought. Additionally, it is evident that a 4th and potentially 5th sprint will be required to deliver the MVP. <br>
<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/development_progress_images/sprint_3_progress_overview.jpg" alt="Image showing duration change to Iteration 3, and addition of Iteration 4" width="800" style="margin-right: 10px;"/>
</div>

<br>
The third sprint concluded by progressing the development of the index.html page and obtaining third-party user feedback. 
<br>

<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/development_progress_images/sprint_3_welcome_end.jpg" alt="Image showing the welcome Page state at the end of the third sprint." width="500" style="margin-right: 10px;"/>
  <img src="/development_progress_images/sprint_3_app_end.jpg" alt="Image showing the App Page progress at the end of the third sprint" width="500"/>
</div>
<br>
While working on the index.html Welcome page and reviewing the branding style of the ABF website, it became clear that ABF uses CSS-styled navigation buttons instead of images. Consequently, the Welcome page design was updated to align with the brand..<br> 
<br>

### User Testing

At this point user testing was conducted. Testing was in the form of moderated usability testing, where I sat with the user whilst they used the application, observing them, answering their questions and asking them questions about the app. User testing yielded the following insights:<br><br>

<ol>
  <li>Confusion about <b>how to navigate the map</b>, user did not know about scroll wheel zoom function and hold to pan.</li><br>
  <li>The <b>pin heads</b> are too large. (Note: These are temporary pins anyway)</li><br>
  <li>There is <b>no link between the colour of the pin</b> and the source/destination location.</li><br>
  <li>Query over why the 'Log Coordinates' <b>button is below the coordinates</b> and what the point of seeing the coordinates is if one can't type them in.</li><br>
  <li>The <b>three buttons</b> at the bottom need new labels.</li><br>
  <li>The <b>'MESSAGE'</b> section needs to be more visible.</li><br>
</ol>

Based on the user testing I was able to create the below empathy map, which can aid the developer to be more in touch with the user's experience of the app and what their needs are. 
  
<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/development_progress_images/empathy_map_1.jpg" alt="Empathy map created following user testing." width="700"/>
</div>

  ## Sprint 4
  The final sprint will address user feedback, finalize the Application page, and complete code testing documentation. 
<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/development_progress_images/sprint_4_list.jpg" alt="Image showing sprint 4 to do items" width="800" style="margin-right: 10px;"/>
</div> 

<br>

At the end of this sprint:
<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/development_progress_images/sprint_4_welcome_1.jpg" alt="Image showing the Welcome page at the end of the Sprint 4." width="500" style="margin-right: 10px;"/>
  <img src="/development_progress_images/sprint_4_app_1.jpg" alt="Image showing the app page at the end of Sprint 4" width="500"/>
</div>
<br>

Downloaded image output.<br>
<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/development_progress_images/date_time_meeting_snapshot (10).png" alt="Showing example downloaded image from app" width="500" style="margin-right: 10px;"/>
</div>
<br>

Although the app is functional in the developer's environment, the code requires further testing and currently has limited test coverage.
<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/development_progress_images/sprint_4_test_coverage.jpg" alt="Image showing test coverage." width="600"/>
</div>

<br>

A Lighthouse report showed strong performance, accessibility, and best practices, with scores in the upper 90s. However, it recommended improving element contrast for better accessibility.
<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/development_progress_images/lighthouse_25_01_12.jpg" alt="Lighthouse report." width="600"/>
</div>


  <hr>  
</details>

<details>
  <summary>7. Test-Driven Development</summary>

  ## Test-Driven Development

  [Test-driven development](https://doi-org.ezproxy.neu.edu/10.1109/MC.2005.314) (TDD) is a strategy where automated tests for software functions are designed and written before the actual code. This approach ensures that as soon as the function is implemented, the tests are already in place, which can lead to faster development and higher-quality code. It encourages the programmer to anticipate the function's inputs, outputs, and potential failure conditions.
<br><br>
Example of TDD: The application requires the user to select a date and time using the datetime-local input type, but the format is not user-friendly. A function is needed to convert it to a more accessible format. The unit test checks if the function (yet to be written) produces the expected output for various date-time formats and an invalid input type.
<br>

<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/development_progress_images/tdd_1.jpg" alt="Image showing code for test-driven development." width="650"/>
</div>
<br>
Running this test suite:<br>
<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/development_progress_images/tdd_2.jpg" alt="Image showing test failing." width="500" style="margin-right: 10px;"/>
  <img src="/development_progress_images/tdd_3.jpg" alt="Image showing test suite failing results" width="200"/>
</div>

This is because the function does not exist, or is not accessible to the tests.<br><br>
The following show the created <b>formatDateTime</b> function and changes to testing code to make the function accessible.<br>
<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/development_progress_images/tdd_4.jpg" alt="Image showing the code for the formatDateTime function." width="350" style="margin-right: 10px;"/>
  <img src="/development_progress_images/tdd_5.jpg" alt="Image showing the amended testing code to access the formatDatTime function" width="500"/>
</div>
<br>
Running the test suite again: <br>
<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/development_progress_images/tdd_6.jpg" alt="Image showing successful completion of formatDateTime function testing." width="500"/>
</div>
</details>


<details>
  <summary>8. Evaluation (DS) </summary>

 <hr>

  ## Product
  The product turned out better than expected. In the spirit of agile development, features not originally planned, such as pin markers and location details (country and street), were added during development to enhance the user experience. However, while functional, the product is far from release-ready. Full test coverage is incomplete, and there are known issues.
<br><br>
One major usability concern is the broken logic with the **"Clear Coordinates"** button. If the first location is cleared after selecting the participant location and a new first location is chosen, the participant location must also be redone, which was not intended. Additionally, using "Clear Coordinates" can create a situation where results are generated without a first location pin.
<br><br>
There is still much work to be done to tidy up the code, including adding comments, refactoring, and removing redundant code. Despite these issues, the product is usable, and I am pleased with it overall, especially the Leaflet API interactive map, which was a significant improvement over the initially envisioned static map.   
<br>

  ## Process
  This was my first time creating and sharing a repository on GitHub, as well as using GitHub Projects. My previous experience with JavaScript was minimal, so there were many unknowns and a lot to learn throughout the project. Looking back, there are many things I would do differently. It was not until near the end of the development process that I fully understood the correct use of branches and how to best create tickets. I worked mostly on a local copy of the repository and had an unfortunate experience early on where I lost work due to fetching from GitHub, which overwrote my latest changes on the local main branch.
  <br><br>
Being unfamiliar with project management and ticketing, it took me a long time to appreciate the value of tickets. For most of the project, I felt that raising tickets for myself was unnecessary since I was the only one on the project. Why not just address the issue immediately without logging it? Over time, I came to see the system as a to-do list and log, which helped ensure that nothing was overlooked.
<br><br>
Given that this was all new to me, I did not have much confidence at the start that I could produce a working product. Several times, I regretted choosing this app idea and wished I had picked something simpler. In hindsight, I should have started by designing the app's logic and functions before at the low-fi screen stage. Not doing this led to a somewhat disorganised codebase, which is difficult to maintain, navigate, and understand. Despite these challenges, the project resulted in a usable product, and I have learned valuable lessons about planning and documentation that I can apply in my workplace.
     
 <hr>
 
</details>
