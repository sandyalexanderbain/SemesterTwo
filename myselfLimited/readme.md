TASK: 
A concise readme.md file explaining the development approach, challenges, and technical details
of the chat's client-server communication, along with instructions for running the application.

The development approach of my website involved prioritising logic of the chat application of
my website, adding text content to the website, adding content such as hyperlinks and an image carousel.

Set up the initial files with the instruction manual provided:
  a. extension.html is chat.html
  b. create index.js in the root folder /myselfLimited
  c. add /public to root folder.
  d. add index.html and chat.html to /public
  d. add client.js to /public/js
  e. add demo.css to /public/css

The construction of the chat application was the most complicated aspect to build as it
involved learning about socket.io, express and node in order to have a working chat space.
The first challenge was finding a resource to use to learn about chat applications.
Luckily, there is a page on w3schools (the recommended online resource) that guides the
user through different aspects of implementing a chat space with socket.io. Some of these
aspects include the initial chat itself, usernames, a list of active users and then the
creation of typing indicators from a user.

Index.js creates the socket.io server that handles all the respective socket interactions.
Specifically, the sockiet.io server gets created via node.js. client.js then allows for 
incoming and outcoming message receival from the socket.io server that I created. 
chat.html (labelled as extension.html in my website package), is the html file responsible 
for displaying to any users all messages and respective dependencies such as the message 
box that can be used to send messages.

How to run my website?
1. Open terminal
2. Ensure you are in the /myselfLimited directiory.
  - You can use "cd", followed by the name of the folder to enter the directory
  - "cd .." will go back a directory layer.
  - Type "ls" to check the accessible folders and files within a directory.
3. Type "node index.js" and a message "Listening on 3000" should appear.
4. Open your browser (e.g. google chrome or safari) and type in "http://localhost:3000"

My website is designed to be read from top -> bottom and left -> right.
There is a navigation bar on the bottom of the website with buttons that take you to
different pages. You start of in "index.html", which is the home page.

Clicking on "Learn more" brings you to "more.html".
Clicking on "Chat w/others" brings you to "extension.html".

Respective "BACK" buttons appear when you go to any page outside the home page.

Any text underlined is a hyperlink that takes you to a respective map or a website.

To use the chat, open the chat page and then enter a username before typing your message
to any other active users. You will not be able to send any message if you do not set a username.
Chat testing can be tested by opening two links to my website via "node index.js": http://localhost:3000.
