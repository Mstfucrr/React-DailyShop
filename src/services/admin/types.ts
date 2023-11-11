export interface ISiteSettings {
    id: number | undefined;
    about: string | undefined;
    address: string | undefined;
    siteIcon: File | undefined;
    email: string | undefined;
    phone: string | undefined;
}

export interface ICategoryRequest {
    name: string,
    parentCategoryId: number | null
}