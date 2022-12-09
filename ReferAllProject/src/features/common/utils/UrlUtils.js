export default class UrlUtils {

    static isValidHttpUrl(string) {
        let url;

        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }

    static isYoutubeUrl(url) {
        UrlUtils.isValidHttpUrl(url);

        return url.includes('youtube');
    }
}