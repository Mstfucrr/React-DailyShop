import { IUser, IUserAddress } from "@/services/auth/types";

export const userEx: IUser = {
    id: 1,
    name: 'Mehmet',
    surname: 'Kaya',
    email: 'mhmtky123@gmail.com',
    phone: '532 123 45 67',
    profileImage: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=826&t=st=1694862140~exp=1694862740~hmac=3367954bc36e90d64d76202dced34ed4e2f575ca512ef8a182b2e0a6fa185212',
    addresses: [
        {
            id: 1,
            title: 'Ev',
            address: 'İstanbul / Kadıköy',
            description: 'Ev adresi',
            isMain: true,
            city: 'İstanbul',
            country: 'Turkey',
            zipCode: 12124
        },
        {
            id: 2,
            title: 'İş',
            description: 'İş adresi',
            isMain: false,
            city: 'Ankara',
            address: 'Ankara / Çankaya / Kızılay',
            country: 'Turkey',
            zipCode: 14124
        }
    ] as IUserAddress[],
    role: "User",
    createdAt: "2021-09-01T00:00:00.000Z",
    updatedAt: "2023-09-01T00:00:00.000Z",
    reviews: undefined
}
