
import { $host } from ".";
import { IEpicentrCategoryItem } from "../interfaces/Epicentr/IEpicentrCategoryItem";


export const getCategories = async (): Promise<IEpicentrCategoryItem[]> => {
    const { data } = await $host.get('epicentr/categories')
    return data as IEpicentrCategoryItem[];
}

export const changeCategories = async (categories: IEpicentrCategoryItem[]) => {
     const { data } = await $host.post('epicentr/categories', categories)
}