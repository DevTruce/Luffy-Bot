<a id="readme-top"></a>

<div align="center">

[![Contributors][contributors-icon]][contributors-link]
[![Forks][forks-icon]][forks-link]
[![Stargazers][stars-icon]][stars-link]
[![Issues][issues-icon]][issues-link]
[![MIT License][license-icon]][license-link]

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/DevTruce/Luffy-Bot">
    <img src="/src/imgs/readmeAvatar.png" alt="Logo" width="auto" height="80">
  </a>

<h3 align="center">Luffy Bot</h3>

  <p align="center">
    customizable discord translation bot & more! easy to setup and configure
    <br />
    <a href="https://github.com/DevTruce/Luffy-Bot" target="_blank"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://devtruce.github.io/Luffy-Bot/" target="_blank">View Demo</a>
    ·
    <a href="https://github.com/DevTruce/Luffy-Bot/issues" target="_blank">Report Bug</a>
    ·
    <a href="https://github.com/DevTruce/Luffy-Bot/issues" target="_blank">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#screenshots">Screenshots</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#setup-guide">Setup Guide</a>
      <ul>
        <li><a href="#config-file">Configuration File</a></li>
        <li><a href="#how-to-setup-automatic-translate-and-relay-announcements">Auto Translation & Relay Announcements</a></li>
        <li><a href="#how-to-setup-automatic-translate-and-relay-messages">Auto Translation & Relay Messages</a></li>
        <li><a href="#how-to-setup-reaction-translations">Reaction Translations</a></li>
        <li><a href="#reaction-translation-language-support">Reaction Translations Language Support</a></li>
        <li><a href="#how-to-setup-keyword-triggers">Keyword Triggers</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a>
    <ul>
        <li><a href="#how-to-contribute">How to Contribute</a></li>
        <li><a href="#what-can-i-contribute">What Can I Contribute</a></li>
         <li><a href="#get-started">Get Started</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Luffy Bot is a versatile and customizable Discord bot designed to enhance your server's communication experience. Whether you need seamless language translation, efficient message relay, or robust tools, Luffy Bot has you covered and is easy to setup and configure to your specific needs.

If you intend to use this project you will need your own google translation or libre
translation API key. The project supports use of both apis as well, it will default to using google translate until it reaches a monthly character limit of 500,000 (googles free tier limit) and then it will switch to using libre translate for the remainder of the month. Alternatively you can opt to just use one or the other.

### Features:

- **Synchronized Multilingual Chats**

  - Synchronize chat content across users, with each message displayed in the user's preferred language. This allows for seamless, multilingual conversations where every user sees messages in their own language, enhancing the inclusivity and accessibility of discussions.

- **Automatic Translation & Relay**

  - Effortlessly translate messages into multiple languages and relay them to designated channels, fostering global communication within your server.

- **Reaction Based Translation**

  - Enable users to trigger automatic translations by reacting with flag emojis, breaking down language barriers with a simple gesture.

- **Reaction Roles**

  - Admins can set up messages with associated roles. When users react to these messages, the bot assigns them the specified roles, streamlining role assignment and enhancing user interaction within the server.

- **Keyword Triggered Responses**

  - Enable the bot to listen for specific phrases or words within messages and respond accordingly, enhancing user engagement and interactivity within your server.

- **Rate Limit**

  - Implement intelligent rate limiting to ensure fair usage of translation services, maintaining service availability while preventing abuse.

- **Slash Commands**

  - Empower developers, administrators, and users alike with a range of utility and fun commands, enhancing server management and interaction.

- **Logging**

  - Gain insights into server activities with comprehensive logging functionality, capturing key events and interactions for administrative review.

Explore the documentation to unlock the full potential of Luffy Bot and elevate your Discord server to new heights of communication efficiency.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Screenshots

[![Auto Translate + Relay Messages Video][autoTranslateAndRelayMessages-video]](product-link)

[![Auto Translate + Relay Announcements Video][autoTranslateAndRelayAnnouncements-video]](product-link)

[![Reaction Translate Screen Shot][reactionTranslate-screenshot]](product-link)

[![Keyword Triggers Screen Shot][keywordTriggers-screenshot]](product-link)

[![Slash Commands Screen Shot 1][slashCommands1-screenshot]](product-link)

[![Slash Commands Screen Shot 2][slashCommands2-screenshot]](product-link)

[![Slash Commands Screen Shot 3][slashCommands3-screenshot]](product-link)

[![Console Logs Screen Shot 1][consoleLogs1-screenshot]](product-link)

[![Console Logs Screen Shot 2][consoleLogs2-screenshot]](product-link)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![JavaScript][JavaScript-icon]][JavaScript-link]
- [![DiscordJS][DiscordJS-icon]][DiscordJS-link]
- [![NodeJS][NodeJS-icon]][NodeJS-link]
- [![LibreTranslate][LibreTranslate-icon]][LibreTranslate-link]
- [![GoogleTranslate][GoogleTranslate-icon]][GoogleTranslate-link]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Download and install node.js

  ```sh
  // run this line inside the terminal
  choco install nodejs-lts

  // or visit: https://nodejs.org/en/download
  ```

- Verify node version [v20.12.2+]
  ```sh
  node -v
  ```
- Verify npm version [v10.7.0+]
  ```sh
  npm -v
  ```
- Install latest npm [optional]
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/DevTruce/Luffy-Bot.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Deploy Commands
   ```sh
   npm run build
   ```
4. Deploy App

   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SET UP -->

## Setup Guide

**Important:** Before following the setup guide please be sure to have the following ready!

- Discord server
- Discord bot setup inside of Discord Developer Portal
- Google Translate/LibreTranslate API Key

### Config File

**1. Create a file named "config.json" in the project root**

**2. Copy/paste the text below, fill in the information and change any values needed.**

```config
{
"avatarSet": false,
"bot": {
 "appID": "",
 "token": ""
},
"pokemonApiUrl": "https://pokeapi.co/api/v2/pokemon/",
"giphyApiUrl": "https://api.giphy.com/v1",
"giphyApiKey": "",
"apiNinjasFactUrl": "https://api.api-ninjas.com/v1/facts",
"apiNinjasDadJokeUrl": "https://api.api-ninjas.com/v1/dadjokes",
"apiNinjasKey": "",
"translationService": {
 "useLibreTranslate": true,
 "useGoogleTranslate": true,
 "libreTranslate": {
   "apiUrlDetect": "https://libretranslate.com/detect",
   "apiUrl": "https://libretranslate.com/translate",
   "apiKey": ""
 },
 "googleTranslate": {
   "apiUrlDetect": "https://translation.googleapis.com/language/translate/v2/detect?key=",
   "apiUrl": "https://translation.googleapis.com/language/translate/v2?key=",
   "apiKey": ""
 }
},
"discord": {
 "guildID": "",
 "adminUserIDs": [
   ""
 ],
 "languageSections": {
   "english": {
     "language": "English",
     "languageCode": "en",
     "roleID": "",
     "announcementChannelID": "",
     "chatChannelID": ""
   },
   "spanish": {
     "language": "Spanish",
     "languageCode": "es",
     "roleID": "",
     "announcementChannelID": "",
     "chatChannelID": ""
   },
   "swedish": {
     "language": "Swedish",
     "languageCode": "sv",
     "roleID": "",
     "announcementChannelID": "",
     "chatChannelID": ""
   },
   "arabic": {
     "language": "Arabic",
     "languageCode": "ar",
     "roleID": "",
     "announcementChannelID": "",
     "chatChannelID": ""
   }
 },
 "reactionTranslateWhitelistChannelIDs": [
   ""
 ],
 "devUserID": ""
},
"links": {
 "fullGame": "",
 "patch": "",
 "gameStatus": ""
},
"paypalEmails": {
 "devtruce": "",
 "warner": ""
},
"lastResetMonth": 1,
"monthlyCharacterLimit": 500000,
"totalCharactersSent": 0,
"minuteRequestLimit": 120,
"requestThisMinute": 1,
"lastResetMinute": 1
}
```

**3. Create a file named "reactionRoles.json" in the project root and leave it blank.**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### **How To Setup Automatic Translate and Relay Announcements**

**1. Create language specific roles inside of discord**

[![Discord Roles Screen Shot 2][discordRoles-screenshot]](product-link)

**2. Create languge specific announcement chanels inside of discord**

[![Discord Announcements Screen Shot 2][discordAnnouncements-screenshot]](product-link)

**3. Navigate to "config.json" and within the languageSection update the "roleID" & "announcementChannelID" for each language**

```json
"english": {
        "language": "English",
        "languageCode": "en",
        "roleID": "id_here",
        "announcementChannelID": "id_here",
        "chatChannelID": ""
      },
```

**4. Navigate to "src/events/messageCreate.js" & find the function named autoTranslateAndRelayAnnouncement**

If while following the steps above you decided to add/remove/change the languages then please be sure to correctly call the function here to support any language changes you may have made.

```js
await autoTranslateAndRelayAnnouncement(
  message,
  languageSections.english.announcementChannelID, // primary announcement channel
  [
    // send to spanish announcements channel
    {
      channelID: languageSections.spanish.announcementChannelID,
      language: languageSections.spanish.language,
      languageCode: languageSections.spanish.languageCode,
      roleID: languageSections.spanish.roleID,
    },
    // send to swedish announcements channel
    {
      channelID: languageSections.swedish.announcementChannelID,
      language: languageSections.swedish.language,
      languageCode: languageSections.swedish.languageCode,
      roleID: languageSections.swedish.roleID,
    },
    // send to arabic announcements channel
    {
      channelID: languageSections.arabic.announcementChannelID,
      language: languageSections.arabic.language,
      languageCode: languageSections.arabic.languageCode,
      roleID: languageSections.arabic.roleID,
    },
    // Add more language sections as needed
  ],
  message.author
);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### **How To Setup Automatic Translate and Relay Messages**

**1. Create languge specific chat chanels inside of discord**

[![Discord Messages Screen Shot 2][discordMessages-screenshot]](product-link)

**2. Navigate to "config.json" and within the languageSection update the "chatChannelID" for each language**

```json
"english": {
        "language": "English",
        "languageCode": "en",
        "roleID": "",
        "announcementChannelID": "",
        "chatChannelID": "id_here"
      },
```

**3. Navigate to "src/events/messageCreate.js" & find the functions named autoTranslateAndRelayMessage**

If while following the steps above you decided to add/remove/change the languages then please be sure to correctly call the functions here to support any language changes you may have made. This function is called multiple times for different channels so be sure to review closely!

```js
////// English -> Others
await autoTranslateAndRelayMessage(
  message,
  languageSections.english.chatChannelID, // source
  languageSections.english.language, // source
  languageSections.english.languageCode, // source
  [
    {
      // send to spanish chat channel
      channelID: languageSections.spanish.chatChannelID,
      language: languageSections.spanish.language,
      languageCode: languageSections.spanish.languageCode,
    },
    {
      // send to swedish chat channel
      channelID: languageSections.swedish.chatChannelID,
      language: languageSections.swedish.language,
      languageCode: languageSections.swedish.languageCode,
    },
    {
      // send to arabic chat channel
      channelID: languageSections.arabic.chatChannelID,
      language: languageSections.arabic.language,
      languageCode: languageSections.arabic.languageCode,
    },
    // Add more language sections as needed
  ],
  message.author
);

////// Spanish -> Others
await autoTranslateAndRelayMessage(
  message,
  languageSections.spanish.chatChannelID,
  languageSections.spanish.language,
  languageSections.spanish.languageCode,
  [
    {
      channelID: languageSections.english.chatChannelID,
      language: languageSections.english.language,
      languageCode: languageSections.english.languageCode,
    },
    {
      channelID: languageSections.swedish.chatChannelID,
      language: languageSections.swedish.language,
      languageCode: languageSections.swedish.languageCode,
    },
    {
      channelID: languageSections.arabic.chatChannelID,
      language: languageSections.arabic.language,
      languageCode: languageSections.arabic.languageCode,
    },
    // Add more language sections as needed
  ],
  message.author
);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### **How To Setup Reaction Translations**

**1. Navigate to "config.json" and look for "reactionTranslateWhitelistChannelIDs"**

this is where you will add channel ids or category ids for areas you will allow reaction translations to work. Example: our server only allows for use of reaction translations inside of tickets, everything else is handled by autoTranslateAndRelayAnnouncement and autoTranslateAndRelayMessage.

```json
    "reactionTranslateWhitelistChannelIDs": ["allowed_channel_id_here", "allowed_channel_id_here"]
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### **Reaction Translation Language Support**

If you are using Google Translate OR LibreTranslate API then you only need to follow step 1. If you are using LibreTranslate and are self hosting then you must follow all 3 steps

**1. Navigate to "src/functions/flagToLanguage.js**

```js
//this is where you can add or remove languages you want to support.
const flagToLanguage = {
  // "emoji" : "language"
  "🇺🇸": "en", // english
};

// List of All Emoji Flag ISO: https://apps.timwhitlock.info/emoji/tables/iso3166
```

**2. Navigate to your LibreTranslate Terminal and run the following line**

```sh
nano /app/data/env.sh
```

**3. Find the following line inside env.sh and add or remove languages**

```sh
export LT_LANGUAGE_MODELS=en,fr,es,pt,ru,de,ar
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### **How To Setup Keyword Triggers**

Setting up keyword triggers is very simple, all you need to do is call the function and pass the message, phrase you are looking for, response you want to give. Below is an example of how you would setup a keyword trigger.

**1. Navigate to src/events/messageCreate.js and add the code within execute function.**

```js
keywordTriggers(message, "how to", "user asked how to do something");
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.
If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

### How to Contribute

1. **Fork the Project:** Fork the repository to your own GitHub account.
2. **Create Your Feature Branch:** Create a new branch for your feature or bug fix.
3. **Make Changes:** Make your changes to the codebase. Be sure to follow the project's coding conventions and guidelines.
4. **Test Your Changes:** Test your changes thoroughly to ensure they work as expected.
5. **Commit Your Changes:** Commit your changes with descriptive commit messages.
6. **Push to Your Branch:** Push your changes to your forked repository.
7. **Submit a Pull Request:** Submit a pull request from your branch to the main repository's main branch.

### What Can I Contribute?

- **Bug Fixes:** If you encounter a bug, feel free to investigate and submit a fix.
- **Feature Requests:** Have an idea for a new feature? Submit a feature request or, better yet, implement it yourself and submit a pull request.
- **Documentation:** Help improve the project's documentation by fixing typos, clarifying instructions, or adding new sections.
- **Code Refactoring:** If you notice areas of the code that could be improved for readability or performance, refactor them and submit a pull request.
- **Testing:** Expand the test coverage of the project by writing new tests or improving existing ones.

### Get Started

Not sure where to start? Check out the issues section for open issues or feature requests.

Thank you for considering contributing to the Luffy Bot project!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Email: [DevTruce@Outlook.com]()

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- #### MARKDOWN LINKS & IMAGES #### -->
<!-- ## GitHub ##-->
<!-- links -->

[contributors-link]: https://github.com/DevTruce/Luffy-Bot/graphs/contributors
[forks-link]: https://github.com/DevTruce/Luffy-Bot/network/members
[stars-link]: https://github.com/DevTruce/Luffy-Bot/stargazers
[issues-link]: https://github.com/DevTruce/Luffy-Bot/issues
[license-link]: https://github.com/DevTruce/Luffy-Bot/blob/main/LICENSE.txt

<!-- icons -->

[contributors-icon]: https://img.shields.io/github/contributors/DevTruce/Luffy-Bot.svg?style=for-the-badge
[forks-icon]: https://img.shields.io/github/forks/DevTruce/Luffy-Bot.svg?style=for-the-badge
[stars-icon]: https://img.shields.io/github/stars/DevTruce/Luffy-Bot.svg?style=for-the-badge
[issues-icon]: https://img.shields.io/github/issues/DevTruce/Luffy-Bot.svg?style=for-the-badge
[license-icon]: https://img.shields.io/github/license/DevTruce/Luffy-Bot.svg?style=for-the-badge

<!-- ## Project ## -->

[product-link]: https://devtruce.github.io/Luffy-Bot/
[autoTranslateAndRelayAnnouncements-video]: src/imgs/announcements.gif
[autoTranslateAndRelayMessages-video]: src/imgs/messages.gif
[consoleLogs1-screenshot]: src/imgs/consoleLogs1.png
[consoleLogs2-screenshot]: src/imgs/consoleLogs2.png
[reactionTranslate-screenshot]: src/imgs/reactionTranslate.png
[keywordTriggers-screenshot]: src/imgs/keywordTriggers.png
[slashCommands1-screenshot]: src/imgs/slashCommands1.png
[slashCommands2-screenshot]: src/imgs/slashCommands2.png
[slashCommands3-screenshot]: src/imgs/slashCommands3.png
[discordRoles-screenshot]: src/imgs/discordRoles.png
[discordAnnouncements-screenshot]: src/imgs/discordAnnouncements.png
[discordMessages-screenshot]: src/imgs/discordMessages.png

<!-- ## Tech & Tools ## -->
<!-- links -->

[javascript-link]: https://www.javascript-icon/
[discordjs-link]: https://discord.js.org/
[nodejs-link]: https://nodejs.org/
[libretranslate-link]: https://github.com/LibreTranslate/LibreTranslate
[googletranslate-link]: https://cloud.google.com/translate/docs/reference/api-overview

<!-- icons -->

[javascript-icon]: https://img.shields.io/badge/Javascript-FCE22A?style=for-the-badge&logo=javascript&logoColor=black
[discordjs-icon]: https://img.shields.io/badge/discord.js-blue?style=for-the-badge
[nodejs-icon]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[libretranslate-icon]: https://img.shields.io/badge/Libre_Translate-blue?style=for-the-badge
[googletranslate-icon]: https://img.shields.io/badge/Google_Translate-blue?style=for-the-badge
