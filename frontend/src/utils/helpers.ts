import app from "config/app";
import moment from "moment";

export const isURL = (str: string) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[=-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

export const dateFormat = (date: Date) => {
  return moment(date).format("YYYY-MM-DD HH:mm");
};

export const imageURL = (img: any, type?: string) => {
  const prefex = type === "avatar" ? "avatars/" : "images/";
  if (isURL(img)) {
    return img;
  } else {
    const url = app.serverURL + "/assets/" + prefex + img;
    return url;
  }
};
