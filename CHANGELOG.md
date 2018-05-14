# Changelog

## v3.1.4 ( 5/1/18 )

*   Fixed the map marker for bombs. It wasn't loading the asset.
*   Fixed a bug where trying to connect to Twitch would reload the page, effectively nullifying the connection.

## v3.1.3 ( 3/31/18 )

*   Added additional documentation to prepare for open-sourcing.

## v3.1.2 ( 3/15/18 )

*   Added "Obstacles" markers to the context menu.

## v3.1.1 ( 2/17/18 )

*   Fixed a bug with the Timer where the time was inaccurate.

## v3.1.0 ( 1/6/18 )

*   Timer will now save previous time if you choose so.

*   Added support for cookies and localStorage for future things.

*   Refactored the settings menu.

*   Refactored the update function for items.

*   Optimized sprites.

*   Added the issues tracker to the main index site.

*   Added cache busting back in to both build scripts.

## v3.0.3 ( 1/4/18 )

*   Context menu will track if an entrance marker exists or if it does not.

*   Dungeons will disable their colors when you activate the instruments.

*   Dungeon 8 was not tracking that you needed power braclet.

## v3.0.2 ( 1/3/18 )

*   `extended` and `super-extended` item trackers were split out as checkboxes and no longer must be hard options.

*   Boomerang is now at the end of the trade sequence since it is not a required item.

*   Magic Powder is back since it is a required item.

## v3.0.1 ( 1/2/18 )

*   Dungeons and Entrances were linking unintentionally when their ids were parsed to check against named markers.

*   Added a setting to disabled dungeon requirement tracking (no color indication but the tracking still happens).

## v3.0 ( 1/1/18 )

*   Dungeon markers now know if you have enough items to get any chests, get at least 1 chest or get all chests + instrument.

## v2.4 ( 1/1/18 )

*   Dungeon markers will know if you have enough items to get at least 1 chest in that dungeon. TODO: Add in boss condition and all chests condition.

*   Fixed a bug where all markers would act linked after you added a linked marker to a location.

*   Refactored the update overworld location markers function so they no longer rely on Integers.

*   Trendy game map marker was replaced with Yoshi.

*   Seashell and PoH overlays are now separated.

*   Shield sprites were redrawn.

## v2.3.1 ( 12/31/17 )

*   Dungeon chest tracking is disabled by default.

## v2.3 ( 12/31/17 )

*   You can now track dungeon chests for the maximum potentional of items. The count reduces on click.

*   Fixed a big where Goat mode tracker background was not changing when change tracker background color.

*   Added mushroom in to fill the void added with dungeon chests.

## v2.2.2 ( 12/30/17 )

*   Fixed a bug where the tracker could connect to Twitch.tv without using a channel name. I can onlu assume the tracker would just listen for responses on the main auto-join IRC channel.

*   Updated the styling for warn function and added help dialog.

*   Hid Barry mode.

## v2.2.1 ( 12/29/17 )

### Changes

*   More overworld markers.

*   RIP event markers.

*   Goat Mode tracker setting. For the homies.

*   Some sprites were recolorized to be more accurate.

*   Shield now starts in an active state.

*   Dungeon number markers are always active.

*   Reverted CSS Grid for layout because I am a newb at CSS Grid.

## v2.2 ( 12/28/17 )

### Changes

*   You can now remove a overworld marker by trying to click it a second time.

*   The settings menu has shifted order a bit. Reorganization was overdue.

*   Overworld tracker now uses CSS Grid for layout.

## v2.1 ( 12/27/17 )

### Changes

*   `main.js` file was cleaned up and configurations and connecitons were put in to their classes

*   Classes are stored in the `window` now in order for Classes to have their own API.

*   There is now a message that pops up on page load that tells you a friendly version of changes since the last release.

*   Ommiting a `!` in the custom twitch command field would break the command, there is now a check to make sure it is there or it will add one.

*   Fixed a bug where resetting an Overworld marker that was linked did not actually remove the link.

## v2.0 ( 12/26/17 )

### Changes

*   Added ability to trim down the Overworld marker list to a compact version.

*   Added ability to change overall background color.

*   Many other internal optimizations that have nothing to do with the UI.

### Notes

*   Im declaring this v2.0 because of all the refactoring over the last few versions. The overall code is significantly different than the first version.

## v1.7.1 ( 12/25/17 )

### Changes

*   New sprite markers for Overworld

*   Interior logic that now allows sprite markers to be added more easily. Before, all markers were a numeric state which made naming and iteration a pain, but was necessary in the first version fews because of click cycling.

*   Overworld markers now have prevention from double marking the same marker.

## v1.7 ( 12/24/17 )

### Changes

*   Item tracker layouts have changed just a bit: `Super-Compact` -> `Compact`, `Compact` -> `Extended`, `Extended` -> `Super-Extended`.

*   Shroom/Powder was removed as an experiment and Trade Sequence was added as primary.

*   Level 2 Sword now has a dedicated sprite that looks very similar to the actual in-game sprite when you first see it. In the item menu the sword looks the same.

*   Color dungeon item tracker was removed in favor of `Piece of Heart`. JRJathome remarked about the tunic item tracker signifies the same thing.

*   Song sprites were changed to be the less detailed versions.

*   Added more visual markers including Richard, Tracy, Witch and Trendy game.

*   Twitch integration had a bit of a spam problem that luckily was not abused yet. Anti-spam measures have been improved upon.

*   Windfishbot is no longer as verbose.

*   Spam delay for twitch commands was upped to `5 seconds`.

*   Refactored the tracker items data to now be in its own file. This allows greater control of the data instead of living in the markup.

*   Some layout adjustments.

## v1.6.1 ( 12/22/17 )

### Changes

*   Primary click on the overworld activates (on/off) the `cleared` state of a position. Primarily click was removed in the last update because cycling markers stopped being logical.

## v1.6 ( 12/21/17 )

### Features

*   You can now assign multiple markers to each overworld screen.

### Changes

*   Added some anti-griefing measures with the Twitch integration.

*   Map inner gutter was reduced by half.

*   Trade Swap option is now hidden in `Super-Compact` item view as that option does not affect that layout.

*   Maximum size of the trackers has been increased to `570px`.

*   `Rooster Grave` markers were added back in as it is randomized.

*   `Color Dungeon` item marker sprite was changed to Evil Orb to avoid confusion with Big Fairy locations. The `C` identifier was removed.

## v1.5.1 ( 12/9/17 )

### Changes

*   It was pointed out that the `Cleared` map marker was removed in the last update. It has now being added in as a dedicated marker type that can be activated with both primary and context clicks.

*   `Y`, `Z`, `Rooster Grave` and `Ocarina Shrine` markers were removed. This was for aesthetic reasons but if we find we need more, they can easily be added back in. The shrine and rooster are generally vanilla warps anyway.

## v1.5.0 ( 12/5/17 )

### Changes

*   Context Menu had a bug that was broken in the last update.

*   Context Menu now has more markers.

*   Alphanumeric markers are now linked - If you added a similar marker in another spot and hover over that spot, all spots with the same marker will be highlighted.

*   New default layout for Item Tracker is `Super-Compact`.

## v1.4.2 ( 12/3/17 )

### Changes/Fixes:

*   Mostly dev-level changes. jQuery was swapped for Zepto. Pages branch was brought in to a `docs` directory.

*   Small image bugs were fixed for non blink/webkit browsers.

## v1.4.1 ( 11/16/17 )

### Changes/Fixes:

*   The overworld context menu has be visualized to allow you to be more react with imagery.

*   With this update, each screen map only have 1 marker - before it could have 2 but it was in unintentional bug

*   More markers were added.

*   The instruments were removed from the background of dungeon numbers to increase legibility.

*   The "cleared" marker was removed but is still accessible with a single primary click on the map square.

*   Default map opacity was increased a smidge.

## v1.4 ( 11/14/17 ) The Twitch Update

### Changes/Fixes/Features:

*   You can now use Twitch.tv integration directly from the tracker. No need to edit any more files, just input your channel name and click the connect button. Everything still works the same way and if you want greater customization you can still download the tracker and add custom messages.

*   Because the Tracker no longer relies on a WebServer, people need to do far less. However, the Tracker uses cookies now to store the whitelist. So cleaning out your cookies will remove any whitelist users you had set previously.

*   No need for config files. Just enter your channel name and custom command if you want one in the settings menu.

## v1.3.2 ( 11/13/17 )

### Fixes:

*   The context menu was showing off-screen when the mouse position was going out of the "goldilocks" zone of where a context menu _should_ appear. The menu will now appear inversely positioned in the same way that a native OS context menu would.

*   A transition was being applied unnecesarrily to all tracker elements. This was enacted to Light Mode but caused other issues in hindsight and needs to be revisited.

*   Tracker markers were missing a background color which caused some muddling when looking at the map.

*   The tunic item that starts with an activated state was actually broken in that it would not go to its next state when the sprite list was separated with spaces. Spaces are now ignored in these data lists.

## v1.3.1 ( 11/11/17 )

### Fixes:

*   windfish.io demo tracker no longer bugs you about Twitch connection when starting the page.

## v1.3 ( 11/07/17 )

### Features:

*   **Simple Timer!** You can add a simple timer to above the trackers as a setting. Click the time once to start, subsequent clicks pause/start the timer as appropriate. Regardless of your settings, the timer will always load from 0 when you refresh the page. If there is enough interest in splits that may be a viable option for the future.

## v1.2 ( 11/06/17 )

### Features:

*   **Persistent Settings!** Setting changes are now kept track of via URL parameters (Technically, they always where, but its more obvious) There is a toggle that must be checked on first load in order to retain your settings on refresh/reload but if you toggle it after you have already changed settings it will know which ones you have changed already. This feature is best used by bookmarking the page after changing your settings (and making sure you toggle the 'keep settings' option).

*   **Hidden Settings Drawer!** Settings are now in a drawer that can still be toggled in and out of view. This cleans up the view and gets rids of the clutter. It was necessary to do because the tracker now has over a dozen options to toggle through.

*   **LIGHT MODE!** Experimental. For those who prefer staring in to the sun instead of allowing the darkness to wash over your soul - this mode is for you. It needs some work so I'll be looking for feedback.

*   **Compass!** Now, you can see where the chests and Nightmares are
    hidden! This Compass has a new feature-- a tone will tell you if a key is hidden
    in a room when you enter! (Not a real feature).

### Fixes:

*   There was a bug(s) in Firefox, but supressed in Webkit (still there), where handler to close the context menu for the map wasnt binding at the appropriate time and on the appropriate element.

*   Safari was not rendering borders correctly. The border image needed to be modified.

*   Safari was not rendering the map image with full cover.

*   Safari and Firefox were not rendering the opacity slider correctly.

*   Map dungeon marker numbers were way too big on small window widths.

*   Entrance overlay was showing fisherman as an entrance and missing a phone booth.

*   Improved map had fisherman as a house sprite, even though it has no entrance.

## v1.1 ( 11/05/17 )

### Features:

*   Added map marker for chest.

*   Added map coordinates option for map gutters.

*   Added map overlays for entrances, heart pieces and seashells, and empty screens.

*   Added map opacity slider option. Currently is not configurable via URL.

### Fixes:

*   Checkbox options via URL params were not actually working outside the scope of which they existed before. Basically, there was only 1 checkbox so it worked in isolation but adding more broke the logic. This has been fixed but in a hacky way.

### Changes:

*   Converted all checkbox-like inputs to actual checkboxes which organized them and gave them all the same handler function.

### Todo:

*   Allow map opacity via URL params

## v.1.0-- ( 11/04/17 )

### Changes:

*   Ability to click on tracker items to activate different sprites. Sprites can be cycled through based on progressive order with primary UI engagement.

*   Certain sprites can be organized by count if the sprite is the same but there are a certain number of them to collect.

*   Items can be expanded to include more sprites per users needed.

*   The map has 3 different image options. Vanilla, improved and detailed.

*   Context click on the map tracker for additional features.

*   Options for adjusting layout, each tracker, and other options as they pertain to their category.

*   Use of query params: You can append a query param that matches the option name and value to initialize that option on load. I.E. `/path/to/tracker/tracker.html?items=extended&layout=items&border=false`.
