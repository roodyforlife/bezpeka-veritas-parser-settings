import React, { useState } from 'react'
import { ICategory } from '../../../../interfaces/TelegramBot/ICategory'
import { Button } from '../../../../components/UI/Button/Button'
import { AddProductsModal } from '../Modals/AddProductsModal/AddProductsModal'
import { IProduct } from '../../../../interfaces/TelegramBot/IProduct'

interface IProps {
    category: ICategory,
    addNewProductToCategory: (categoryId: string, product: IProduct) => void;
    removeProductFromCategory: (categoryId: string, product: IProduct) => void;
    removeCategory: (categoryId: string) => void
}

export const TelegramCategory = ({category, addNewProductToCategory, removeProductFromCategory, removeCategory}: IProps) => {
    const [addModal, setAddModal] = useState<boolean>(false);

    const handleShowCreateModal = () => setAddModal(true);
    const handleCloseCreateModal = () => setAddModal(false)

  return (
    <>
    <AddProductsModal addNewProductToCategory={addNewProductToCategory} removeProductFromCategory={removeProductFromCategory} show={addModal} onHide={handleCloseCreateModal} category={category}></AddProductsModal>
        <div>{category?.name}</div>
        <div>{category?.key}</div>
        <Button onClick={handleShowCreateModal}>Edit</Button>
        <Button onClick={() => removeCategory(category.id)}>Remove</Button>
    </>
  )
}
