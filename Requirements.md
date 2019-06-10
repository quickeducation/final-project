# General Website Requirements:
- Every page on the website will load within 5 seconds on the UW Wifi. (Complete)
- The user can always get back to the homescreen within 3 clicks from any screen in the webpage they are at by clicking the “Home” button. (Complete)
- All screens of the website must be compatible with a screen reader by rendering semantic HTML, appropriately labeled elements, and alt/aria attributes. (Complete)
- Every page on the website must render a navigation bar at the top of the web page. (Complete)
- All error popups must allow users to close them by clicking on the “OK” button. (Complete)
- All error popups must display text indicating the relevant error that occured. (Complete)
- All performance related requirements will be verified on Team Lab computers in MGH 440. (Complete)

# Home Page Requirements:
- The home page must contain an empty input field that only accepts UTF-8 characters to navigate to the do the problem set page if the user is logged in. (Complete)
- Users must be able to successfully access a problem set after generating an ID for the problem set and inputting it into the input field if the user is logged in. (Complete)
- The homepage must contain a button labeled as “view leaderboard” that when clicked, redirects the user to the leaderboards page ignoring if they are logged in or not. (Impossible/ Revised)
     - The revised version is "The homepage must contain a button labeled as “view leaderboard” that when clicked, redirects the        user to the leaderboards page if they are logged in. If they are not logged in, it will redirect them to the login page." 
     - This was revised from the original because Firebase has limitations that do not allow information to be taken from the          database if the user is not logged in.
- The user must not be able to access a problem set from a given link unless they are logged in. After pressing the enter key and a valid problem set link is input into the text field, if the user is not logged in, they are redirected to the login page. (Revised)
     - The revised version is "The user must not be able to access a problem set from a given link unless they are logged in."
     - This was revised from the original because the our home page no longer shows an input box for the user to access problem        sets if they are not logged in.
- If a user attempts to access a problem set that does not exist, the website must provide an error popup indicating the failed attempt to the user. (Complete)
- The homepage must contain a button labeled as “create problem set” that when clicked, redirects the user to the create problem set page if they are logged in. If they are not logged in, they are redirected to the login page. (Revised)
     - The revised version is "The homepage must not display a "Create a Problem Set" button if the user is not logged in."
     - This was revised from the original because not displaying the button does the same job in a more user friendly fashion.

# Navigation Bar Requirements:
- Users must be able to access global leaderboard based on problem set completions through the leaderboard button on the navigation bar, even if they are not logged in. (Impossible/ Revised)
     - The revised version is "Users must be able to access global leaderboard based on problem set completions through the            leaderboard button on the navigation bar. If they are not logged in the leaderboard button will redirect them to the login        page."
     - This was revised from the original because Firebase has limitations that do not allow information to be taken from the          database if the user is not logged in.
- If the user is not currently signed in to an account via the browser session, the navigation bar must not display the My Account button or the Log Out button. (Complete)
- If the user is not currently signed in to an account via the browser session, the navigation bar must display the Create Account button. (Complete)
- If the user is signed in to an account via the browser session the navigation bar must not display the Create Account button. (Complete)
- If the user is signed in to an account via the browser session the navigation bar must display the My Account button and the Log Out button in the top right corner of the page. (Complete)

# Create Account Page:
- Users must be able to create an account with an email and password that are less than 60 UTF-8 characters each. The user is unable to continue adding UTF-8 characters to either email or password input field above the 60 character limit. (Complete)
- The website must prevent users from creating an account without any characters in the email or password fields by displaying an error popup at the top of the page within the same window when the user clicks on the “create account” button. (Complete)
- The website must display an error popup message on the top of webpage if either the email or password text input field is left empty and the user clicks on the “create account” button. (Complete)
- The website must display an error popup message on the top of webpage in the same window if the email input field contains UTF-8 characters that correspond to an existing email in the database after clicking on the “create account” button. (Complete)
- The website must encrypt passwords using AES-256 and store this account information in a Firebase database. (Complete)
- The website must redirect the user to the login page once they have successfully created an account on the ‘Create Account’ page after clicking on the “create account” button. (Complete)

# Login Page:
- Users must be able to login with the email and password that they registered with in the ‘Create Account’ page. (Complete)
- The login page must display empty email, password input fields that accept UTF-8 characters, and a login button that redirects the user to the corresponding my account page if successfully authenticated. (Complete)
- The website must display an error popup on the same web page and browser window if the email and password input fields contain input that are not UTF-8 characters and they have clicked on the “login” button. (Revised)
     - The revised version is "The user must only be allowed to input UTF-8 characters within the email and password input fields"
     - This was revised from the original because the webpage is rendered in UTF-8 and would only accept those characters so            displaying error messages would not be necessary.
- The website must validate the login information with the backend account database to verify if its corresponding account exists after clicking on the “login” button. (Complete)
- The website must display an error message pop on the same webpage and window if the user entered a email or password that is not found in the account database after clicking on the “login” button. (Complete)
- The website must redirect the user to their my account page if their login credentials are verified successfully after clicking on the “login” button. (Complete)

# My Account Page:
- The information displayed on the my account page must display information (E-mail, and total Points accrued) relating to the currently logged in account via the browser session. (Complete)
- The points accrued displayed on the page must be accurate to the database within 5 seconds of the loading of the page on UW wifi. (Complete)
- The points must be a direct reflection of the amount of problem sets the user has submitted with a score of 100%
- If the user clicks on the Delete Account button the page must request confirmation as a popup from the user on if they want to delete their account forever. (Complete)
- If the user clicks on the delete account button to confirm the deletion the user must be removed from being logged in via the browser session and redirected to the landing page. (Complete)
- If the user clicks on the delete account button, all the information within the database that is related to that account including Account ID, Password, E-mail, and Points Accrued must be deleted from the database. (Complete)

# Create Problem Set Page:
- The problem set webpage must allow and require users to create a title that is no longer than 60 UTF-8 characters by typing UTF-8 input into the empty create title text input field. (Complete)
- The problem set webpage must prevent users from creating a problem set without any UTF-8 characters in the title input field by displaying an error popup within the same browser window. (Complete)
- The problem set webpage must require users to create questions and answers that are no longer than 120 UTF-8 characters in their corresponding initially empty input fields. The user is unable to add UTF-8 characters to the input field if the input field contains 120 characters. (Complete)
- The problem set webpage must display a new question and answer empty input field directly below the last question and answer field row when clicking the “New Question” button. (Complete)
- The problem set webpage must prevent users from creating questions without any UTF-8 characters in the corresponding answer field by displaying an error popup within the same browser window. (Complete)
- The problem set webpage must prevent users from creating answers without any UTF-8 characters in the paired question field by displaying an error popup within the same browser window. (Complete)
- The problem set webpage must prevent users from creating a problem set by displaying an error popup within the same browser window when none of the Question/Answer fields contain any UTF-8 characters. (Complete)
- The problem set webpage must store a complete and structurally valid (all questions have answers, all fields have at least 1 UTF-8 character but are no longer than 120 UTF-8 characters) problem set after the user has clicked “submit problem set” button. (Complete)
- The problem set page must redirect the user when clicking on the “submit problem set” button to the created problem set page after creating a structurally valid and complete problem set. (Complete)


# Created Problem Set Page:
- The created problem set page must display a uniquely generated problem set ID in UTF-8 for the user to copy and share to others. (Complete) 
- The created problem set page must display a button labeled as “Test Yourself” and redirects the user to the do the problem set page corresponding to the problem set if the user clicks on it. (Complete)
- The created problem set page must display a button labeled as “Create Another Problem Set” and redirects the user to the do the create problem set page the user clicks on it. (Complete)

# Do the Problem Set Page:
- The do the problem set page must display the questions and their corresponding empty input answer input fields on the page when accessing a problem set from an ID in a browser window. (Complete)
- The do the problem set page must allow and require users to input answers that are no longer than 120 UTF-8 characters in their corresponding input fields. The user is unable to add UTF-8 characters to the answer input fields if the input field already contains 120 characters. (Complete)
- The do the problem set page must display the title of the current problem set above the questions at the top of the webpage. (Complete)
- The do the problem set page must display questions and corresponding answer input fields directly below the last question shown on the problem set page as the user scrolls down (if the number of questions/answers exceeds the number that can be displayed on the screen without scrolling). (Complete)
- The do the problem set page must display a button with the text “submit answers” that allows users submit their answers at the bottom of the page. (Complete)
- The do the problem set page must allow users to submit questions with empty corresponding answer input fields. (Complete)
- The do the problem set page problem set page must redirect the user when clicking on the “submit answers” button to the finished problem set page. (Complete)

# Finished Problem Set Page:
- The finished problem set page must allow users to reattempt the problem set they just completed by clicking on the “test again” button. (Complete)
- The finished problem set page must display the percentage of questions they answered correctly in plaintext on the problem set they just answered, rounded down to the nearest whole number. (Complete)
- The finished problem set page must display 10 of the highest scoring users for this problem set in plaintext, showing both their truncated email without the domain and score. If there are ties in the highest scoring, the first users to achieve that score are given higher priority and are placed higher. If less than 10 users have attempted this problem set, this webpage only displays those that have, including the user who just attempted this problem set. (Impossible)
     - This requirement is impossible because of how Firebase functions do not support nesting database references to obtain user set/score data for each problem set. Because Firebase prioritizes single pointers to references, utilizing nested database references to sort and filter user scores for each problem set was not feasible. Thus, displaying a leaderboard for each problem set could not be accomplished. 
- The 10 scores displayed on the finished problem set page must be accurate to the database when the webpage has finished loading within 5 seconds on UW wifi. (Impossible)
     - This requirement is also impossible like the one above because of how Firebase functions do not support nesting database references to obtain user set/score data for each problem set. Because Firebase prioritizes single pointers to references, utilizing nested database references to sort and filter user scores for each problem set was not feasible. Thus, displaying a leaderboard for each problem set could not be accomplished and a requirement where the website must load leaderboard data can also not be accomplished without being able to retrieve user scores within sets. 
- The finished problem set page must display a button which allow users to create their own problem set within one click called “create problem set” and redirect the user to the create problem set page after clicking on it. (Complete)
- The finished problem set page must display a button to redirect the user to the review problem set page called “review answers” and redirects the user to the missed problems page after clicking on it. (Complete)

# Review Problem Set Page:
- The review problem set page must display the problem set questions and answers in plaintext corresponding to the set that a user wanted to review from finished problem set page as well as the answers submitted by the same user. (Complete)
- The review problem set page must display a checkmark icon next to the answers that the user provided correctly and an X icon for the incorrect answers during their most recent attempt of this problem. (Complete)
- The review problem set page must not display the correct answer for problems which the user got wrong. (Complete)
- The review problem set page must display a button labeled “test again” and redirects the user to its corresponding do the problem set page after clicking on it. (Complete)

# Leaderboards Page:
- The leaderboards page must display a title displaying “Top 10 Solvers:” in plaintext at the top of the page above the users who completed the most problem sets to 100% completion. (Complete)
- The leaderboards page must display the rank (as an integer number), the truncated email without the domain name in plaintext, and points of all users in plaintext who submitted answers in numerical order with highest scores at the top and lowest scores at the bottom. (Revised)
     - The leaderboards page must display the rank (as an integer number), the display name in plaintext, and points of all users      in plaintext who submitted answers in numerical order with highest scores at the top and lowest scores at the bottom.
     - This was revised from the original because we decided that having the users be able to create their own display name would      be a better way to organize the database as well as a better way to ensure privacy of the users.
- The website must display the rank, truncated email, and points of lower ranked users directly below the last user shown on the leaderboards page as the user scrolls down. (Complete)
