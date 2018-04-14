Template created using [create-react-app](https://github.com/facebook/create-react-app).

## Running

```
$ npm i
$ npm run start
```

1. *How long did you spend working on the problem? How much time did you spend thinking about the
design before writing your code?* Spend 2.5 hours on this. I mostly focused on validation. Before starting, I quickly
investigated credit card validation libraries. I ended up deciding to use card-validator
library from Braintree. In this solution, I'm not using much functionality from the library,
but I decided that extensibility having a library would be important.
2. *What are the UI/UX usability features you implemented, or thought about implementing? How do they help validate the user input?* Three kinds of error validation I implemented. For the credit card - I format the 
text with spaces, and truncate. For the CVV2, I constrain the length based on the credit card detected.
For the expiry, I display an error when the expiry is not after the current month/year. I also display warning
to enter a month between 0 and 12. I also implemented, "confirmation validation". When the credit card type is detected, it will display the detected card type. This helps the user know they are on the right track.

3. *What would an form submission/API payload of this look like? How would you deal with validation
errors that may come from that API response?* I didn't build this within a form, because I wanted to focus on validation side. But the payload could be the body of a POST request to some endpoint and content type application/x-www-form-urlencoded.
Errors from the API response would have to be translated, merged into the frontend generated errors. I would build a Util for this, outside of this component.

4. *How would you test this component?* A few kinds of tests could be done - unit tests to test each form element and also test the warning and error messages are being displayed, and end-to-end tests (once it was hooked up to an API or a stubbed API). We could also consider writing snapshot tests to prevent regressions (snapshot tests could be in place of some kinds of unit tests).

5. *What are some styling and layout considerations for these types of form inputs?* Scalability on varying screen size. General simple and clean. Errors should highlight the input field
with the error (I didn't do this because no time). Validation should happen in real-time to give immediate feedback.
