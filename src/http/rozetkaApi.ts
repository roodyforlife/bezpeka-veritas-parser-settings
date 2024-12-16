import { $host } from ".";
import { IRozetkaCategoryItem } from "../interfaces/Rozetka/IRozetkaCategoryItem";


export const getCategories = async (): Promise<IRozetkaCategoryItem[]> => {
    const { data } = await $host.get('rozetka/categories')
    return data as IRozetkaCategoryItem[];
}

export const changeCategories = async (categories: IRozetkaCategoryItem[]) => {
    await $host.post('rozetka/categories', categories)
}