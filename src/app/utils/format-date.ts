import { formatDate } from "@angular/common";

export class FormatDate {

    static ToEn(d: Date): string {
        if (d != null && d.toString() != "")
            return formatDate(d, 'yyyy-MM-dd', 'en');
        return "";
    }

    static ToBr(d: Date): string {
        if (d != null && d.toString() != "")
            return formatDate(d, 'yyyy-MM-dd', 'br');
        return "";
    }
}

export class FormatDateTime {

    static ToEn(dt: Date): string {
        if (dt != null && dt.toString() != "")
            return formatDate(dt, 'yyyy-MM-dd HH:mm:ss.SSS', 'en');
        return "";
    }

    static ToBr(dt: Date): string {
        if (dt != null && dt.toString() != "")
            return formatDate(dt, 'yyyy-MM-dd HH:mm:ss.SSS', 'br');
        return "";
    }
}