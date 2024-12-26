
import { $host } from ".";
import { ICategory } from "../interfaces/TelegramBot/ICategory";
import { IProduct } from "../interfaces/TelegramBot/IProduct";

export const getPromProduct = async (productId: string): Promise<IProduct> => {
    const { data } = await $host.get(`api/telegram/bot/product/${productId}`)
    return data as IProduct;
}

export const getAllCategories = async ():Promise<ICategory[]> => {
    const { data } = await $host.get(`api/telegram/bot/categories`)
    return data as ICategory[];
}

export const createNewCategory = async (category: ICategory) => {
    await $host.post(`api/telegram/bot/category`, category)
}

export const updateCategories = async (categories: ICategory[]) => {
    await $host.post(`api/telegram/bot/categories`, categories)
}