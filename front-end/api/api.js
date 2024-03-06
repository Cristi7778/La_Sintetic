import Constants from "expo-constants";

export const uri = Constants?.expoConfig?.hostUri
  ? Constants.expoConfig.hostUri.split(`:`).shift().concat(`:8080`)
  : `yourapi.com`;