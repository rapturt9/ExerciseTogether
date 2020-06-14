## Inspiration

We know that physical activity and social interaction have immense benefits*. During lockdown, many people aren't able to go to the gym or see any of their friends in person. I wanted to create an app to help people get their endorphins up and see their gym buddies across the world.


*https://www.cdc.gov/physicalactivity/basics/pa-health/index.htm, https://www.mercycare.org/bhs/services-programs/eap/resources/health-benefits-of-social-interaction/
 
## What it does

Exercise Together is a web app that allows 3 people to share video while watching the same Youtube exercise class and log their exercise activity. 

It works like this:
1. A user visits the website and either creates and account or logs in. Amazon Cognito is used for authentication.
2. Once authenticated, the user is directed to a dashboard depicting the amount of time spent exercising with Exercise Together.
3. The user clicks join room and enters a room name. Up to 3 of their friends enter the same name to join the same room.
4. The users enter a video chat room and can search for a Youtube exercise video together by utilizing the search bar. Once everything is ready, they click start exercise to begin!
5. When the video ends, the user returns to the dashboard and their time spent exercising is logged.

Exercise Together is helpful when you want to exercise with your friends and simulates an exercise class you could do at the gym like yoga or pilates. This way people can work out with their friends that are all over the world!

## How I built it

I used react and redux to build the front end of the project. For the backend, I used Serverless functionality like Cognito, AWS Lambda, S3, DynamoDB, and App Sync. Cognito verifies the user so that I can log exercise data for every user separately. All data is stored in DynamoDB. When people enter a room, Agora.io livestreams everyone's video to each other, so they can see each other's faces while React is used to display everyone's video. Every change you make to the search bar or clicking a Youtube video is logged to DynamoDB and is logged to all the other clients in the same room through AppSync. As a result, everyone in the room can see the same view at the same time. When you finish the workout, the data is sent to DynamoDB with the email you logged in as the key for the data. On the dashboard, a get request is made back to DynamoDB, so that you can see your exercise data for the whole week.

## Challenges I ran into

I used a wide variety of services in order to develop the application that I wasn't experienced with previously like Agora.io, AWS Amplify, and AWS AppSync. Learning them was difficult and I went through a lot of troubleshooting with those services in the code. Moreover, syncing all these services together into one application was a large challenge, and I kept trying different pieces of code one at a time to try to get them to work together.

## Accomplishments that I'm proud of

I was able finally learn how to use web sockets (AWS AppSync uses web sockets), which I'm really excited to use for my future projects! Web sockets are especially crucial for online games, which I want to make.

## What I learned

I learned how to use a multitude of services and link them together. For example, I learned web sockets, Agora.io, AWS Amplify, and AWS Appsync. All these services would be immensely useful for my fire projects, so I believed that I really benefited from creating this project.

## What's next for Exercise Together

Some extensions I'd like to make include:
- Adding Fitbit and Apple Health functionality so that users who use them can all see data logged onto the website.
- Making a sidebar like to that people could use to see who is currently online out of their friends list and join a room with them. In order to implement that, I would have to use AWS Neptune, which uses the same technology that Facebook uses for Facebook Friends. 
- Creating a phone app using React Native. I feel that more people would like to use a phone app rather than the website.

There are still _many bugs_, especially with the video streaming since I'm using a third party API and a free account for it. For example:
- The video streaming only works chrome.
-  Entering the video room with more than one person is a buggy process. The way I get it to work is by duplicating the tab for each user entering and closing the previous tab.
- The Cognito verification link redirects to localhost, but will confirm the account.
