import dayjs from "dayjs";

//获取本月开始时间
export function getCurrentMonthFirst() {
  const date = Date.now();
  return dayjs(date).format("YYYY-MM") + "-01 00:00:00";
}

//获取本月开始时间,不带时分秒
export function getCurrentMonthFirstNo() {
  const date = Date.now();
  return dayjs(date).format("YYYY.MM") + ".01";
}

//获取本月开始时间,不带时分秒
export function getCurrentMonthOne() {
  const date = Date.now();
  return dayjs(date).format("YYYY-MM") + "-01";
}

//获取当前时间
export function getCurrentNow() {
  const date = Date.now();
  return dayjs(date).format("YYYY-MM-DD hh:mm:ss");
}

//获取当前时间,不带时分秒
export function getCurrentNowNo() {
  const date = Date.now();
  return dayjs(date).format("YYYY.MM.DD");
}

//获取当前时间,不带时分秒
export function getCurrentNowNoTitle() {
  const date = Date.now();
  return dayjs(date).format("YYYY-MM-DD");
}
//获取每周的第一天
export function getCurrentWeekStartTime() {
  const current = new Date();
  // current是本周的第几天
  let nowDayOfWeek = current.getDay();
  if (nowDayOfWeek === 0) nowDayOfWeek = 7;
  const dayNum = 1 * 24 * 60 * 60 * 1000;
  // 获取本周星期一的时间，星期一作为一周的第一天
  const firstDate = new Date(current.valueOf() - (nowDayOfWeek - 1) * dayNum);
  // 获取本周星期天的时间，星期天作为一周的最后一天
  new Date(new Date(firstDate).valueOf() + 6 * dayNum);
  const nowTimeDate = new Date(firstDate);
  var startDate = dayjs(nowTimeDate).format("YYYY-MM-DD") + "+00:00:00";
  return startDate;
}

//获取每周的第一天
export function getCurrentone() {
  const current = new Date();
  // current是本周的第几天
  let nowDayOfWeek = current.getDay();
  if (nowDayOfWeek === 0) nowDayOfWeek = 7;
  const dayNum = 1 * 24 * 60 * 60 * 1000;
  // 获取本周星期一的时间，星期一作为一周的第一天
  const firstDate = new Date(current.valueOf() - (nowDayOfWeek - 1) * dayNum);
  // 获取本周星期天的时间，星期天作为一周的最后一天
  new Date(new Date(firstDate).valueOf() + 6 * dayNum);
  const nowTimeDate = new Date(firstDate);
  var startDate = dayjs(nowTimeDate).format("YYYY-MM-DD");
  return startDate;
}
