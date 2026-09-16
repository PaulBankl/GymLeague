
### CommunityExercises

anpassen im edit mode



### Communities
auf der all communities page eine extra detail page machen für non member
rechte
kicken
promoten



### Upgrades:
Non-member community detail page
Create a separate route such as /community/public/:id, link the cards on AllCommunityPage, and reuse the existing community-details endpoint. Show basic details and exercises, but omit edit, leave, and member-management controls.

Editable community exercises
Extend CommunityChangeDTO with exerciseIds, reuse the existing exercise-checkbox component, and—in one transaction—delete the community’s existing exercise relationships and recreate them from the submitted IDs. This is simpler and faster than calculating individual additions/removals.

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

join requests

community search function


Maybe chat

indexes
