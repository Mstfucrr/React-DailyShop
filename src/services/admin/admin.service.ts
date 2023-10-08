


export const getAdminAccess = async (token: string) => {
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzAyNzVkMTQxNDAxNjc5ZTM4MzJhMSIsIm5hbWUiOiJBZG1pbiIsImlhdCI6MTY5NjQ1Mzc5MywiZXhwIjoxNjk2NDU0MzkzfQ.TbuiK5KTbtZ_guULX4BwZ8tQuW-Mjo7x1re1WUvFClk"
    
    
    const response = await fetch('http://localhost:5000/api/admin', {
        headers : {
            'Accept': '*/*',
            'Authorization' : `Bearer: ${token}`
        }
    })
    const data = await response.json()
    console.log("data : " , data)
    return data

}
