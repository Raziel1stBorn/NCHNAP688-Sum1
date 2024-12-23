<details>
  <summary>Assessment Details</summary>

|                    | Description                                 |
| ------------------ | ------------------------------------------- |
| Course Title:      | Software Engineering                        |
| Course Code:       | NCHNAP688                                   |
| Assessment Title:  | Summative Assessment One                    |
| Assessment Number: | AE1                                         |
| Restrictions:      | 2,000 words +/- 10%,  excluding data tables |
| Description:       | Report (workplace case study)               |
| Hand-in Deadline:  | 17th January 2025, 23:59                    |

</details>

# Time Zone Meeting Aid


<details>
  <summary>Summary/Introduction</summary>
  <hr>

  
  ## Summary/Introduction
  
</details>
  
<details>
  <summary>Product Proposal</summary>
  <hr>
  My employer is part of Associated British Foods plc, which is multi-national business with operations in 56 countries around the world (ABF, 2024). With colleagues in mutliple timezones, planning meetings with consideration and convenience can be challenging. My product proposal is for an easy to use application where users can set a location, date, and time, then select a second location, and the application will give the equivalent date and time for the secondary location.   
  <hr>
</details>

<details>
  <summary>Development Approach</summary>
  <hr>

  ## Development Approach
  
The development approach of this project will be itterative and agile, with an expectation of three sprints. A significant component of this product is the user interface (UI), an itterative agile approach allows for the testing of useable software and UI at earlier stages in the software development lifecycle, and results from this can lead to changes in development (Ferreira, Noble and Biddle, 2007). 
  <hr>
</details>


<details>
  <summary>Low-Fidelity Plan and Moodboard</summary>
  <hr>

## Low-Fidelity Plan
A low-fidelity flow for the application was prototyped using Figma and is available at [Figma.com](https://www.figma.com/proto/kTpbqRqdkA15Keu1uF1nJs/Summative-1?node-id=1-2&t=BiJiPwSoCtLmuO3u-1/).

  <br>

A welcome screen will provide the user with some basic information about the application, and will feature some appropriate imagry and branding.
The user can start using the functionality of the application, or quit. As this is a web-based applicaiton, quitting will take them to the ABF homepage.

  
  ![Image of Low-fidelity Figma mock up of the application.](/images/figma_low_fi_01.jpg)

<br>

## Moodboard

To aid decision making regarding colour schemes and design choices, I created a moodboard. This was made up from screen snippets of solid colours snapped from abf.co.uk, I then identified the HEX and RGB values of these colours for easy reference when it comes to formatting the visuals of the applicaiton. A list of CSS web safe fonts was obtained from w3schools.com (2024), these were added to the moodboard and Verdana was chosen for the application font as it is stylistically complementary to the font used for the Associated British Foods plc name. An AI generated image of the globe was created using Microsoft Designer (n.d.) as it is free to use and avoids any licensing issues.            

  ![Image of moodboard showing colour and font design elements.](/images/mood_board.png)





  <hr>  
</details>

<details>
  <summary>Project Management Tools (Dedicated Section)</summary>

## Project Management Tools

  The project management tool used is GitHub Projects. The Iterative Project Planning template was selected so that the iterations and sprints can be clearly shown and managed. There are three planned iterations:

  1) <b>Iteration 01</b><br>
     09 December 2024 - 15 December 2024<br>
     <b>Goal:</b> Produce a basic framework for the app, showing very basic functionality. 
      
  2) <b>Iteration 02</b><br>
     16 December 2024 - 20 December 2024<br>
     <b>Goal:</b> Aquire user feedback, add visualisation, testing.
  
  3) <b>Iteration 03</b><br>
     21 December 2024 - 04 January 2025<br>
     <b>Goal:</b> Aquire user feedback, testing.      

  <br>

  The iterations as configured and shown in GitHub projects. 
  ![Image of GitHub projects iteration planning.](/images/github_projects_iterations.jpg)


  Setting out the basic tasks for the first iteration. 
  ![Image showing kanban style cards for To Do, In Progress, and Done.](/images/kanban_style_cards_iteration01.jpg)

</details>

<details>
  <summary>Requirement Capture</summary>
  
| ID | Details                                                                  |
| -- | ------------------------------------------------------------------------ |
| 01 | User selects their country via clicking on a map                        |
| 02 | Current date and time is shown for chosed timezone                       |
| 03 | User inputs a desired meeting date and time                              |
| 04 | User clicks on destination country                                       |
| 05 | Output shows what date and time that will be in the destination country  |
| 06 | User can print a reminder card                                           |

</details>

<details>
  <summary>MVP Build Process (Dedicated Section)</summary>
  <hr>


  
  ## Sprint 1
  By the end of the first sprint the Welcome page is built, featuring basic formatting and container areas for the Welcome message and links. Links to the Application page and the abf.co.uk site were present but without image buttons. The Application Page features three basic container areas for the Date/Time Entry, the map, and actions/links. The map is displaying and is interactive, although the code is basic, meaning it is not customised for this partiuclar application. No functionality exists on the map other than being able zoom in and out, and move around the map.      

<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/development_progress_images/sprint_1_welcome_end.jpg" alt="Image showing the welcome Page progress by the end of the first sprint." width="500" style="margin-right: 10px;"/>
  <img src="/development_progress_images/sprint_1_app_end.jpg" alt="Image showing the App Page progress by the end of the first sprint" width="500"/>
</div>


  ## Sprint 2
  Limited developer resources and an overly optimitic schedule meant that the progress in sprint 2 was much less than expected. With the resources that were available, work was focussed on the Application page, and as such there were no developments regarding the Welcome Page. 
<br>  
  Work was started on being able to select the source location's date and time, and select the source location on the map, with a temporary pin image being created to show the souce. Page formatting developed beyond the original design as it became clear that three sections are needed for the selections, i.e. Source, Destination and Results. Also required was a button to log the source co-ordinates so that logically the program knows which mouse click is the one the user intends to log the source. In light of this it also became clear that a button was needed to be able to clear the source coordinates so the user could change their mind/correct a mistake. Elements which show the exact longitude and lattitude were included to provide clear evidence that coordinates had been logged. 
<br><br>
During development and use testing it became apparent that a way of communicating and feeding back to the user was needed. As such a dedicated 'MESSAGE' section was added. This message section dynamically provides both instructions, and feedback depending on what the user is currently doing.
<br><br>
Temporary button images were created and used for the three main actions at the bottom of the application. 

<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/development_progress_images/sprint_2_welcome_end.jpg" alt="Image showing the welcome Page progress by the end of the second sprint." width="500" style="margin-right: 10px;"/>
  <img src="/development_progress_images/sprint_2_app_end.jpg" alt="Image showing the App Page progress by the end of the second sprint" width="500"/>
</div>
  
  ## Sprint 3

</details>



<details>
  <summary>User and Technical Documentation</summary>
</details>

<details>
  <summary>Evaluation (Dedicated Section)</summary>
- Content
</details>

<details>
  <summary>References</summary>
  <hr>
ABF (2024) <i>Where we operate</i> [online].<br>  
          &nbsp;&nbsp;&nbsp;&nbsp;Available at: https://www.abf.co.uk/about-us/where-we-operate  <br>
          &nbsp;&nbsp;&nbsp;&nbsp;(Accessed: 09 December 2024). <br><br>

Ferreira, J., Noble, J. and Biddle, R. (2007) 'Agile development iterations and UI design', <br> 
          &nbsp;&nbsp;&nbsp;&nbsp;<i>Proceedings of the Agile 2007 Agile Development Conference.</i> 13-17 August 2007, Washington, DC.  
          &nbsp;&nbsp;&nbsp;&nbsp;Available at: https://ieeexplore-ieee-org.ezproxy.neu.edu/document/4293575  <br>
          &nbsp;&nbsp;&nbsp;&nbsp;(Accessed: 09 December 2024). <br>

Microsoft Designer (n.d.) <iCreate images</i> [online]. <br> 
          &nbsp;&nbsp;&nbsp;&nbsp;Available at: https://designer.microsoft.com/image-creator?scenario=texttoimage  <br>
          &nbsp;&nbsp;&nbsp;&nbsp;(Accessed: 14 December 2024). <br>

w3schools.com (2024) <i>CSS web safe fonts</i> [online]. <br> 
          &nbsp;&nbsp;&nbsp;&nbsp;Available at: https://www.w3schools.com/cssref/css_websafe_fonts.php  <br>
          &nbsp;&nbsp;&nbsp;&nbsp;(Accessed: 14 December 2024). <br><br>
  
</details>
