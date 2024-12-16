import React, { useEffect, useState } from 'react'
import { IEpicentrCategoryItem } from '../../../../interfaces/Epicentr/IEpicentrCategoryItem'
import { Loader } from '../../../../components/Loader/Loader'
import { Button } from '../../../../components/UI/Button/Button'
import { EpicentrCategoryItem } from '../EpicentrCategoryItem/EpicentrCategoryItem'
import cl from './EpicentrCategoryViewer.module.css'

interface IProps {
    fetchFunction: () => Promise<IEpicentrCategoryItem[]>
    saveFunction: (categories: IEpicentrCategoryItem[]) => Promise<void>
}

export const EpicentrCategoryViewer = ({fetchFunction, saveFunction}: IProps) => {
    const [categories, setCategories] = useState<IEpicentrCategoryItem[]>([])
    const [loading, setLaoding] = useState<boolean>(false);

  const fetchCategories = async () => {
    setLaoding(true);
    await fetchFunction().then((data) => setCategories(data)).finally(() => setLaoding(false))
  }

  useEffect(() => {
    fetchCategories()
  }, [fetchFunction])

  const handleItemChange = (categoryItem: IEpicentrCategoryItem) => {
    setCategories(categories.map((category) => {
      if (category.id === categoryItem.id) {
        return categoryItem
      }

      return category
    }))
  }

  const handleSave = async () => {
    setLaoding(true);
    await saveFunction(categories).finally(() => setLaoding(false))
  }

  return (
   <>
   <Loader loading={loading}></Loader>
    <div >
    <div className={cl.title}>Epicentr</div>
    <Button onClick={handleSave}>Save changes</Button>
    <div className={cl.items}>
      <div className={cl.header}>
        <div>Checked</div>
        <div>Prom name</div>
        <div>Category id</div>
        <div>Marketpalce name</div>
        <div>Percent</div>
      </div>
      {categories.map((categoryItem) => 
        <EpicentrCategoryItem categoryItem={categoryItem} handleItemChange={handleItemChange}></EpicentrCategoryItem>
      )}
    </div>
</div>
   </>
  )
}

