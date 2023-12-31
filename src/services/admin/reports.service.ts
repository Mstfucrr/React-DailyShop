import { IReview } from "@/shared/types";
import { IUser } from "../auth/types";
import { makeRequest } from "../base/base";


// Reportlanan kullanıcılar ve yorumlar için servisler

export interface IReportedUsers {
    id: number;
    user: IUser;
    reporterUser: IUser;
    reportedDate: string;
    reportedMessage: string;
}

export interface IReportedReviews {
    id: number;
    review: IReview;
    reporterUser: IUser;
    reportedDate: string;
    reportedMessage: string;
}

// USERS
// Reportlanan kullanıcıları getir
const getReportedUsers = async (token: string) =>
    await makeRequest<any>(`Admin/ReportedUsers`, "GET", null, token);

// Kullacıya ait raporu sil
const deleteReportForUser = async (reportId: number, token: string) =>
    await makeRequest<any>(`Admin/ReportedUsers/${reportId}`, "DELETE", null, token);

// REVIEWS
// Reportlanan yorumları getir
const getReportedReviews = async (token: string) =>
    await makeRequest<any>(`Admin/ReportedReviews`, "GET", null, token);

// Yoruma ait raporu sil
const deleteReportForReview = async (reportId: number, token: string) =>
    await makeRequest<any>(`Admin/ReportedReviews/${reportId}`, "DELETE", null, token);

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
//         reportedDate: "2023-01-01",
//         reportedMessage: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus fuga non cum consectetur aperiam deserunt eaque sit earum quos quis, itaque sunt rem quas, amet veritatis repellat recusandae accusantium at."
//     },
//     {
//         id: 2,
//         user: auth,
//         reporterUser: auth,
//         reportedDate: "2022-01-01",
//         reportedMessage: "Lorem ipsum dolor sit  recusandae accusantium at."
//     },
//     {
//         id: 3,
//         user: auth,
//         reporterUser: auth,
//         reportedDate: "2021-01-01",
//         reportedMessage: "Lorem ipsum dolor sit amet, consectetur   accusantium at."
//     }

// ]

// const reportedReviewss: any[] = [
//     {
//         id: 1,
//         reporterUser: auth,
//         reportedDate: "2023-01-01",
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
//         reportedDate: "2022-01-01",
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
//         reportedDate: "2021-01-01",
//         reportedMessage: "Lorem ipsum dolor sit amet, consectetur   accusantium at.",
//         review: {
//             user: auth,
//             comment: "itaque sunt rem quas, amet veritatis repellat recusandae accusantium at.",
//             status: "approved"
//         }
//     }

// ]