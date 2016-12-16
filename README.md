#Interviewer - Much Better Than The Rest
----------------------------------------

Thank you for taking the time to do this technical test. There are two parts to it:

- [A coding test](#coding-test) - to show off your coding skills and how you do things
- [and a few questions](#questions) - just to find out a bit more about you

Please submit your results as a **zip** file containing **both** the **coding test** in a folder and the **markdown file** with your answers to the questions. Share a private link to this zip file in your Dropbox / Google Drive / OneDrive / wherever.

## Coding Test

### The API

There is a public API available at [https://interviewer-api.herokuapp.com/](https://interviewer-api.herokuapp.com/) that you can use to manage your finances in a very simple way.

The API has 4 endpoints:

- `/login` gives you a `token` which you need to use in subsequent calls to the API in the `Authorization` header. Every call returns a new token with some initial transactions and balance.
- `/balance` gives you your current balance along with a currency code.
- `/transactions` gives you a list of items with details such as `date`, `description`, `amount`, `currency`.
- `/spend` adds a transaction to your list and updates your balance. Send in `date`, `description`, `amount`, `currency` in a `POST` request.

There is a *Postman* collection at [Interviewer.postman_collection.json](https://github.com/zfoltin/interviewer/blob/master/Interviewer.postman_collection.json) that you can use to test the API. Use these environment variables:

- `protocol`: `https`
- `host`: `interviewer-api.herokuapp.com`
- `token`: *token returned by /login*

### The task

The task is to create an application that

- logs the user in at start (silently in the background)
- displays the user's current balance
- allows the user to see the list of transactions
- allows the user to add a transaction and see the new balance

### Platform

If you are a

- Front-end developer - use Angular 2
- Native mobile developer - use the native platform
- Hybrid mobile developer - use Ionic 2

### Requirements

- Implement the 4 subtasks from above using the relevant platform
- Feel free to spend as much or as little time on the exercise as you like
- Feel free to use whatever frameworks / libraries / packages you like
- Your code should be in a state that you would feel comfortable releasing to production
- If UI is relevant try to make it look decent but don't hire a designer
- Writing unit/UI/acceptance tests are optional but highly encouraged

# Questions

Please answer the following questions in a markdown file called `answers tO questions.md`.

1. How long did you spend on the coding test? What would you add to your solution if you spent more time on it? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.
2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
3. What is your favourite framework / library / package that you love but couldn't use in the task? What do you like about it so much?
4. What great new thing you learnt about in the past year and what are you looking forward to learn more about over the next year?
5. How would you track down a performance issue in production? Have you ever had to do this?
6. How would you improve the APIs that you just used?
7. Please describe yourself in JSON format.
8. What is the meaning of life?

####Thanks for your time, hope to hear from you soon!
