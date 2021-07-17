import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../iDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const endDateUtc = this.convertToUTC(end_date);
    const startDateUtc = this.convertToUTC(start_date);

    return dayjs(endDateUtc).diff(startDateUtc, "hours");
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const endDateUtc = this.convertToUTC(end_date);
    const startDateUtc = this.convertToUTC(start_date);

    return dayjs(endDateUtc).diff(startDateUtc, "days");
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }
}

export { DayjsDateProvider };
