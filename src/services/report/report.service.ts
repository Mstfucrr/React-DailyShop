import { makeRequest } from "../base/base";

export const reportReview = async (
  reviewId: number,
  input: any,
  token: string,
) =>
  await makeRequest<any>(
    `/Reviews/ReportReview/${reviewId}`,
    "POST",
    input,
    token,
  );

export const reportUser = async (userId: number, input: any, token: string) =>
  await makeRequest<any>(`/Users/ReportUser/${userId}`, "POST", input, token);
