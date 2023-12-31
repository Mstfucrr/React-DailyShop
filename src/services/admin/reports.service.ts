import { IReview } from "@/shared/types";
import { IUser } from "../auth/types";
import { makeRequest } from "../base/base";


// Reportlanan kullanıcılar ve yorumlar için servisler

export interface IReportedUsers {
    id: string;
    user: IUser;
    reporterUser: IUser;
    reportedDate: string;
}

export interface IReportedReviews {
    id: string;
    review: IReview;
    reporterUser: IUser;
    reportedDate: string;
}

// USERS
const getReportedUsers = async (token: string) =>
    await makeRequest<any>(`Admin/ReportedUsers`, "GET", null, token);

const deleteReportedUser = async (id: string, token: string) =>
    await makeRequest<any>(`Admin/ReportedUsers/${id}`, "DELETE", null, token);

// REVIEWS
const getReportedReviews = async (token: string) =>
    await makeRequest<any>(`Admin/ReportedReviews`, "GET", null, token);

const deleteReportedReview = async (id: string, token: string) =>
    await makeRequest<any>(`Admin/ReportedReviews/${id}`, "DELETE", null, token);

export default {
    // USERS
    getReportedUsers,
    deleteReportedUser,
    // REVIEWS
    getReportedReviews,
    deleteReportedReview
};