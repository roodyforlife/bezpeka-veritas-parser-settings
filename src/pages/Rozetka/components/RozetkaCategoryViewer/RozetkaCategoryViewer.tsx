import React, { useEffect, useState } from 'react'
import { Loader } from '../../../../components/Loader/Loader'
import { Button } from '../../../../components/UI/Button/Button'
import { IRozetkaCategoryItem } from '../../../../interfaces/Rozetka/IRozetkaCategoryItem'
import { RozetkaCategoryItem } from '../RozetkaCategoryItem/RozetkaCategoryItem'
import cl from './RozetkaCategoryViewer.module.css';

interface IProps {
    fetchFunction: () => Promise<IRozetkaCategoryItem[]>
    saveFunction: (categories: IRozetkaCategoryItem[]) => Promise<void>
}

export const RozetkaCategoryViewer = ({fetchFunction, saveFunction}: IProps) => {
    const [categories, setCategories] = useState<IRozetkaCategoryItem[]>([])
    const [loading, setLaoding] = useState<boolean>(false);
    
  useEffect(() => {
    const fetchCategories = async () => {
      setLaoding(true);
      await fetchFunction()
        .then((data) => setCategories(data))
        .finally(() => setLaoding(false));
    };
  
    fetchCategories();
  }, [fetchFunction])

  const handleItemChange = (categoryItem: IRozetkaCategoryItem) => {
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
    <div className={cl.title}>Rozetka</div>
    <div className={cl.stickyButton}><Button onClick={handleSave}>Save changes</Button></div>
    <div className={cl.items}>
      <div className={cl.header}>
        <div>Checked</div>
        <div>Prom name</div>
        <div>Marketpalce name</div>
        <div>Percent</div>
      </div>
      {categories.map((categoryItem) => 
        <RozetkaCategoryItem categoryItem={categoryItem} handleItemChange={handleItemChange}></RozetkaCategoryItem>
      )}
    </div>
</div>
   </>
  )
}

