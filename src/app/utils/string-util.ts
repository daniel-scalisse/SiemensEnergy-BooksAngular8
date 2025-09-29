export class StringUtil {

    public static Replace(text: string, search: string, newText: string): string {
        if (text != null && text != "") {
            let aux = new String(text);
            let index = aux.indexOf(search, 0);
            while (index > -1) {
                text = aux.replace(search, newText);
                aux = new String(text);
                index = aux.indexOf(search, 0);
            }

            return aux.toString();
        }

        return text;
    }

    public static RemoveSpaces(value: string) {
        if (value != null) {
            value = value.trim();
            while (value.indexOf("  ") > -1) {
                value = value.replace('  ', ' ');
            }
        }
        return value;
    }
}