import { IReview } from "@/shared/types";
import { IUser } from "../auth/types";
import { makeRequest } from "../base/base";


// Reportlanan kullanıcılar ve yorumlar için servisler

export interface IReportBase {
    id: number;
    reporterUser: IUser;
    createdAt: string;
    reportedMessage: string;
}

export interface IReportedUsers extends IReportBase {
    user: IUser;
}

export interface IReportedReviews extends IReportBase {
    review: IReview;
}

// USERS
// Reportlanan kullanıcıları getir
const getReportedUsers = async (token: string) =>
    await makeRequest<any>("Admin/Users/ReportedUsers", "GET", null, token);

// Kullacıya ait raporu sil
const deleteReportForUser = async (reportId: number, token: string) =>
    await makeRequest<any>(`Admin/Users/ReportedUsers/${reportId}`, "DELETE", null, token);

// REVIEWS
// Reportlanan yorumları getir
const getReportedReviews = async (token: string) =>
    await makeRequest<any>("Admin/Reviews/ReportedReviews", "GET", null, token);

// Yoruma ait raporu sil
const deleteReportForReview = async (reportId: number, token: string) =>
    await makeRequest<any>(`Admin/Reviews/ReportedReviews/${reportId}`, "DELETE", null, token);

export default {
    // USERS
    getReportedUsers,
    deleteReportForUser,
    // REVIEWS
    getReportedReviews,
    deleteReportForReview
};


// const reportedUserss: IReportedUsers[] = [
//     {
//         id: 1,
//         user: auth,
//         reporterUser: auth,
//         createdAt: "2023-01-01",
//         reportedMessage: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus fuga non cum consectetur aperiam deserunt eaque sit earum quos quis, itaque sunt rem quas, amet veritatis repellat recusandae accusantium at."
//     },
//     {
//         id: 2,
//         user: auth,
//         reporterUser: auth,
//         createdAt: "2022-01-01",
//         reportedMessage: "Lorem ipsum dolor sit  recusandae accusantium at."
//     },
//     {
//         id: 3,
//         user: auth,
//         reporterUser: auth,
//         createdAt: "2021-01-01",
//         reportedMessage: "Lorem ipsum dolor sit amet, consectetur   accusantium at."
//     }

// ]

// const reportedReviewss: any[] = [
//     {
//         id: 1,
//         reporterUser: auth,
//         createdAt: "2023-01-01",
//         reportedMessage: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus fuga non cum consectetur aperiam deserunt eaque sit earum quos quis, itaque sunt rem quas, amet veritatis repellat recusandae accusantium at.",
//         review: {
//             user: auth,
//             comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus fuga non cum consectetur aperiam deserunt eaque sit earum quos quis, itaque sunt rem quas, amet veritatis repellat recusandae accusantium at.",
//             status: "New"
//         }
//     },
//     {
//         id: 2,
//         reporterUser: auth,
//         createdAt: "2022-01-01",
//         reportedMessage: "Lorem ipsum dolor sit  recusandae accusantium at.",
//         review: {
//             user: auth,
//             comment: "Lorem ipsum dolor sit amet,  sit earum quos quis, itaque sunt rem quas, amet veritatis repellat recusandae accusantium at.",
//             status: "reject"
//         }
//     },
//     {
//         id: 3,
//         reporterUser: auth,
//         createdAt: "2021-01-01",
//         reportedMessage: "Lorem ipsum dolor sit amet, consectetur   accusantium at.",
//         review: {
//             user: auth,
//             comment: "itaque sunt rem quas, amet veritatis repellat recusandae accusantium at.",
//             status: "approved"
//         }
//     }

// ]