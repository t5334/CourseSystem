import { useEffect, useState, useRef } from "react"
import axios from 'axios'
//import Todo from './todo'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
export default function Corses() {
    const [visibleCreate, setVisibleCreate] = useState(false);
    const inputName = useRef(null)
    const inputDescription = useRef(null)
    const inputTecherName = useRef(null)
    const inputPrice = useRef(null)
    const inputDomain = useRef(null)
    const inputMinClass = useRef(null)
    const inputMaxClass = useRef(null)
    const add = async () => {
        if (!inputName.current.value)
            return alert("Name is required")
        const newCorse = {
            name: inputName.current.value,
            description: inputDescription.current.value,
            price: inputPrice.current.value,
            domain: inputDomain.current.value,
            minClass: inputMinClass.current.value,
            maxClass: inputMaxClass.current.value,
        }
        try {
            const res = await axios.post('http://localhost:7000/api/course', newCorse)
            setTodosData(res.data)
            setVisibleCreate(false)
        } catch (error) {

            console.log(error);
        }


    }
    const footerContent = (
        <div>
            <Button label="Close" icon="pi pi-times" onClick={() => setVisibleCreate(false)} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={() => add()} autoFocus />
        </div>
    );
    return (<>
        <h1>todos</h1>
        <Button icon="pi pi-plus" rounded aria-label="Filter" direction="up-left" style={{ right: -100, bottom: 50 }} tooltip="Add todo" onClick={() => setVisibleCreate(true)} />
        <Dialog header="Create new todo" visible={visibleCreate} style={{ width: '50vw' }} onHide={() => { if (!visibleCreate) return; setVisibleCreate(false); }} footer={footerContent}>

            <div class="field grid"  >
                <label for="name" class="col-12 mb-2 md:col-2 md:mb-0">name:</label>
                <div class="col-12 md:col-10">
                    <InputText ref={inputName} type='text' /><br />
                </div>
            </div>
            <div class="field grid"  >
                <label for="Description" class="col-12 mb-2 md:col-2 md:mb-0">Description:</label>
                <div class="col-12 md:col-10">
                    <InputText ref={inputDescription} type='text' /><br />

                </div>
            </div>
            <div class="field grid"  >
                <label for="TecherName" class="col-12 mb-2 md:col-2 md:mb-0">TecherName:</label>
                <div class="col-12 md:col-10">
                    <InputText ref={inputTecherName} type='text' /><br />
                </div>
            </div>
            <div class="field grid"  >
                <label for="Price" class="col-12 mb-2 md:col-2 md:mb-0">Price:</label>
                <div class="col-12 md:col-10">
                    <InputText ref={inputPrice} type='text' /><br />
                </div>
            </div>
            <div class="field grid"  >
                <label for="Domain" class="col-12 mb-2 md:col-2 md:mb-0">Domain:</label>
                <div class="col-12 md:col-10">
                    <InputText ref={inputDomain} type='text' /><br />
                </div>
            </div>
            <div class="field grid"  >
                <label for="MinClass" class="col-12 mb-2 md:col-2 md:mb-0">MinClass:</label>
                <div class="col-12 md:col-10">
                    <InputText ref={inputMinClass} type='text' /><br />
                </div>
            </div>
            <div class="field grid"  >
                <label for="MaxClass" class="col-12 mb-2 md:col-2 md:mb-0">Maxclass:</label>
                <div class="col-12 md:col-10">
                    <InputText ref={inputMaxClass} type='text' /><br />
                </div>
            </div>

        </Dialog>
    </>)
}