export function timeAgo(input: string | Date): string {
    const date = typeof input === "string" ? new Date(input) : input;
    const diffSeconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
    // thresholds in seconds
    const minute = 60;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;    
    const year = 365 * day;    
  
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  
    if (diffSeconds < minute) return "just now";
    if (diffSeconds < hour)
      return rtf.format(-Math.floor(diffSeconds / minute), "minute");
    if (diffSeconds < day)
      return rtf.format(-Math.floor(diffSeconds / hour), "hour");
    if (diffSeconds < week)
      return rtf.format(-Math.floor(diffSeconds / day), "day");
    if (diffSeconds < month)
      return rtf.format(-Math.floor(diffSeconds / week), "week");
    if (diffSeconds < year)
      return rtf.format(-Math.floor(diffSeconds / month), "month");
  
    return rtf.format(-Math.floor(diffSeconds / year), "year");
  }
  