import I18n from "./language/i18n";
import moment from "moment";

export const currencyToString = value => {
  if (!value || (value && value == "")) {
    value = "0";
  }
  // value = value | 0;
  value = parseInt(value)
  value = value.toString();
  let money = parseInt(value.replace(/\D/g, ""), 10);
  currentMoney = I18n.toNumber(money, { delimiter: ",", precision: 0 });
  return currentMoney.toString();
};

export const dateToStringFormatUTC = (
  date,
  inputFormat = "YYYYMMDDhhmmss",
  outputFormat = "HH:mm DD/MM/YYYY"
) => {
  var momentdate = moment.utc(date, inputFormat)

  var dateITC = moment(momentdate).local();
  var dateTimezone = dateITC.format(outputFormat);

  return dateTimezone;
};

export const momentToStringDateLocal = (
  momentInput,
  outputFormat = "YYYY-MM-DDTHH:mm:ss.SS"
) => {
  let dateTimeUtc = moment.utc(momentInput).format(outputFormat)
  return dateTimeUtc
}

export const dateToString = (date, formatOutput = "DD/MM/YYYY") => {
  let momentdate = "";
  try {
    momentdate = moment(date, "YYYY-MM-DD HH:mm:ss").format(formatOutput);
    if (momentdate == "Invalid date") {
      momentdate = "";
    }
  } catch (e) {
    momentdate = "";
  }
  return momentdate;
};
