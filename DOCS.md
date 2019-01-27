# Windfish.io

## Settings

The tracker comes with a range of features, all of which can be activated via settinga drawer which is shown when you click the `Toggle settings menu` button at the top right of the screen.

Your settings will be cleared on page refresh unless you enable the `Keep settings` option. Any option you have selected while this option is enabled will make your settings persistent after page refresh.

> Persistent settings are kept in your browser `localStorage`. Switching browsers, clearing your browser cache and things of the sort will end up removing your settings so beware.

## Tracking

All trackers are activated with click events that will cycle the different sprites available to that container. The overworld has a replacement context menu that enables you to place/remove markers on each overworld screen.

* The timer works by clicking to start and clicking again to stop. Stoping the stop activates a `save` button that saves your current time for later in your browser.

* The overworld can have markers placed on any location. Use the context click to select a marker. Using primary click with activate/deactivate the `cleared` state that will cover other markers but does not replace previously placed markers. Only the `reset` button in the context menu will remove all markers and states. Clicking the same marker twice will remove it from the screen.

* The item tracker activates by a simple primary click.

## Broadcast Mode

In broadcast mode, you connect to the server via a unique session id. Once joined, you can share this seed onother clients and they can join the same session. When clients are connected under the same seed any changes to the item tracker will trigger on all clients.

> Other users can paste the id in to their client and connect and they will join that session. Any user can refresh their window and rejoin without _initially_ affecting other users.
> Be warned that currently if a session joins that has less tracked than others and they begin tracking the updated tracked items will affect everyone.

## Twitch Bot Tracking

**Only available in Broadcast Mode** After authenticating via the Twitch OAUTH. a button will appear below the broadcast mode section in the settings. To activate the use `!tracker activate`. You can then use `!tracker add [username]` to add that chat user to the whitelist to be able to run commands. A quick rundown of the commands are:

* !tracker, !tracker commands - Essentially pings the bot to see if it is available and returns the list of commands for general users.
* !tracker activate - Activates the tracker so commands can be performed
* !tracker deactivate - Stops the tracker from taking commands
* !tracker add [username] - Adds a user to the whitelist. Broadcaster and Mods are automatically whitelisted
* !tracker remove [username] - Removes a user from the whitelist.
* !tracker disable whitelist - Disables the whitelist so anyone can use commands
* !tracker enable whitelist - Enables the whitelist so anyone can use commands
* !tracker [item name]

> Windfish does _not_ ask for any permissions for this app. It does not need any data from your account other than your public information available via OpenID. The only information provided is your display name which the app uses to connect the bot to.
