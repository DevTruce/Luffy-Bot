"use strict";

///////////////////////////////////////////////////////////////////////////////
//////// Flags:Languages Supported w/Reaction Translations

//// Emoji:LanguageCode
const flagToLanguage = {
  // English
  "🇬🇧": "en", // United Kingdom
  "🇺🇸": "en", // United States
  "🇨🇦": "en", // Canada
  "🇦🇺": "en", // Australia
  "🇳🇿": "en", // New Zealand
  "🇮🇪": "en", // Ireland
  "🇿🇦": "en", // South Africa
  "🇳🇬": "en", // Nigeria
  "🇰🇪": "en", // Kenya
  "🇺🇬": "en", // Uganda
  "🇹🇿": "en", // Tanzania
  "🇲🇹": "en", // Malta
  "🇲🇾": "en", // Malaysia
  "🇸🇬": "en", // Singapore
  "🇯🇲": "en", // Jamaica
  "🇺🇲": "en", // U.S. Minor Outlying Islands

  // French
  "🇫🇷": "fr", // France
  "🇨🇫": "fr", // Central African Republic
  "🇲🇱": "fr", // Mali
  "🇧🇫": "fr", // Burkina Faso
  "🇳🇪": "fr", // Niger
  "🇨🇮": "fr", // Ivory Coast
  "🇨🇬": "fr", // Congo-Brazzaville
  "🇬🇦": "fr", // Gabon
  "🇨🇩": "fr", // Congo-Kinshasa (DRC)
  "🇨🇲": "fr", // Cameroon
  "🇧🇯": "fr", // Benin
  "🇹🇬": "fr", // Togo
  "🇧🇮": "fr", // Burundi
  "🇷🇼": "fr", // Rwanda
  "🇧🇪": "fr", // Belgium
  "🇱🇺": "fr", // Luxembourg
  "🇲🇬": "fr", // Madagascar
  "🇲🇶": "fr", // Martinique
  "🇹🇩": "fr", // Chad
  "🇩🇿": "fr", // Algeria
  "🇹🇳": "fr", // Tunisia
  "🇲🇦": "fr", // Morocco
  "🇭🇹": "fr", // Haiti

  // Spanish
  "🇪🇸": "es", // Spain
  "🇲🇽": "es", // Mexico
  "🇦🇷": "es", // Argentina
  "🇨🇴": "es", // Colombia
  "🇨🇱": "es", // Chile
  "🇵🇪": "es", // Peru
  "🇻🇪": "es", // Venezuela
  "🇪🇨": "es", // Ecuador
  "🇬🇹": "es", // Guatemala
  "🇨🇺": "es", // Cuba
  "🇧🇴": "es", // Bolivia
  "🇩🇴": "es", // Dominican Republic
  "🇭🇳": "es", // Honduras
  "🇵🇾": "es", // Paraguay
  "🇸🇻": "es", // El Salvador
  "🇳🇮": "es", // Nicaragua
  "🇺🇾": "es", // Uruguay
  "🇵🇷": "es", // Puerto Rico

  // Portuguese
  "🇵🇹": "pt", // Portugal
  "🇧🇷": "pt", // Brazil
  "🇦🇴": "pt", // Angola
  "🇲🇿": "pt", // Mozambique
  "🇬🇼": "pt", // Guinea-Bissau
  "🇨🇻": "pt", // Cape Verde
  "🇸🇹": "pt", // São Tomé and Príncipe
  "🇹🇱": "pt", // Timor-Leste

  // Swedish
  "🇸🇪": "sv", // Sweden

  // German
  "🇩🇪": "de", // Germany
  "🇦🇹": "de", // Austria
  "🇱🇮": "de", // Liechtenstein

  // Russian
  "🇷🇺": "ru", // Russia
  "🇧🇾": "ru", // Belarus
  "🇰🇿": "ru", // Kazakhstan
  "🇰🇬": "ru", // Kyrgyzstan

  // Arabic
  "🇦🇪": "ar", // United Arab Emirates
  "🇸🇦": "ar", // Saudi Arabia
  "🇪🇬": "ar", // Egypt
  "🇮🇶": "ar", // Iraq
  "🇲🇦": "ar", // Morocco
  "🇩🇿": "ar", // Algeria
  "🇸🇾": "ar", // Syria
  "🇹🇳": "ar", // Tunisia
  "🇱🇾": "ar", // Libya
  "🇯🇴": "ar", // Jordan
  "🇶🇦": "ar", // Qatar
  "🇧🇭": "ar", // Bahrain
  "🇰🇼": "ar", // Kuwait
  "🇴🇲": "ar", // Oman
  "🇱🇧": "ar", // Lebanon
  "🇾🇪": "ar", // Yemen
  "🇲🇷": "ar", // Mauritania
  "🇸🇩": "ar", // Sudan
  "🇸🇴": "ar", // Somalia
  "🇩🇯": "ar", // Djibouti
  "🇵🇸": "ar", // Palestine

  // Italian
  "🇮🇹": "it", // Italy
  "🇨🇭": "it", // Switzerland

  // Dutch
  "🇳🇱": "nl", // Netherlands
  "🇧🇪": "nl", // Belgium

  // Turkish
  "🇹🇷": "tr", // Turkey

  // Polish
  "🇵🇱": "pl", // Poland

  // Hindi
  "🇮🇳": "hi", // India
  "🇫🇯": "hi", // Fiji
  "🇳🇵": "hi", // Nepal

  // Persian
  "🇮🇷": "fa", // Iran
  "🇦🇫": "fa", // Afghanistan
  "🇹🇯": "fa", // Tajikistan

  // Korean
  "🇰🇷": "ko", // South Korea
  "🇰🇵": "ko", // North Korea

  // Japanese
  "🇯🇵": "ja", // Japan

  // Chinese
  "🇨🇳": "zh", // China
  "🇹🇼": "zh", // Taiwan
  "🇭🇰": "zh", // Hong Kong
  "🇲🇴": "zh", // Macao

  // Add more if needed
};

///////////////////////////////////////////////////////////////////////////////
//////// Exports
module.exports = { flagToLanguage };
