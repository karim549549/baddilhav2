// Mock RNLocalize for development
export const getLocales = () => [
  {
    languageCode: "en",
    countryCode: "US",
    isRTL: false,
  },
];

export const getNumberFormatSettings = () => ({
  decimalSeparator: ".",
  groupingSeparator: ",",
});

export const getCalendar = () => "gregorian";

export const getCountry = () => "US";

export const getCurrencies = () => ["USD"];

export const getTemperatureUnit = () => "fahrenheit";

export const getTimeZone = () => "America/New_York";

export const uses24HourClock = () => false;

export const usesMetricSystem = () => false;

export const addEventListener = () => {};

export const removeEventListener = () => {};
