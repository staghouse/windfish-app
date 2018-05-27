# Changelog

## v4.0.1

*   Added Google Analytics
*   Fixed a bug where Screen component marker iamges were not showing up
*   Added Masthead component to marketing page
*   Fixed a bug where Goat Mode click events werent registering
*   Added meta share image + other meta tags

## v4.0.0

> Starting off this new version with a fresh changelog as the entire code base has changed.

*   Codebase is now Vue and Nuxt based.
*   Settings are stored in browser `localStorage`
*   Broadcast Mode was added so multiple clients can interact with the same window and that data will flow to all connected clients
*   Twitch bot is now more secure and requires a light-touch Twitch authorization. You authorize access to **no** private information and the only use of this is to gain access to your Twitch username
*   Some small UI tweaks but nothing major
*   Marketing page, Tracker, Server all exist under the same codebase now
