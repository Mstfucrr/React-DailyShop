import { makeRequest } from "../base/base"

export const reportReview = async (reviewId: number, token: string) =>
    await makeRequest<any>(`/Reviews/ReportReview/${reviewId}`, "POST", null, token);