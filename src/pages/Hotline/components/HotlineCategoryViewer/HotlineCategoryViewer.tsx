import React, { useEffect, useState } from 'react'
import { Loader } from '../../../../components/Loader/Loader'
import { Button } from '../../../../components/UI/Button/Button'
import { IHotlineCategoryItem } from '../../../../interfaces/Hotline/IHotlineCategoryItem'
import cl from './HotlineCategoryViewer.module.css';
import { HotlineCategoryItem } from '../HotlineCategoryItem/HotlineCategoryItem';

interface IProps {
    fetchFunction: () => Promise<IHotlineCategoryItem[]>
    saveFunction: (categories: IHotlineCategoryItem[]) => Promise<void>
}

export const HotlineCategoryViewer = ({fetchFunction, saveFunction}: IProps) => {
    const [categories, setCategories] = useState<IHotlineCategoryItem[]>([])
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

  const handleItemChange = (categoryItem: IHotlineCategoryItem) => {
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
    <div className={cl.title}>Allo</div>
    <div className={cl.stickyButton}><Button onClick={handleSave}>Save changes</Button></div>
    <div className={cl.items}>
      <div className={cl.header}>
        <div>Checked</div>
        <div>Prom name</div>
        {/* <div>Category id</div> */}
        <div>Marketpalce name</div>
        <div>Percent</div>
      </div>
      {categories.map((categoryItem) => 
        <HotlineCategoryItem categoryItem={categoryItem} handleItemChange={handleItemChange}></HotlineCategoryItem>
      )}
    </div>
</div>
   </>
  )
}

