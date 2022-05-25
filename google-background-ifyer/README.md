# google-background-ifyer

react app + chrome extension (w/content scripts) + unsplash api

this app was just a practice run to get myself comfortable using react components before I try rewriting my chronos app in react. While it may be visually disturbing to the user at this point, it utilizes fully functioning react components that when interacted with, trigger actions in the dom via chrome messaging api.

if you'd like to try it out, clone this repo locally, go to unsplash and get yourself a developer key, plug it into the App.js file circa line 9 depending on your text editor, go to 'chrome://extensions' in a chrome browser, and click load unpacked. Select the build folder within the repo.

From there, navigate to the google.com homepage. open the extension, search for any term you'd like, click on any image that appears in the popup, and watch the background of your browser take on the same image as the one you clicked on.
