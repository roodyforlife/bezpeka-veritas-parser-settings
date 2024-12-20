
import { $host } from ".";
import { IAlloCategoryItem } from "../interfaces/Allo/IAlloCategoryItem";


export const getCategories = async (): Promise<IAlloCategoryItem[]> => {
    const { data } = await $host.get('allo/categories')
    return data as IAlloCategoryItem[];
}

export const changeCategories = async (categories: IAlloCategoryItem[]) => {
     await $host.post('allo/categories', categories)
}