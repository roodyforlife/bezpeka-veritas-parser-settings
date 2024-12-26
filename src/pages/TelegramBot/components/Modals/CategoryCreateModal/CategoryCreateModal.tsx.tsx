import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { Button } from '../../../../../components/UI/Button/Button';
import { CustomInput } from '../../../../../components/UI/CustomInput/CustomInput';
import { ICategory } from '../../../../../interfaces/TelegramBot/ICategory';
import uuid from 'react-uuid';
import { createNewCategory } from '../../../../../http/telegramBotApi';
import { Loader } from '../../../../../components/Loader/Loader';

interface IProps {
    show: boolean,
    onHide: () => void;
    fetch: () => void
}

export const CategoryCreateModal = ({show, onHide, fetch}: IProps) => {
    const [form, setForm] = useState<ICategory>({
        id: "",
        name: '',
        key: "",
        products: []
    })
    const [loading, setLoading] = useState<boolean>(false);

    const handleSave = async () => {
        setLoading(true)
        await createNewCategory({...form, id: uuid()}).then(() => {
            onHide();
            fetch();
        }).finally(()  => setLoading(false))
    }

  return (
    <>
    <Loader loading={loading}></Loader>
    <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Add category</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <CustomInput value={form.name} onChange={(val) => setForm({...form, name: val})}></CustomInput>
      </Form.Group>
      <Form.Group>
        <Form.Label>Key</Form.Label>
        <CustomInput value={form.key} onChange={(val) => setForm({...form, key: val})}></CustomInput>
      </Form.Group>
    </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onHide}>
        Close
      </Button>
      <Button onClick={handleSave}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  </>
  )
}
