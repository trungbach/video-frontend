import * as config from "../config/constant";
import { DEFAULT_LANGUAGE } from "../config/constant";
export const getTokenFromServer = (req: any) => {
  if (req.headers.cookie) {
    const headCookie = req.headers.cookie
      .split(";")
      .find((c: string) => c.trim().startsWith(`${config.KEY_TOKEN}=`));
    const token = headCookie ? headCookie.split("=")[1] : undefined;
    return token;
  }
  return undefined;
};

export const getLanguage = (cookie?: string) => {
  const headCookie = cookie?.split(";").find((c) => c.trim().startsWith(`${config.KEY_LANGUAGE}=`));
  const currentLocale = headCookie ? headCookie.split("=")[1] : DEFAULT_LANGUAGE;
  return currentLocale;
};

export const formatTime = (sec_num: number) => {
  let seconds_number = Math.floor(sec_num);
  var minutes = Math.floor(seconds_number / 60);
  var seconds = seconds_number - minutes * 60;
  let formatMinute;
  let formatSecond;

  if (minutes < 10) {
    formatMinute = "0" + minutes;
  } else formatMinute = minutes;
  if (seconds < 10) {
    formatSecond = "0" + seconds;
  } else formatSecond = seconds;
  return formatMinute + ":" + formatSecond;
};
