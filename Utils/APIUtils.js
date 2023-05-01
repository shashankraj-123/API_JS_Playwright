const { test, expect, request } = require("@playwright/test");
/*
⁡⁢⁣⁣𝗖𝗿𝗲𝗮𝘁𝗲𝗱 𝗕𝘆:⁡⁡ ⁡⁣⁢⁣Shashank Raj⁡
⁡⁢⁣⁣𝗖𝗿𝗲𝗮𝘁𝗲𝗱 𝗗𝗮𝘁𝗲:⁡⁡ 28 Apr 2023
⁡⁢⁣⁣𝗣𝘂𝗿𝗽𝗼𝘀𝗲:⁡ Util Class to send the requests (POST, PUT, GET etc.)

*/
class APIUtils {
  constructor(apiContext) {
    this.apiContext = apiContext;
    this.token = null;
  }

  /*
This is a JavaScript function that takes three arguments: URL (string), username (string), and password (string). The purpose of the function is to obtain an authentication token by making a POST request to the specified URL.

The function uses async/await syntax and returns a Promise. It first sets the headers for the POST request, with the Content-Type being set to application/json. The payload of the POST request contains the username and password passed as arguments.

After sending the POST request, it checks the response status code to make sure it is 200, and if so, it extracts the token from the JSON response object and sets the token value in the context of the API object. Finally, it returns the entire response object.

If the response status code is not 200, the function returns an error message with the received status code. If an exception occurs during the execution of the function, it returns an error message with the exception details.

During its execution, the function logs the response object to the console for troubleshooting purposes.

  */

  async getToken(URL, username, password) {
    try {
      const response = await this.apiContext.post(URL, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username: username,
          password: password,
        },
      });
      console.log(" Response:", response);
      await expect(response.status()).toBe(200);
      const responseJson = await response.json();

      if ((await response.status()) === 200) {
        this.token = await responseJson.token;
        return await response;
      } else {
        return (
          "error while creating token. The status code received is ",
          await response.status()
        );
      }
    } catch (error) {
      console.log(error);
      return "Exception while creating token :  " + error;
    }
  }

  /*
  This is a JavaScript function that takes two parameters: URL (string) and bookingId (number). The purpose of the function is to fetch booking details by making a GET request to the specified URL.

The function uses async/await syntax and returns a Promise. It first logs the bookingId and URL to the console for debugging purposes, then sends a GET request to the specified URL using the API context object. The payload of the GET request contains headers such as Authorization, Content-Type, and Accept.

After sending the GET request, it checks the response status code to make sure it is 200, using the expect statement from a test suite. If the status code is 200, it returns the entire response object.

If an exception occurs during the execution of the function, it logs the exception to the console, throws a new Error object with the error message, and fails the test case.

During its execution, the function logs some information to the console for troubleshooting purposes.

  */

  async getBookingDetails(URL, bookingId) {
    try {
      console.info("Booking id to be fetched: ", bookingId);
      console.info("GET API: ", URL + bookingId);
      const response = await this.apiContext.get(URL + bookingId, {
        headers: {
          Authorization: `Basic ${this.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      expect(response.status()).toBe(200); // removed unnecessary async/await
      return response;
    } catch (error) {
      console.error("Exception while fetching booking details:", error);
      throw error; // no need to wrap the error as a new Error object
    }
  }

  /*
  This is a JavaScript function that takes eight arguments: URL (string), firstname (string), lastname (string), totalprice (number), depositpaid (boolean), checkin (string), checkout (string), and additionalneeds (string).

The purpose of the function is to create a booking by making a POST request to the specified URL. The function uses async/await syntax and returns a Promise.

It first logs the URL to the console for debugging purposes, then sends a POST request to the specified URL using the API context object. The payload of the POST request contains various fields such as firstname, lastname, totalprice, depositpaid, bookingdates, and additionalneeds.

After sending the POST request, it logs the response object and its formatted JSON representation to the console for troubleshooting purposes. It also logs the status code and booking ID received in the response. Finally, it returns the entire response object.

If an exception occurs during the execution of the function, it returns an error message with the exception details.
  */

  async createBooking(
    URL,
    firstname,
    lastname,
    totalprice,
    depositpaid,
    checkin,
    checkout,
    additionalneeds
  ) {
    console.log(URL);
    const response = await this.apiContext.post(URL, {
      headers: {
        Authorization: "Basic " + this.token,

        "Content-Type": "application/json",
      },
      data: {
        firstname: firstname,
        lastname: lastname,
        totalprice: totalprice,
        depositpaid: depositpaid,
        bookingdates: {
          checkin: checkin,
          checkout: checkout,
        },
        additionalneeds: additionalneeds,
      },
    });
    console.log("The response from the API", response);
    const responseJson = await response.json();
    console.log("Formatted Response", responseJson);
    console.log("The status received: " + response.status());
    console.log(await responseJson.bookingid);
    return await response;
  }
}

module.exports = { APIUtils };
