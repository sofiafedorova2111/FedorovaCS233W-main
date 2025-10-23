 # Project CS233W

## Name: Sofia Fedorova

### Date: 10/20/2025
 
  *Description: Tests to check the middleware.* 
  TESTS
 - Logger: Send a request and check the request.log file for any changes.
 - Error Handler: Put a test error to trigger the error response and see if it is reacting.
 - Sanitize: Sending HTML or script tags in the URL or body.
MIDDLEWARE
 - Express.json() - reads JSON from te incoming requests.
 - Logger: logs all the requests.
 - SanitizePar: cleans up parameters of routes.
 - Route Handler - sends responses.
 - Error Handler: responds to errors.
