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


import { IProduct } from "../../shared/types";

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
        discount: 123,
        image: p1,
        category: "Shirt",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        rating: 4,
        reviews: 12,
        colors: ["red", "blue", "green"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        tags: ["shirt", "stylish", "colorful"],
    },
    {
        id: 2,
        name: "Elegant Denim Jeans",
        price: 89.99,
        discount: 10,
        image: p2,
        category: "Jeans",
        description: "These elegant denim jeans are perfect for any occasion. Made with high-quality denim fabric.",
        rating: 4.5,
        reviews: 8,
        colors: ["blue", "black", "gray"],
        sizes: ["S", "M", "L", "XL"],
        tags: ["jeans", "elegant", "denim"]
    },
    {
        id: 3,
        name: "Classic White Sneakers",
        price: 59.99,
        discount: 5,
        image: p3,
        category: "Shoes",
        description: "A pair of classic white sneakers that goes well with any outfit. Comfortable and stylish.",
        rating: 4.2,
        reviews: 10,
        colors: ["white"],
        sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
        tags: ["sneakers", "classic", "white"]
    },
    {
        id: 4,
        name: "Leather Messenger Bag",
        price: 149.99,
        discount: 20,
        image: p4,
        category: "Bags",
        description: "A stylish leather messenger bag for carrying your essentials. Ideal for work or travel.",
        rating: 4.7,
        reviews: 15,
        colors: ["brown", "black"],
        sizes: ["Medium"],
        tags: ["bag", "leather", "messenger"]
    }
    , {
        id: 5,
        name: "Casual Cotton Trousers",
        price: 79.99,
        discount: 0,
        image: p5,
        category: "Pants",
        description: "Comfortable and casual cotton trousers for everyday wear. Available in various colors.",
        rating: 4.0,
        reviews: 6,
        colors: ["khaki", "black", "navy"],
        sizes: ["S", "M", "L", "XL"],
        tags: ["trousers", "casual", "cotton"]
    }
    , {
        id: 6,
        name: "Women's Floral Dress",
        price: 69.99,
        discount: 15,
        image: p6,
        category: "Dresses",
        description: "A beautiful floral dress for women. Perfect for summer parties and events.",
        rating: 4.8,
        reviews: 18,
        colors: ["pink", "blue", "yellow"],
        sizes: ["XS", "S", "M", "L"],
        tags: ["dress", "floral", "women"]
    }
    , {
        id: 7,
        name: "Sports Running Shoes",
        price: 79.99,
        discount: 0,
        image: p7,
        category: "Shoes",
        description: "High-performance sports running shoes for athletes. Lightweight and breathable.",
        rating: 4.5,
        reviews: 9,
        colors: ["red", "blue", "black"],
        sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
        tags: ["shoes", "sports", "running"]
    }
    , {
        id: 8,
        name: "Vintage Leather Jacket",
        price: 199.99,
        discount: 25,
        image: p8,
        category: "Jackets",
        description: "A stylish vintage leather jacket with a classic design. Perfect for a rugged look.",
        rating: 4.6,
        reviews: 14,
        colors: ["brown", "black"],
        sizes: ["S", "M", "L", "XL"],
        tags: ["jacket", "leather", "vintage"]
    }
    , {
        id: 9,
        name: "Smartphone Holder Stand",
        price: 19.99,
        discount: 5,
        image: p1,
        category: "Accessories",
        description: "A convenient smartphone holder stand for hands-free use. Suitable for all phone sizes.",
        rating: 4.3,
        reviews: 7,
        colors: ["black"],
        sizes: ["One Size"],
        tags: ["accessory", "smartphone", "holder"]
    }
    , {
        id: 10,
        name: "Designer Sunglasses",
        price: 129.99,
        discount: 0,
        image: p2,
        category: "Accessories",
        description: "Designer sunglasses that provide both style and UV protection. Available in various designs.",
        rating: 4.4,
        reviews: 11,
        colors: ["black", "brown", "silver"],
        sizes: ["One Size"],
        tags: ["sunglasses", "designer", "accessory"]
    }




] as IProduct[];