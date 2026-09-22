


### Upgrades:


Password hashing
Do this before JWT because JWT login should verify an encoded password from the beginning.

JWT authentication
Return a token after login, send it with requests, and derive the current user from the token instead of request parameters or sessionStorage usernames.

DTO validation
Add annotations and @Valid incrementally, starting with registration, login, entries, and community creation/editing.

Cleanup/tests
Fix the existing lint issues and add authorization tests when the main features work.

bessere https responses

ranking

join code für private communities

community search function


Maybe chat

indexes
