export function setProductCookie(productId: number, durationInSeconds: number) {
  const expires = new Date()
  expires.setTime(expires.getTime() + durationInSeconds * 1000) // Süre saniyeler cinsinden

  document.cookie = `product_${productId}=${durationInSeconds};path=/`
}

// product and durationInSeconds
export function getProductsFromCookie(): {
  productId: number
  durationInSeconds: number
}[] {
  const cookies = document.cookie.split(';')
  const productIds: { productId: number; durationInSeconds: number }[] = []

  cookies.forEach(cookie => {
    const cookieParts = cookie.split('=')
    if (cookieParts.length !== 2) {
      return
    }
    const key = cookieParts[0].trim()
    const value = cookieParts[1].trim()

    if (key.startsWith('product_')) {
      const productId = parseInt(key.split('_')[1])
      const durationInSeconds = parseInt(value)
      productIds.push({ productId, durationInSeconds })
    }
  })

  return productIds
}
