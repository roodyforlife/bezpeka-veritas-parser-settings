import React, { useEffect, useState } from 'react'
import cl from './TelegramCategories.module.css'
import { CategoryCreateModal } from '../Modals/CategoryCreateModal/CategoryCreateModal.tsx'
import { getAllCategories, updateCategories } from '../../../../http/telegramBotApi'
import { Loader } from '../../../../components/Loader/Loader'
import { ICategory } from '../../../../interfaces/TelegramBot/ICategory'
import { Button } from '../../../../components/UI/Button/Button'
import { TelegramCategory } from '../TelegramCategory/TelegramCategory'
import { IProduct } from '../../../../interfaces/TelegramBot/IProduct'

export const TelegramCategories = () => {
    const [createModal, setCreateModal] = useState<boolean>(false)
    const [categories, setCategories] = useState<ICategory[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);

    const fetchCategories = async () => {
        setLoading(true);
        await getAllCategories().then((data) => setCategories(data)).finally(() => setLoading(false))
    }

    const addNewProductToCategory = async (categoryId: string, product: IProduct) => {
        const updatetedCategories = [
            ...categories.map((category) => {
                if (categoryId === category.id) {
                    if (!category.products.some((pr) => pr.id === product.id)) {
                        return {
                            ...category,
                            products: [...category.products, product]
                        }
                    }
                }

                return category
            })
        ]

        setCategories(updatetedCategories)
        setLoading(true)
        await updateCategories(updatetedCategories).then(() => fetchCategories()).finally(() => setLoading(false))
    }

    const removeProductFromCategory = async (categoryId: string, product: IProduct) => {
        const updatetedCategories = [
            ...categories.map((category) => {
                if (categoryId === category.id) {
                    return {
                        ...category,
                        products: category.products.filter((pr) => pr.id !== product.id)
                    }
                }

                return category
            })
        ]

        setCategories(updatetedCategories);
        setLoading(true)
        await updateCategories(updatetedCategories).then(() => fetchCategories()).finally(() => setLoading(false))
    }

    const removeCategory = async (categoryId: string) => {
        const updatetedCategories = [
            ...categories.filter((category) => category.id !== categoryId)
        ]

        setCategories(updatetedCategories);
        setLoading(true)
        await updateCategories(updatetedCategories).then(() => fetchCategories()).finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchCategories()
    }, [])

  return (
   <>
   <Loader loading={loading}></Loader>
        <CategoryCreateModal fetch={fetchCategories} show={createModal} onHide={handleCloseCreateModal}></CategoryCreateModal>
    <div>
        <div className={cl.title}>Telegram Bot</div>
        <Button onClick={handleShowCreateModal}>Add category</Button>
        <div className={cl.categories}>
            {categories.map((category) => 
                <TelegramCategory removeCategory={removeCategory} addNewProductToCategory={addNewProductToCategory} removeProductFromCategory={removeProductFromCategory} category={category}></TelegramCategory>
            )}
        </div>
    </div>
   </>
  )
}
