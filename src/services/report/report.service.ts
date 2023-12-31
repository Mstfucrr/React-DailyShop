import { makeRequest } from "../base/base"

export const reportReview = async (reviewId: number,input: any, token: string) =>
    await makeRequest<any>(`/Reviews/ReportReview/${reviewId}`, "POST", input, token);