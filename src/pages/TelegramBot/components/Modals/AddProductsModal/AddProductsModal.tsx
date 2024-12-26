import React, { useEffect, useState } from 'react'
import { Loader } from '../../../../../components/Loader/Loader'
import { Form, Modal } from 'react-bootstrap'
import { Button } from '../../../../../components/UI/Button/Button'
import { ICategory } from '../../../../../interfaces/TelegramBot/ICategory';
import cl from './AddProductsModal.module.css'
import { CustomInput } from '../../../../../components/UI/CustomInput/CustomInput';
import { getPromProduct } from '../../../../../http/telegramBotApi';
import { IProduct } from '../../../../../interfaces/TelegramBot/IProduct';

interface IProps {
    show: boolean,
    onHide: () => void;
    category: ICategory,
    addNewProductToCategory: (categoryId: string, product: IProduct) => void;
    removeProductFromCategory: (categoryId: string, product: IProduct) => void;
}

export const AddProductsModal = ({onHide, show, category, addNewProductToCategory, removeProductFromCategory} : IProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [productSearch, setProductSearch] = useState<string>("");
    const [product, setProduct] = useState<IProduct | undefined>()

    const search = async () => {
        setLoading(true)
        await getPromProduct(productSearch).then((data) => setProduct(data))
        .finally(() => setLoading(false))
    } 

    useEffect(() => {
        setProductSearch('')
        setProduct(undefined)
    }, [category, show])

  return (
    <>
    <Loader loading={loading}></Loader>
    <Modal show={show} onHide={onHide} dialogClassName="custom-modal" size="lg">
    <Modal.Header closeButton>
      <Modal.Title>{category.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
      <Form.Group>
        <div style={{display: "flex", alignItems: "center", gap: '10px'}}>
            <Form.Label>Product</Form.Label>
            <CustomInput value={productSearch} onChange={(val) => setProductSearch(val)}></CustomInput>
            <Button onClick={search}>Search</Button>
        </div>
        {product ?
        <>
        <div className={cl.product}>
            <div className={cl.image}><img src={product.image} alt="" /></div>
            <div className={cl.title}>{product.name}</div>
            <div className={cl.price}>Price: {product.price}</div>
            <div className={cl.sku}>Арт. {product.sku}</div>
        </div>
            <Button onClick={() => addNewProductToCategory(category.id, product)}>Add</Button>
        </>
        :
        <Form.Label>Nothing</Form.Label>
    }

      </Form.Group>
        <Form.Label>Products</Form.Label>
        <div className={cl.products}>
            {category.products.map((pr) =>
                <div className={cl.product}>
                <div className={cl.image}><img src={pr.image} alt="" /></div>
                <div className={cl.title}>{pr.name}</div>
                <div className={cl.price}>Price: {pr.price}</div>
                <div className={cl.sku}>Арт. {pr.sku}</div>
                <Button onClick={() => removeProductFromCategory(category.id, pr)}>Remove</Button>
            </div>
            )}
        </div>
      <Form.Group>

      </Form.Group>
    </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onHide}>
        Close
      </Button>
      {/* <Button onClick={handleSave}>
        Save Changes
      </Button> */}
    </Modal.Footer>
  </Modal>
  </>
  )
}
