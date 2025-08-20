export class ConvertBool {

    static ToYesOrNo(b: boolean): string {
        return b != null && b ? "Yes" : "No";
    }
}