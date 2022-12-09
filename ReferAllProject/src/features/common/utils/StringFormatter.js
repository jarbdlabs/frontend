import prettyBytes from 'pretty-bytes';

export default class StringFormatter {

    // static formatCurrency(money) {
    //     return accounting.formatMoney(money, CONFIG.CURRENCY_SYMBOL, 0);
    // }

    static formatBytes(bytes) {
       return prettyBytes(bytes);
    }

    static capitalize(str) {
        if (!str) return '';

        return str.charAt(0).toUpperCase() + (str.length > 1 ? str.slice(1).toLowerCase() : '');
    }

    static truncateString(string, limit=6) {
        if (string.length > limit) {
            return string.substring(0, limit) + '...';
        } else {
            return string;
        }
    }

    static removeWhitespace(string) {
        return string.replace(/\s+/g, "");
    }
}