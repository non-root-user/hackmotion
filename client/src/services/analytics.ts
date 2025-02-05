import axios from "axios";

// UserID: A string representing a unique identifier for the user, or null if the user is not identified.
type UserID = string | null;

interface AnalyticsData {
    // AnalyticsData: An object containing data about the user's current session.
    userID: UserID;
    currentPage: string;
    timestamp: number;
    browser: string;
}

export class EventTypes {
    // EventTypes: A class containing constants for the different types of events that can be sent to the server.
    static NEW_UNIQUE_VISITOR = "new_unique_visitor";
    static PAGE_VIEW = "page_view";
    static VIDEO_WATCHED = "video_watched";
}

export class Analytics {
    // apiBaseURL: The base URL of the server's API
    static apiBaseURL = "http://localhost:5001";


    static gatherData(): AnalyticsData {
        // gatherData: Collect data about the user's current session and return it as an object.

        const userID = this.getUniqueID();
        const currentPage = window.location.href;
        const timestamp = Date.now() / 1000;
        const browser = navigator.userAgent;

        return {userID, currentPage, timestamp, browser};
    }

    static getUniqueID(): UserID {
        // getUniqueID: Generate a unique ID for the user using a fingerprint
        // If the user has visited the site before, return the ID stored in localStorage
        // Otherwise, generate a new ID and store it in localStorage, then send a "new_unique_visitor" event to the server.

        let id = localStorage.getItem("analytics_id");
        if (!id) {
            const fingerprint = navigator.userAgent + navigator.language + (new Date().getTime());
            id = btoa(fingerprint).replace(/=/g, "").substring(0, 15);

            id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            localStorage.setItem("analytics_id", id);

            axios.post(this.apiBaseURL + "/api/analytics", {data: {userID: id}, event: EventTypes.NEW_UNIQUE_VISITOR});
        }

        return id;
    }

    static sendData(data: AnalyticsData, event: string): void {
        // sendData: Send the data object to the server along with the event name.

        axios.post(this.apiBaseURL + "/api/analytics", {data, event})
            .catch(err => console.error(err));
    }
}
