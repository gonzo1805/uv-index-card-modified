# UV Index card

## Disclaimer

This Card comes entirely from the original author of the code [Original Repo](https://github.com/t1gr0u/uv-index-card). I just did changes on the way the information is shown and added spanish support to the component.
If you discovered this card from this repo please know that almost everything from this work comes from him. Also, for simplicity of installation, I'm leaving the original readme here too.

## My changes

Added spanish support.

![newIndexUV](https://github.com/user-attachments/assets/fde492b1-860e-43d4-8fb3-94958f8b9262)

## Original Information

A custom Lovelace card that displays the UV index and risk level in [Home Assistant](https://home-assistant.io/).

[![GitHub Release][releases-shield]][releases-link] [![GitHub Release Date][release-date-shield]][releases-link] [![GitHub Releases][latest-download-shield]][traffic-link] [![GitHub Releases][total-download-shield]][traffic-link]

[![HACS Badge][hacs-shield]][hacs-link] [![HomeAssistant][home-assistant-shield]][home-assistant-link] [![License][license-shield]][license-link]

![Project Maintenance][maintenance-shield] [![GitHub Activity][activity-shield]][activity-link] [![Open bugs][bugs-shield]][bugs-link] [![Open enhancements][enhancements-shield]][enhancement-link]

[![Community Forum][forum-shield]][forum-link]

## Installation

### [HACS](https://hacs.xyz/) (Home Assistant Community Store) This method will not work for this, please use manual.

1. Go to HACS page on your Home Assistant instance
1. Select `Frontend`
1. Press add icon and search for `uv-index`
1. Select UV Index Card repo and install
1. Force refresh the Home Assistant page (<kbd>Ctrl</kbd> + <kbd>F5</kbd>)
1. Add uv-index-card to your page

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=t1gr0u&repository=uv-index-card&category=plugin)

### Manual

1. Download the 'uv-index-card.js' from the latest [release](https://github.com/t1gr0u/uv-index-card/releases) (with right click, save link as)
1. Place the downloaded file on your Home Assistant machine in the `config/www` folder (when there is no `www` folder in the folder where your `configuration.yaml` file is, create it and place the file there)
1. In Home Assistant go to `Configuration->Lovelace Dashboards->Resources` (When there is no `resources` tag on the `Lovelace Dashboard` page, enable advanced mode in your account settings, and retry this step)
1. Add a new resource
   1. Url = `/local/uv-index-card.js`
   1. Resource type = `module`
1. Force refresh the Home Assistant page (<kbd>Ctrl</kbd> + <kbd>F5</kbd>)
1. Add uv-index-card to your page

## Using the card

- Add the card with the visual editor
- Or add the card manually with the following (minimal) configuration:

```yaml
type: custom:uv-index-card
entity: sensor.weather_station_uv
```

## Lovelace Examples

### Default

```yaml
type: custom:uv-index-card
entity: sensor.weather_station_uv
```

![Default](https://github.com/t1gr0u/uv-index-card/blob/master/docs/images/uv-index-card.png?raw=true)


## Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| type              | string  | **Required** | `custom:uv-index-card`                      |                     |
| name              | string  | **Optional** | Card name                                   | `UV Index`          |
| show_error        | boolean | **Optional** | Show what an error looks like for the card  | `false`             |
| show_warning      | boolean | **Optional** | Show what a warning looks like for the card | `false`             |
| entity            | string  | **Required** | Home Assistant entity ID.                   | `none`              |
| language          | string  | **Optional** | The 2 character that determines the language| `en`                |
| tap_action        | object  | **Optional** | Action to take on tap                       | `action: more-info` |
| hold_action       | object  | **Optional** | Action to take on hold                      | `none`              |
| double_tap_action | object  | **Optional** | Action to take on double tap                | `none`              |

## Action Options

| Name            | Type   | Requirement  | Description                                                                                                                            | Default     |
| --------------- | ------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| action          | string | **Required** | Action to perform (more-info, toggle, call-service, navigate url, none)                                                                | `more-info` |
| navigation_path | string | **Optional** | Path to navigate to (e.g. /lovelace/0/) when action defined as navigate                                                                | `none`      |
| url             | string | **Optional** | URL to open on click when action is url. The URL will open in a new tab                                                                | `none`      |
| service         | string | **Optional** | Service to call (e.g. media_player.media_play_pause) when action defined as call-service                                               | `none`      |
| service_data    | object | **Optional** | Service data to include (e.g. entity_id: media_player.bedroom) when action defined as call-service                                     | `none`      |
| haptic          | string | **Optional** | Haptic feedback _success, warning, failure, light, medium, heavy, selection_                                                           | `none`      |
| repeat          | number | **Optional** | How often to repeat the `hold_action` in milliseconds.                                                                                 | `none`      |


### Language

The following languages are supported:

| Language  | Yaml value | Supported | Translated by                                                                       |
| --------- | ---------- | --------- | ----------------------------------------------------------------------------------- |
| Czech     | `cs`       | v1.2.1    | [@MiisaTrAnCe](https://github.com/MiisaTrAnCe)                                      |
| Dutch     | `nl`       | v1.2.0    | [@WoBBeLNL](https://github.com/WoBBeLnl)                                            |
| English   | `en`       | v1.0.0    | [@t1gr0u](https://github.com/t1gr0u)                                                |
| French    | `fr`       | v1.0.0    | [@t1gr0u](https://github.com/t1gr0u)                                                |
| German    | `de`       | v1.0.0    | [@t1gr0u](https://github.com/t1gr0u)                                                |
| Hungarian | `hu`       | v1.2.1    | [@erelke](https://github.com/erelke)                                                |
| Italian   | `it`       | v1.2.0    | [@SiriosDev](https://github.com/SiriosDev)                                          |
| Portuguese| `pt`       | v1.2.0    | [@ViPeR5000](https://github.com/viper5000)                                          |
| Swedish   | `sv`       | v1.2.1    | [@el97](https://github.com/el97)                                                    |

#### How to add a language

If you wish to add a language please follow these steps:

* Go into the `src/localize/languages/` folder
* Duplicate the `en.json` and name it as the language that you would like to add by following the [2 characters ISO language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
* Then modify the `localize.ts` file, located in `src/localize/` to include your language file.
* Update the `Readme.md`, found in `src/` to include your language and your Github username in the language table.

## Thanks to

- [@iantrich](https://www.github.com/iantrich) for the [boiler-plate card](https://github.com/custom-cards/boilerplate-card), which got me started


## Support

Clone and create a PR to help make the card even better.

[releases-shield]: https://img.shields.io/github/release/t1gr0u/uv-index-card.svg?style=flat-square
[releases-link]: https://github.com/t1gr0u/uv-index-card/releases/latest
[release-date-shield]: https://img.shields.io/github/release-date/t1gr0u/uv-index-card?style=flat-square
[latest-download-shield]: https://img.shields.io/github/downloads/t1gr0u/uv-index-card/latest/total?style=flat-square&label=downloads%20latest%20release
[total-download-shield]: https://img.shields.io/github/downloads/t1gr0u/uv-index-card/total?style=flat-square&label=total%20views
[traffic-link]: https://github.com/t1gr0u/uv-index-card/graphs/traffic
[hacs-shield]: https://img.shields.io/badge/HACS-Default-orange.svg?style=flat-square
[hacs-link]: https://github.com/custom-components/hacs
[home-assistant-shield]: https://img.shields.io/badge/Home%20Assistant-visual%20editor/yaml-green?style=flat-square
[home-assistant-link]: https://www.home-assistant.io/
[license-shield]: https://img.shields.io/github/license/custom-cards/boilerplate-card.svg?style=flat-square
[license-link]: LICENSE.md
[activity-shield]: https://img.shields.io/github/commit-activity/y/t1gr0u/uv-index-card.svg?style=flat-square
[activity-link]: https://github.com/t1gr0u/uv-index-card/commits/master
[bugs-shield]: https://img.shields.io/github/issues/t1gr0u/uv-index-card/bug?color=red&style=flat-square&label=bugs
[bugs-link]: https://github.com/t1gr0u/uv-index-card/labels/bug
[enhancements-shield]: https://img.shields.io/github/issues/t1gr0u/uv-index-card/enhancement?color=blue&style=flat-square&label=enhancements
[enhancement-link]: https://github.com/t1gr0u/uv-index-card/labels/enhancement
[maintenance-shield]: https://img.shields.io/maintenance/yes/2023.svg?style=flat-square
[forum-shield]: https://img.shields.io/badge/community-forum-brightgreen.svg?style=flat-square
[forum-link]: https://community.home-assistant.io/t/uv-index-card/543446
