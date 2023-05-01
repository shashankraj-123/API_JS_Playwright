const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../../Utils/APIUtils");

/*
⁡⁢⁣⁢Reading Test Data⁡
Reading data from the data json files present under data folder
*/
const createBookingTestData = JSON.parse(
  JSON.stringify(require("../../data/createBookingData.json"))
);
const getBookingData = JSON.parse(
  JSON.stringify(require("../../data/getBooking.json"))
);

const createTokenData = JSON.parse(
  JSON.stringify(require("../../data/createTokenData.json"))
);

const createTokenDataNegative = JSON.parse(
  JSON.stringify(require("../../data/negativeTokenGenData.json"))
);

let token, bookingId, bookingDetails;
/*
⁡⁢⁣⁢​‌‍‌𝗧𝗲𝘀𝘁 𝟭​⁡
This test will verify that the token does not get created when the username or password is not correct
This code is a Playwright test that generates a token by calling an API endpoint with incorrect credentials and validates the error message returned in the response. Here's what it does:

The test function is defined using the test function from the Playwright library.
An API context is created using request.newContext().
An instance of the APIUtils class is created, passing in the apiContext.
A request is sent to generate a token using the getToken() method from the apiUtils object, passing in a URL, invalid username, and a valid password.
The response body is parsed into JSON format using the .json() method.
The response JSON is logged to the console.
The reason field from the response JSON is logged to the console.
The test validates that the reason field from the response JSON matches the expected error message "Bad credentials" using the expect function from the Jest assertion library.
The purpose of this code is to test the error handling capability of the API when bad credentials are provided during token generation. By validating the error message returned in the response, the test ensures that the API is functioning as expected.
*/
test("Generate Token ", async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext);
  var response = await apiUtils.getToken(
    createTokenDataNegative.URL,
    createTokenDataNegative.nullUserName,
    createTokenDataNegative.password
  );
  const responseJson = await response.json();
  console.log("Response JSON:", responseJson)
  console.log(responseJson.reason);
  await expect(responseJson.reason).toBe("Bad credentials")
});

