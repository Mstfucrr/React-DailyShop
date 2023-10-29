{/* 
<div class="col-lg-4 col-md-6 col-sm-12 pb-1">
    <div class="card product-item border-0 mb-4">
        <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
            <img class="img-fluid w-100" src="img/product-2.jpg" alt="">
        </div>
        <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
            <h6 class="text-truncate mb-3">Colorful Stylish Shirt</h6>
            <div class="d-flex justify-content-center">
                <h6>$123.00</h6><h6 class="text-muted ml-2"><del>$123.00</del></h6>
            </div>
        </div>
        <div class="card-footer d-flex justify-content-between bg-light border">
            <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
            <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
        </div>
    </div>
</div>
*/}


import { TreeNode } from "primereact/treenode";
import { ICartItem, ICategory, IProduct } from "../../shared/types";
import { reviews } from "../account/example.review";

import p1 from "./img/product-1.jpg";
import p2 from "./img/product-2.jpg";
import p3 from "./img/product-3.jpg";
import p4 from "./img/product-4.jpg";
import p5 from "./img/product-5.jpg";
import p6 from "./img/product-6.jpg";
import p7 from "./img/product-7.jpg";
import p8 from "./img/product-8.jpg";



export const products = [
    {
        id: 1,
        name: "Colorful Stylish Shirt",
        price: 1203,
        image: p1,
        categoryId: 2,
        description: `Product Description
        Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.
        Dolore magna est eirmod sanctus dolor, amet diam et eirmod et ipsum. Amet dolore tempor consetetur sed lorem dolor sit lorem tempor. Gubergren amet amet labore sadipscing clita clita diam clita. Sea amet et sed ipsum lorem elitr et, amet et labore voluptua sit rebum. Ea erat sed et diam takimata sed justo. Magna takimata justo et amet magna et.`,
        rating: 4,
        colors: ["red", "blue", "green"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        tags: ["shirt", "stylish", "colorful"],
        date: new Date("2020-01-01T00:00:00"),
        images: [
            p1, p2, p3, p4, p5, p6
        ],
        status: "Yeni",
        stock: 0,
        reviews: reviews,
        isDeleted: true,
        isApproved: true
        
    },
    {
        id: 2,
        name: "Elegant Denim Jeans",
        price: 89.99,
        image: p2,
        categoryId: 2,
        description: "These elegant denim jeans are perfect for any occasion. Made with high-quality denim fabric.",
        rating: 4.5,
        colors: ["blue", "black", "gray"],
        sizes: ["S", "M", "L", "XL"],
        tags: ["jeans", "elegant", "denim"],
        date: new Date("2020-01-06T00:00:00"),
        status: "Eski",
        stock: 55,

        images: [],
        reviews: [],
        isDeleted: true,
        isApproved: false
    },
    {
        id: 3,
        name: "Classic White Sneakers",
        price: 59.99,
        image: p3,
        categoryId: 4,
        description: "A pair of classic white sneakers that goes well with any outfit. Comfortable and stylish.",
        rating: 4.2,
        colors: ["white"],
        sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
        tags: ["sneakers", "classic", "white"],
        date: new Date("2020-01-12T00:00:00"),
        status: "Eski",
        stock: 55,

        images: [],
        reviews: [],
        isDeleted: false,
        isApproved: true
    },
    {
        id: 4,
        name: "Leather Messenger Bag",
        price: 149.99,
        image: p4,
        categoryId: 3,
        description: "A stylish leather messenger bag for carrying your essentials. Ideal for work or travel.",
        rating: 4.7,
        colors: ["brown", "black"],
        sizes: ["Medium"],
        tags: ["bag", "leather", "messenger"],
        date: new Date("2020-01-11T00:00:00"),
        status: "Eski",
        stock: 55,

        images: [],
        reviews: [],
        isDeleted: false,
        isApproved: true
    },
    {
        id: 5,
        name: "Casual Cotton Trousers",
        price: 79.99,
        image: p5,
        categoryId: 2,
        description: "Comfortable and casual cotton trousers for everyday wear. Available in various colors.",
        rating: 4.0,
        colors: ["khaki", "black", "navy"],
        sizes: ["S", "M", "L", "XL"],
        tags: ["trousers", "casual", "cotton"],
        date: new Date("2020-01-30T00:00:00"),
        status: "Eski",
        stock: 55,

        images: [],
        reviews: [],
        isDeleted: false,
        isApproved: true
    },
    {
        id: 6,
        name: "Women's Floral Dress",
        price: 69.99,
        image: p6,
        categoryId: 4,
        description: "A beautiful floral dress for women. Perfect for summer parties and events.",
        rating: 4.8,
        colors: ["pink", "blue", "yellow"],
        sizes: ["XS", "S", "M", "L"],
        tags: ["dress", "floral", "women"],
        date: new Date("2020-01-20T00:00:00"),
        status: "Eski",
        stock: 55,

        images: [],
        reviews: [],
        isDeleted: true
    },
    {
        id: 7,
        name: "Sports Running Shoes",
        price: 79.99,
        image: p7,
        categoryId: 2,
        description: "High-performance sports running shoes for athletes. Lightweight and breathable.",
        rating: 4.5,
        colors: ["red", "blue", "black"],
        sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
        tags: ["shoes", "sports", "running"],
        date: new Date("2020-01-18T00:00:00"),
        status: "Eski",
        stock: 55,

        images: [],
        reviews: [],
        isDeleted: false
    },
    {
        id: 8,
        name: "Vintage Leather Jacket",
        price: 199.99,
        image: p8,
        categoryId: 2,
        description: "A stylish vintage leather jacket with a classic design. Perfect for a rugged look.",
        rating: 4.6,
        colors: ["brown", "black"],
        sizes: ["S", "M", "L", "XL"],
        tags: ["jacket", "leather", "vintage"],
        date: new Date("2020-01-16T00:00:00"),
        status: "Eski",
        stock: 55,

        images: [],
        reviews: [],
        isDeleted: false
    }, {
        id: 9,
        name: "Elegant Denim Jeans",
        price: 89.99,
        image: p2,
        categoryId: 2,
        description: "These elegant denim jeans are perfect for any occasion. Made with high-quality denim fabric.",
        rating: 4.5,
        colors: ["blue", "black", "gray"],
        sizes: ["S", "M", "L", "XL"],
        tags: ["jeans", "elegant", "denim"],
        date: new Date("2020-01-06T00:00:00"),
        status: "Eski",
        stock: 55,

        images: [],
        reviews: [],
        isDeleted: false
    },
    {
        id: 10,
        name: "Classic White Sneakers",
        price: 59.99,
        image: p3,
        categoryId: 2,
        description: "A pair of classic white sneakers that goes well with any outfit. Comfortable and stylish.",
        rating: 4.2,
        colors: ["white"],
        sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
        tags: ["sneakers", "classic", "white"],
        date: new Date("2020-01-12T00:00:00"),
        status: "Eski",
        stock: 55,

        images: [],
        reviews: []
    },
    {
        id: 11,
        name: "Leather Messenger Bag",
        price: 149.99,
        image: p4,
        categoryId: 2,
        description: "A stylish leather messenger bag for carrying your essentials. Ideal for work or travel.",
        rating: 4.7,
        colors: ["brown", "black"],
        sizes: ["Medium"],
        tags: ["bag", "leather", "messenger"],
        date: new Date("2020-01-11T00:00:00"),
        status: "Eski",
        stock: 55,

        images: [],
        reviews: []
    },
    {
        id: 12,
        name: "Smartphone Holder Stand",
        price: 19.99,
        image: p1,
        categoryId: 2,
        description: "A convenient smartphone holder stand for hands-free use. Suitable for all phone sizes.",
        rating: 4.3,
        colors: ["black"],
        sizes: ["One Size"],
        tags: ["accessory", "smartphone", "holder"],
        date: new Date("2020-01-12T00:00:00"),
        status: "Eski",
        stock: 55,

        images: [],
        reviews: []
    },
    {
        id: 13,
        name: "Elegant Denim Jeans",
        price: 89.99,
        image: p2,
        categoryId: 2,
        description: "These elegant denim jeans are perfect for any occasion. Made with high-quality denim fabric.",
        rating: 4.5,
        colors: ["blue", "black", "gray"],
        sizes: ["S", "M", "L", "XL"],
        tags: ["jeans", "elegant", "denim"],
        date: new Date("2020-01-06T00:00:00"),
        status: "Eski",
        stock: 55,

        images: [],
        reviews: []
    },
    {
        id: 14,
        name: "Classic White Sneakers",
        price: 59.99,
        image: p3,
        categoryId: 2,
        description: "A pair of classic white sneakers that goes well with any outfit. Comfortable and stylish.",
        rating: 4.2,
        colors: ["white"],
        sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
        tags: ["sneakers", "classic", "white"],
        date: new Date("2020-01-12T00:00:00"),
        status: "Eski",
        stock: 55,

        images: [],
        reviews: []
    },
    {
        id: 15,
        name: "Leather Messenger Bag",
        price: 149.99,
        image: p4,
        categoryId: 2,
        description: "A stylish leather messenger bag for carrying your essentials. Ideal for work or travel.",
        rating: 4.7,
        colors: ["brown", "black"],
        sizes: ["Medium"],
        tags: ["bag", "leather", "messenger"],
        date: new Date("2020-01-11T00:00:00"),
        status: "Eski",
        stock: 55,

        images: [],
        reviews: []
    }, {
        id: 16,
        name: "Designer Sunglasses",
        price: 129.99,
        image: p2,
        categoryId: 2,
        description: "Designer sunglasses that provide both style and UV protection. Available in various designs.",
        rating: 4.4,
        colors: ["black", "brown", "silver"],
        sizes: ["One Size"],
        tags: ["sunglasses", "designer", "accessory"],
        date: new Date("2020-01-20T00:00:00"),
        status: "Eski",
        stock: 55,

        images: []
    }
] as unknown as IProduct[];



export const cartItemsExample: ICartItem[] = [
    {
        id: 1,
        product: products[0],
        quantity: 1,
    },
    {
        id: 2,
        product: products[2],
        quantity: 2,
    }, {
        id: 3,
        product: products[0],
        quantity: 1,
    },
    {
        id: 4,
        product: products[2],
        quantity: 2,
    }

]




export const categoriesEx = [
    {
        id: 1,
        name: "Elektronik",
        parentCategoryId: undefined,
        subCategories: [
            {
                id: 2,
                name: "Telefon",
                parentCategoryId: 1,
                subCategories: null
            },
            {
                id: 3,
                name: "Bilgisayar",
                parentCategoryId: 1,
                subCategories: null
            },
            {
                id: 4,
                name: "Kamera",
                parentCategoryId: 1,
                subCategories: null
            }
        ]
    },
    {
        id: 5,
        name: "Giyim",
        parentCategoryId: undefined,
        subCategories: [
            {
                id: 6,
                name: "Erkek",
                parentCategoryId: 5,
                subCategories: null
            },
            {
                id: 7,
                name: "Kadın",
                parentCategoryId: 5,
                subCategories: null
            },
            {
                id: 8,
                name: "Çocuk",
                parentCategoryId: 5,
                subCategories: null
            }
        ]
    },


] as ICategory[]


// for tree select model converter

export const convertCategoriesToTreeSelectModel = (categories: ICategory[], parentKey?: string): TreeNode[] => {
    const treeSelectModel: TreeNode[] = [];
    categories.forEach((category) => {
        const key = parentKey ? `${parentKey}-${category.id}` : `${category.id}`;
        treeSelectModel.push({
            key,
            label: category.name,
            children: category.subCategories ? convertCategoriesToTreeSelectModel(category.subCategories, key) : undefined,
            data: category
        });
    });
    return treeSelectModel;
};

export const findCategoryByKeyInTreeSelectModel = (TreeNodes: TreeNode[], key: string): ICategory | undefined => {

    for (const node of TreeNodes) {
        if (node.key === key) {
            return node.data as ICategory;
        }
        if (node.children) {
            const result = findCategoryByKeyInTreeSelectModel(node.children, key);
            if (result !== undefined) {
                return result;
            }
        }
    }
    return undefined;
}
