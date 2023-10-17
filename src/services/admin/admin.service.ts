import { reviews } from "@/components/account/example.review";
import { userEx } from "@/components/account/example.user";
import axios from "axios";

// tek fetch fonksiyonu ile çek
const fetchSettings = async (token: string) => {
    const { data } = await axios.get('/admin/settings', {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

const fetchUsers = async (token: string) => {
    const { data } = await axios.get('/admin/users', {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

const fetchAddressByUserId = async (id: number, token: string) => {
    // const { data } = await axios.get(`/admin/users/${id}/addresses`, {
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //     },
    // });

    const data = userEx.addresses;
    return data;
}

const fetchReviewsByUserId = async (id: number, token: string) => {
    // const { data } = await axios.get(`/admin/users/${id}/reviews`, {
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //     },
    // });

    const data = reviews;
    return data;
}



const saveAbout = async (input: string, token: string) => {

    const { data } = await axios.post('/admin/about', input, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return data;


}

const saveContact = async (email: string, phone: string, token: string) => {

    const { data } = await axios.post('/admin/contact', { email, phone }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

        },
    });
    return data

}

const saveAddress = async (input: string, token: string) => {

    const { data } = await axios.post('/admin/address', input, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

        },
    });
    return data

}

const saveSiteIcon = async (input: File, token: string) => {

    const { data } = await axios.post('/admin/site-icon', input, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

        },
    });
    return data

}

const updateReviewStatus = async (id: number, status: string, token: string) => {

    console.log(id, status, token)
    const { data } = await axios.post(`/admin/review/${id}`, { status }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

        },
    });
    return data

}



export default {
    saveAbout,
    saveContact,
    saveAddress,
    saveSiteIcon,
    fetchSettings,
    fetchUsers,
    fetchAddressByUserId,
    fetchReviewsByUserId,
    updateReviewStatus
}
