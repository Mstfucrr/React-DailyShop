import { IReview } from "@/shared/types";
// import { userEx } from "./example.user";

export const reviews = [
    {
        id : 1,
        date : new Date("2021-06-01T00:00:00"),
        productId : 1,
        rating : 3,
        comment : "Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.",
        namil : "userEx.email",
        status : "new",
        
    },
    {
        id : 2,
        date : new Date("2021-06-01T00:00:00"),
        productId : 1,
        rating : 4,
        comment : "Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.",
        status : "approved"
    }
] as IReview[]

