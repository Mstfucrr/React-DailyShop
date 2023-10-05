export function setProductCookie(productId: number, durationInSeconds: number) {
    const expires = new Date();
    expires.setTime(expires.getTime() + durationInSeconds * 1000); // Süre saniyeler cinsinden

    document.cookie = `product_${productId}=${durationInSeconds};path=/`;
        
    // expires : cookie'nin ne zaman silineceğini belirler. Eğer bu değer belirtilmezse, cookie oturum sonlanana kadar geçerli olur.
    // expires.toUTCString : 
    console.log("setProductCookie", document.cookie)
    console.log("cscs")
}

export const getTokenFromCookie = () => {

    const token = document.cookie.split(';').filter((item) => {
        return item.includes('access_token')
    })[0].split('=')[1]

    return token
}

export const addTokenToCookie = (token: string) => {
    document.cookie = `access_token=${token};path=/`;
}