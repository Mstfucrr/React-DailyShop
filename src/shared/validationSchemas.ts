import * as Yup from 'yup';


export const productInfoValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Ürün adı gereklidir')
        .min(3, 'Ürün adı çok kısa')
        .max(50, 'Ürün adı çok uzun'),
    price: Yup.number()
        .required('Fiyat gereklidir')
        .min(2, 'Fiyat 2 dan küçük olamaz'),
    stock: Yup.number()
        .required('Stok gereklidir')
        .min(0, 'Stok 0 dan küçük olamaz'),
    description: Yup.string()
        .required('Açıklama gereklidir')
        .min(40, 'Açıklama çok kısa'),
    status: Yup.string()
        .required('Durum gereklidir'),
    colors: Yup.array()
        .min(1, 'En az bir renk seçiniz'),
    category: Yup.string()
        .required('Kategori seçiniz'),
})

export const creditCardValidationSchema = Yup.object().shape({
    cardNumber: Yup.string()
        .required("Kart numarası zorunludur")
        .min(18, "Kart numarası 16 haneli olmalıdır"),

    cardOwner: Yup.string().required("Kart üzerindeki isim zorunludur"),
    cvv: Yup.string().required("CVV zorunludur").min(3, "CVV 3 haneli olmalıdır").max(3, "CVV 3 haneli olmalıdır"),
    LastDate: Yup.date().required("Son kullanma tarihi zorunludur"),
})