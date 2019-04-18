## Problem Statement:
	
The problem we are attempting to solve is an inability for students and educators to create personalized learning environments in an interactive, fun, and exciting manner. From various interviews with K-12 students, many of them are typically placed in fixed environments where evaluating and practicing their skill of a topic comes in the form of standardized physical homework assignments from textbooks. Additional interviews show that although some K-12 schools are implementing online homework assignments as a tool to better stimulate student achievement, other schools continue to rely on physical textbook homework assignments to assist student learning. Furthermore, research shows that a combination of both textbook and online homework assignments increases student achievement (Liberatore). Also group learning environments demonstrate an increase of academic achievement as well (Johnson). Thus, we intend to directly address the lack of a flexible online resource for students that is capable of personalized learning environments that is both accessible, customizable, and easily shareable for the academic needs of the individual or group. 

In an interview with a local Seattle high school student, they mentioned that their math online learning environment was dull and lacked any incentive to complete more than what was required. This same student also indicated that some math sets that they completed were incredibly redundant and would have preferred to tailor the problems based on what skills they wanted to practice more. This student’s experience resonated with those of other university students where math platforms like WebAssign lack customization, student flexibility, and incentives. In these cases, current online platforms are incredibly rigid where students are unable to customize their learning environment outside of completing required problems from an instructor. Additional presented concerns from said students indicated that very few options for creating easily shareable and customizable academic practice tools existed. 

After conducting additional interviews with local Seattle students that had experience using online learning tools like Kahoot! and Quizlet, we found that most students found them either too difficult to get started with or not personalized enough for individualized learning. Students with experience using Kahoot! only found this tool most useful in personal classroom settings that although fun, did not personalize a learning environment dedicated to improving academic achievement. Interviewees with experience using Quizlet mentioned that although a popular tool, wasn’t easy to get started with. In this case, tools like Quizlet and Kahoot! may not be accessible to all students regardless of their proficiency with technology. 

### References

Liberatore, Matthew W. "Improved student achievement using personalized online homework." Chem. Eng. Educ 45.3 (2011): 184-190.

Johnson, Roger T., and David W. Johnson. "Active learning: Cooperation in the classroom." The annual report of educational psychology in Japan 47 (2008): 29-30.


## Solution

### Screen #1

![alt text](https://i.imgur.com/pIFNNKb.png "Screen 1")

- The “Log in” button will lead the user to the corresponding login page (Screen 2) where they can input their credentials to access their problems sets and view their standing on the leaderboard. The presence of this button on middle of the landing page allows for users to easily navigate to the login page if they choose to.
- The “Create New Account” button leads to the account creation page (Screen 3) where new users can create accounts. This allows for new users to create problem sets, save them, and also put themselves on leaderboards after they have completed a problem set.
- In the middle of the page resides a large block of text that should introduce new users to the web application and what features it provides. This is an important feature that presents new users with core functionality of the web application. 
- The navigation bar holds a logo on the left that is not clickable. The “log in” and “create account” buttons lead to their respective pages as mentioned above. The “leaderboards” button leads to the leaderboards page on Screen 5. This navigation bar maybe contain duplicates with buttons already on the main landing page but serve as a consistent navigation tool regardless of what screen they are currently on

### Screen #2
![alt text](https://i.imgur.com/2rf2klT.png "Screen 2")
- The logo in the top left-hand corner will be a static image of the website’s logo and will not link to anything. This is because we already have a home button to redirect to our home page and the logo can just stay an image.
- The ‘Home’ button will direct the user back to the home screen specced in page 2. This allows the user to navigate easily back to the homepage.
- The ‘Create Account’ button will direct the user to the Create Account page specified on page 4. This will allow users to navigate to creating an account if they are not already signed in, in which case they would not need to create an account.
- The ‘Leaderboards’ button will direct the user to the leaderboards page specified in page 6. This will allow users to easily see the leaderboard whenever they wish.
- The ‘Username’ field will be an entry box will be a plain-text input box. This will allow the user to input UTF-8 text less than 50 characters to be submitted to our backend.
- The Password field will be an entry box will be a plain-text input box. This will allow the user to input UTF-8 text less than 50 characters to be submitted to our backend.
- The ‘Login’ button will validate the user input for logging in by checking the hashed information in our backend and will continue to their account. If not valid, it will raise an error from a browser dialog that says that the account does not exist. If there is no text in either the username or password fields, the login button will not be pressable.
- The ‘Create Account’ will redirect them to the account creation page specified above.

### Screen #3
![alt text](https://i.imgur.com/ABQjpde.png "Screen 3")
- The navigation bar will follow the same design with the same reasons as specified on page 3 except for the “Create Account” button will now be a “Log In” button. This provides the user a pathway to log in if they already have an account.
- This screen features a centered header which states “Create Account” which lets the user know the purpose of the following inputs.
- The username and password inputs are centered alongside a label for each of them. This is to minimize confusion for their purpose.
- Below the inputs is a rounded button which helps signify that it is a button. When clicking the button there are three scenarios. The first is that someone else already has the username that they tried, in which case an error from a browser dialog will let them know that username has already been chosen. If they fail to enter in a password or username, an error from a browser dialog would let them know that they missed the field or both of them. If there is no user with the same username and they provided a password an account will be created for this user and they will be directed to the next screen (page 5).
- There is another pathway for the user if they recognize that they already have an account which is at the bottom. Here there is a label beside a login button which will redirect them to the login screen on page 3.

### Screen #4
![alt text](https://i.imgur.com/1hJXMPs.png "Screen 4")
- The logo in the top left-hand corner will be a static image of the website’s logo and will not link to anything. This is because we already have a home button to redirect to our home page and the logo can just stay an image.
- The ‘Home’ button will direct the user back to the home screen specced in page 2. This allows the user to navigate easily back to the homepage.
- The ‘Leaderboards’ button will direct the user to the leaderboards page specified in page 6. This will allow users to easily see the leaderboard whenever they wish.
- The ‘Example Problem Set Title…’ box will be an input box that will hold the title of the problem set that was just created as specified in page 8.
- The ‘Example link’ box will be a textbox that is read and copy only, and will hold the website link to the problem set that was just created as specified in page 9.
- The ‘Test Yourself’ box will be a button that will link directly back to the problem set linked above. 
- The ‘Create Another Problem Set’ box will be a button that will link directly to the problem set creation page specified in page 8.

### Screen #5
![alt text](https://i.imgur.com/am5ivav.png "Screen 5")
- The ‘My Account’ button will direct the user to the My Account page specified in page 7. This will allow users to navigate to their account page to look at their account details. This will only show when users are already logged into their account.
- The Log out button will allow the user to log out of their account at any time to ensure that no one can use their account when on a shared device. This will only show when users are already logged into their account.
- This page displays the overall leaderboards of all accounts using our platform. This will allow users to easily see how they stack up with other people using our website. This page will add a sense of accomplishment for the users as well as a sense of competitiveness which will help motivate them to continue solving problem sets.
- The simple ranking system from best to worst is something that is easy to understand and will allow users to easily pick up on any changes in position.
The addition of showing how many points the user has on the right hand side also allows them to better understand how close or how far they are from other competitors as well as to track their own progress.

### Screen #6
![alt text](https://i.imgur.com/4SYHoPv.png "Screen 6")
- This page displays the account details of the users which can be found by clicking on “My Account” in the top right corner of the page within the header section after being logged in already.
- This page will allow the user to see all of their user details which includes their username, e-mail, and the amount of points they have accumulated.
- Both the username and e-mail are very basic pieces of information that we will allow the user to easily edit from this page as they may want to change either of them.
- The information about the user’s password is omitted for security reasons as the user may accidentally leave their account logged in. 
- The amount of points the user has accrued is listed here in order to give the user the satisfaction of accomplishment. This page will also allow them to track their progress without having to engage with the competitive nature of the leaderboards.

### Screen #7
![alt text](https://i.imgur.com/AuJsgqI.png "Screen 7")
- For the same reasons stated on page 7 the navigation bar along with account information is provided at the top of the screen. 
- This screen allows users to create new problem sets containing various questions and answers. 
- There is an input box for users to put the title of their question set. It is a textbox and centered at the top of the screen so users can quickly title their problem set. 
- There are titles showing that the questions and answers are in separate columns because users may get confused on which box to input the question or answer. This lets users be more confusing and keeps the problem set organized. 
- The questions and answer boxes correspond to each other in rows and are numbered. Users will be able to input both the question and the answer to the question in the text boxes above. They take up the bulk of the screen because users will be focusing on creating these questions and answers. 
- Users are also able to include more questions with corresponding answers by clicking the new question button located on the bottom left of the last question. After a user clicks the button a new question and answer box will appear with a corresponding number. They will be allowed to add an unlimited number of questions.
- The bottom right of the screen has a submit problem set button which after being clicked, will submit the problem set to their account. Having the submit problem set button allows users to understand that their problem set has been successfully created and ready to use. 


### Screen #8
![alt text](https://i.imgur.com/Ql2ZPGT.png "Screen 8")
- For the same reasons stated on page 7 the navigation bar along with account information is provided at the top of the screen. 
- This screen allows users to answer the questions of an existing problem set. 
- The layout of this screen is similar to the screen on page 8 because a similar design makes our application more consistent and easier to understand. 
- The title of the problem set currently being worked on is stated at the top. This title is clearly indicated to show what the user is working on. 
- The titles showing the users that the questions and answers are on separate columns are still present to be consistent with the screen on page 8. 
- The questions are still on the left side of the screen and have their corresponding answer boxes on the right side of the screen. This placement is to ensure visual clarity so the user knows what problem/answer correspond to each other. 
- All the question and answer pairs are numbered because users have to see how many questions there are and it allows them to know which question they are working on. 
- On the bottom right of the screen there is a submit your answers button which will submit all the answers the user has after they finish answering questions. It lets users understand that their answers have been successfully recorded for the corresponding questions. They will then be redirected to the screen on page 11.

### Screen #9
![alt text](https://i.imgur.com/kggWGrv.png "Screen 9")
- The “example problem set title” represents the problem set title that is not editable in this screen.
- After submitting a set of problems/answers in screen 7, the user will be guided to share the generated link to the problem set to others. Users that visit the generated problem set link on screen 4 can complete the problem by submitting their answers. 
- The user that’s created the problem set can test themselves by pressing the “test yourself” button on the middle-left where it will present screen 8. 
- If the user chooses to create another problem set, they can press the “create another problem set” button that leads them to screen 7. 
- Both buttons are centered at the middle of the screen to present the user with next steps after they have created the problem set. These buttons are large and centered because they provide next steps to the either taking the problem set test or creating another one. 
- The navigation bar remains consistent with the other screens to allow users to navigate between the various features of the application as well as logging out. 

### Screen #10
![alt text](https://i.imgur.com/A4vVc7E.png "Screen 10")
- The navigation bar will stay the same throughout each of the pages after a user has logged in. Home directs to page 5, “My Account” redirects to page 7, and logging out would redirect to page 2, while logging out the user.
- The title of the problem set the user just created will be centered at the top keeping the consistency that we had and reminded the user what this score is related to. 
- This page will display the percentage of answers they were correct on as well as a score which would contribute to their score on the leaderboard.
- The try again button allows the user to immediately try to improve their score. By providing them feedback immediately and giving them a chance to improve their score we aim to make them want to master this quiz. 
- There also is an option to create a problem set from this screen. This will redirect them to page 8. This allows users to more efficiently complete the different purposes of our solution, creating problem sets and answering them.

### Screen #11
![alt text](https://i.imgur.com/FVgb8sB.png "Screen 11")
- This screen will pop up if the user submitted a question without an answer or an answer without a question. Each problem set must have existing questions with answers to follow them, so we need to add this error to ensure robustness.
- The Try Again button will return them back to the screen and make them fix the error and add the missing questions or answers before they can successfully submit the problem set


### Screen #12
![alt text](https://i.imgur.com/CeT83w5.png "Screen 12")
- This screen will pop up if the user entered a username or password that doesn’t exist in the database of accounts. To be able to answer problems they must be logged in on a valid account so this ensures the robustness of the system
- The Try Again button will return them to the account login screen where they will have to type in a valid username and password to continue into their account

### Screen #13
![alt text](https://i.imgur.com/Rjm0cxr.png "Screen 13")
- The screen will pop up if the problem set they are trying to access does not exist. This is important to ensure that only existing problem sets are accessed and that the user knows if their link is valid.
- The Try Again button will redirect the user back to the search page where they must enter in a valid link in order to get access to a problem set








