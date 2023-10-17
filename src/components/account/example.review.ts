import { IReview } from "@/shared/types";
// import { userEx } from "./example.user";

export const reviews = [
    {
        id : 1,
        date : new Date("2021-06-01T00:00:00"),
        productId : 1,
        rating : 3,
        review : "Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.",
        name : "userEx.name",
        avatar : "https://bootdey.com/img/Content/avatar/avatar1.png",
        email : "userEx.email",
        status : "new"
    },
    {
        id : 2,
        date : new Date("2021-06-01T00:00:00"),
        productId : 1,
        rating : 4,
        name : "John Doe",
        email : "jhondoe@example.com",
        review : "Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.",
        avatar : "https://bootdey.com/img/Content/avatar/avatar2.png",
        status : "approved"
    }
] as IReview[]

