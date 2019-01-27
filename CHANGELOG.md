# Changelog

## v4.0.2

- Altered the css for tracker sizing to a settings option to curtail potentiona issues with Windows Chrome
- Instrument sprites will not be a static color with a setting to make them gifs if desired
- Adjusted some spacing of the settings options as they needed a bit of breathing room
- Currently hidding the `<ouput>` tag for background color as it seems to have no purpose
- Reduced the opacity *slighty* on inactive items as ive been developing with dim screen brightness and see that they were far too bright **(open to changing it back)**
- Timer feature documentation was removed from Marketing page as that feature was deprecated in a previous verion
- Some markdown formatting adjustments
- Created an environment script to run in a no settings cache mode
- Adjusted meta-data for Facebook :eyeroll:, but Nuxt seems to ignore it. I tried.
- Removed Translate component as it never worked as intended
- Removed SettingsList component from SettingsList component...
- Removed Herobrine

## v4.0.1

- Added Google Analytics
- Fixed a bug where Screen component marker iamges were not showing up
- Added Masthead component to marketing page
- Fixed a bug where Goat Mode click events werent registering
- Added meta share image + other meta tags

## v4.0.0

> Starting off this new version with a fresh changelog as the entire code base has changed.

- Codebase is now Vue and Nuxt based.
- Settings are stored in browser `localStorage`
- Broadcast Mode was added so multiple clients can interact with the same window and that data will flow to all connected clients
- Twitch bot is now more secure and requires a light-touch Twitch authorization. You authorize access to **no** private information and the only use of this is to gain access to your Twitch username
- Some small UI tweaks but nothing major
- Marketing page, Tracker, Server all exist under the same codebase now
