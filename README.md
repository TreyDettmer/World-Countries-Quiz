# World-Countries-Quiz
## Try it out at https://treydettmer.github.io/World-Countries-Quiz/
### Summary
I developed this quiz after a friend of mine complained about there not being any good "countries of the world" quizzes where the user has to locate all of the countries on a world map. For the map, I used the map from https://www.jetpunk.com/quizzes/how-many-countries-can-you-name which already had the country regions constructed using Scalable Vector Graphics (SVG). This made it easy to detect which country the user selected while still allowing the scale of the map to change. Because certain countries on the map were too small (some didn't even have a visible area), the number of countries in the quiz was reduced to 169 from the original 196. The most difficult part of the development was getting the app to scroll to the correct country location after the user incorrectly guessed the country three times. This was difficult because I had to translate the coordinates of the country to be relative to the page rather than the map. This needed to be done so that I could set the scroll values of the page to the appropriate values.

![Screenshot](./public/images/world-countries-quiz-thumbnail.JPG)
