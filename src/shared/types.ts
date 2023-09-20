// id: 1,
// name: "Colorful Stylish Shirt",
// price: 123,
// discount: 123,
// image: "img/product-1.jpg",
// category: "Shirt",
// description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
// rating: 4,
// reviews: 12,
// colors: ["red", "blue", "green"],
// sizes: ["S", "M", "L", "XL", "XXL"],
// tags: ["shirt", "stylish", "colorful"],

export interface IProduct {
    id: number,
    name : string,
    price : number,
    discount : number,
    image : string,
    category : string,
    description : string,
    rating : number,
    reviews : number,
    colors : string[],
    sizes : string[],
    tags : string[],
    date: Date,
}
  // gelen datalar pagnition ile listelencek

export interface IShopResponse {
    data: IProduct[],
    info: Iinfo
}

export interface Iinfo {
    count: number,
    pages: number,
    next: number | null,
    prev: number | null
}
