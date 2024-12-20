import React, { useEffect, useState } from 'react'
import { Loader } from '../../../../components/Loader/Loader'
import { Button } from '../../../../components/UI/Button/Button'
import cl from './AlloCategoryViewer.module.css';
import { AlloCategoryItem } from '../AlloCategoryItem/AlloCategoryItem';
import { IAlloCategoryItem } from '../../../../interfaces/Allo/IAlloCategoryItem';

interface IProps {
    fetchFunction: () => Promise<IAlloCategoryItem[]>
    saveFunction: (categories: IAlloCategoryItem[]) => Promise<void>
}

export const AlloCategoryViewer = ({fetchFunction, saveFunction}: IProps) => {
    const [categories, setCategories] = useState<IAlloCategoryItem[]>([])
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

  const handleItemChange = (categoryItem: IAlloCategoryItem) => {
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
        <div>Category id</div>
        <div>Marketpalce name</div>
        <div>Percent</div>
      </div>
      {categories.map((categoryItem) => 
        <AlloCategoryItem categoryItem={categoryItem} handleItemChange={handleItemChange}></AlloCategoryItem>
      )}
    </div>
</div>
   </>
  )
}

