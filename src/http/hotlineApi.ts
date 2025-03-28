
import { $host } from ".";
import { IHotlineCategoryItem } from "../interfaces/Hotline/IHotlineCategoryItem";


export const getCategories = async (): Promise<IHotlineCategoryItem[]> => {
    const { data } = await $host.get('hotline/categories')
    return data as IHotlineCategoryItem[];
}

export const changeCategories = async (categories: IHotlineCategoryItem[]) => {
    await $host.post('hotline/categories', categories)
}