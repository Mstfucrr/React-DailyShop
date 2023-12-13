import { Ordertatus } from "@/services/order/types";
import { ProductsSortBy } from "@/services/shop/types";

export const sizes = [
    { label: 'XS', value: 'xs' },
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
    { label: 'L', value: 'l' },
    { label: 'XL', value: 'xl' },
    { label: '2XL', value: '2xl' },
    { label: '3XL', value: '3xl' }
];

export const colors = [
    { label: 'Mavi', value: 'blue' },
    { label: 'Kırmızı', value: 'red' },
    { label: 'Sarı', value: 'yellow' },
    { label: 'Yeşil', value: 'green' },
    { label: 'Mor', value: 'purple' },
    { label: 'Turuncu', value: 'orange' },
    { label: 'Beyaz', value: 'white' },
    { label: 'Siyah', value: 'black' },
];

export const reviewStatus = [
    { label: 'Yeni', value: 'new' },
    { label: 'Onayla', value: 'approved' },
    { label: 'Reddet', value: 'reject' }
];

export const orderStatus = [
    { label: 'Yeni', value: Ordertatus.New },
    { label: 'Kabul Edildi', value: Ordertatus.Accepted },
    { label: 'Hazırlanıyor', value: Ordertatus.Preparing },
    { label: 'Kargoda', value: Ordertatus.OnShipping },
    { label: 'Tamamlandı', value: Ordertatus.Completed },
    { label: 'İptal Edildi', value: Ordertatus.Cancelled },
]

export const sortBy: { name: string, code: ProductsSortBy }[] = [
    { name: 'En Yeniler', code: ProductsSortBy.Newest },
    { name: 'Fiyat (Düşükten Yükseğe)', code: ProductsSortBy.PriceLowToHigh },
    { name: 'Fiyat (Yüksekten Düşüğe)', code: ProductsSortBy.PriceHighToLow },
    { name: 'İsim (A - Z)', code: ProductsSortBy.NameAZ },
    { name: 'İsim (Z - A)', code: ProductsSortBy.NameZA },
    { name: 'En İyi Puan Alanlar', code: ProductsSortBy.TopRated },
    { name: 'İnceleme', code: ProductsSortBy.Review }
];