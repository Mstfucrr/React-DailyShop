export function setProductCookie(productId: number, durationInSeconds: number) {
    const expires = new Date();
    expires.setTime(expires.getTime() + durationInSeconds * 1000); // Süre saniyeler cinsinden

    document.cookie = `product_${productId}=${durationInSeconds};path=/`;
        
    // expires : cookie'nin ne zaman silineceğini belirler. Eğer bu değer belirtilmezse, cookie oturum sonlanana kadar geçerli olur.
    // expires.toUTCString : 
    console.log("setProductCookie", document.cookie)
    console.log("cscs")
}