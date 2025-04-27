import React, { useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import CourseRegistration from './CourseRegistration'; // Ensure you have a registration component for students

export default function EntityCard({ entity, type }) {
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const inputName = useRef(null);
    const inputDescription = useRef(null);
    const inputPrice = useRef(null);
    const inputDomain = useRef(null);
    const inputMinClass = useRef(null);
    const inputMaxClass = useRef(null);

    const handleRegister = () => {
        // Handle registration logic here
        <CourseRegistration />;
    };

    const handleUpdate = () => {
        // Update logic here
    };

    const handleDelete = () => {
        // Delete logic here
    };

    const footerDelete = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisibleDelete(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={handleDelete} autoFocus />
        </div>
    );

    const footerContent = (
        <div>
            <Button label="Close" icon="pi pi-times" onClick={() => setVisibleUpdate(false)} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={handleUpdate} autoFocus />
        </div>
    );

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );

    const footer = (
        <>
            {type === 'manager' && (
                <>
                    <Button severity="danger" icon="pi pi-trash" tooltip="Delete" onClick={() => setVisibleDelete(true)} />
                    <Button severity="info" icon="pi pi-pencil" onClick={() => setVisibleUpdate(true)} />
                </>
            )}
            {type === 'student' && (
                <Button severity="warning" label='Register' icon="pi pi-plus" onClick={handleRegister} />
            )}
        </>
    );

    return (
        <div className="col-12 md:col-6 lg:col-3">
            <div className="text-center p-3 border-round-sm bg-primary font-bold">
                <Card title={entity.title} footer={footer} header={header} className="md:w-25rem">
                    {/* Update Dialog */}
                    <Dialog header={entity.title} visible={visibleUpdate} style={{ width: '50vw' }} onHide={() => setVisibleUpdate(false)} footer={footerContent}>
                        <div className="field grid">
                            <label htmlFor="name" className="col-12 mb-2 md:col-2 md:mb-0">Name:</label>
                            <div className="col-12 md:col-10">
                                <InputText ref={inputName} type='text' defaultValue={entity.name} /><br />
                            </div>
                        </div>
                        {/* Additional fields based on type */}
                        {type === 'course' && (
                            <>
                                <div className="field grid">
                                    <label htmlFor="Description" className="col-12 mb-2 md:col-2 md:mb-0">Description:</label>
                                    <div className="col-12 md:col-10">
                                        <InputText ref={inputDescription} type='text' defaultValue={entity.description} /><br />
                                    </div>
                                </div>
                                <div className="field grid">
                                    <label htmlFor="Price" className="col-12 mb-2 md:col-2 md:mb-0">Price:</label>
                                    <div className="col-12 md:col-10">
                                        <InputText ref={inputPrice} type='text' defaultValue={entity.price} /><br />
                                    </div>
                                </div>
                                {/* Add more fields as required */}
                            </>
                        )}
                    </Dialog>
                    {/* Delete Confirmation Dialog */}
                    <Dialog header={entity.title} visible={visibleDelete} style={{ width: '50vw' }} onHide={() => setVisibleDelete(false)} footer={footerDelete}>
                        <p className="m-0" style={{ fontSize: 20 }}>
                            Are you sure that you want to remove this entity?
                        </p>
                    </Dialog>
                </Card>
            </div>
        </div>
    );
}






// import React, { useRef } from 'react';
// import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';
// import { Dialog } from 'primereact/dialog';
// import { useState } from "react";
// import { InputText } from 'primereact/inputtext';
// import CourseRegistration from './CourseRegistration'
// export default function Course() {
//     const [visibleUpdate, setVisibleUpdate] = useState(false);
//     const [visibleDelete, setVisibleDelete] = useState(false);
//     const inputName = useRef(null)
//     const inputDescription = useRef(null)
//     const inputTecherName = useRef(null)
//     const inputPrice = useRef(null)
//     const inputDomain = useRef(null)
//     const inputMinClass = useRef(null)
//     const inputMaxClass = useRef(null)
//  const Register=()=>{
// <CourseRegistration/>
//  }
//  const update=()=>{

//  }
//  const del=()=>{
    
//  }
//     const footerDelete = (
//         <div>
//             <Button label="No" icon="pi pi-times" onClick={() => setVisibleDelete(false)} className="p-button-text" />
//             <Button label="Yes" icon="pi pi-check" onClick={() => del()} autoFocus />
//         </div>
//     );
//     const footerContent = (
//         <div>
//             <Button label="Close" icon="pi pi-times" onClick={() => setVisibleUpdate(false)} className="p-button-text" />
//             <Button label="Save" icon="pi pi-check" onClick={() => update()} autoFocus />
//         </div>
//     );
//     const header = (
//         <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
//     );
//     const footer = (
//         <>
//             <Button severity="danger" icon="pi pi-trash" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => setVisibleDelete(true)} />
//             <Button severity='info' icon="pi pi-pencil" style={{ marginLeft: '0.5em' }} tooltip="Update" tooltipOptions={{ position: 'bottom' }} onClick={() => setVisibleUpdate(true)} />
//             <Button severity="warning"label='לרישום' icon="pi pi-eye" style={{ marginLeft: '0.5em' }} tooltip="Register" tooltipOptions={{ position: 'bottom' }} onClick={Register()} />
//             {/* <div className="card flex justify-content-center">
//                 <InputSwitch checked={checked} onChange={(e) => updateComplete()} />
//             </div> */}
//         </>
//     );
//     return (

//         <div class="col-12 md:col-6 lg:col-3">
//             <div class="text-center p-3 border-round-sm bg-primary font-bold" className="card flex justify-content-center">
//                 <Card title={props.todo.title} footer={footer} header={header} className="md:w-25rem">
//                     {/* <Dialog header={props.todo.title} visible={visibleDetails} style={{ width: '50vw' }} onHide={() => { if (!visibleDetails) return; setVisibleDetails(false); }} >
//                         <p class="flex border-bottom-1 surface-border w-full" className="m-0" style={{ fontSize: 20 }}>

//                             {props.todo.tags.map((tag) => {
//                                 return <p>{tag}</p>
//                             })}
//                         </p>
//                     </Dialog> */}
//                     <Dialog header={props.todo.title} visible={visibleUpdate} style={{ width: '50vw' }} onHide={() => { if (!visibleUpdate) return; setVisibleUpdate(false); }} footer={footerContent}>
//                         <div class="field grid"  >
//                             <label for="name" class="col-12 mb-2 md:col-2 md:mb-0">name:</label>
//                             <div class="col-12 md:col-10">
//                                 <InputText ref={inputName} type='text' /><br />
//                             </div>
//                         </div>
//                         <div class="field grid"  >
//                             <label for="Description" class="col-12 mb-2 md:col-2 md:mb-0">Description:</label>
//                             <div class="col-12 md:col-10">
//                                 <InputText ref={inputDescription} type='text' /><br />

//                             </div>
//                         </div>
//                         <div class="field grid"  >
//                             <label for="TecherName" class="col-12 mb-2 md:col-2 md:mb-0">TecherName:</label>
//                             <div class="col-12 md:col-10">
//                                 <InputText ref={inputTecherName} type='text' /><br />
//                             </div>
//                         </div>
//                         <div class="field grid"  >
//                             <label for="Price" class="col-12 mb-2 md:col-2 md:mb-0">Price:</label>
//                             <div class="col-12 md:col-10">
//                                 <InputText ref={inputPrice} type='text' /><br />
//                             </div>
//                         </div>
//                         <div class="field grid"  >
//                             <label for="Domain" class="col-12 mb-2 md:col-2 md:mb-0">Domain:</label>
//                             <div class="col-12 md:col-10">
//                                 <InputText ref={inputDomain} type='text' /><br />
//                             </div>
//                         </div>
//                         <div class="field grid"  >
//                             <label for="MinClass" class="col-12 mb-2 md:col-2 md:mb-0">MinClass:</label>
//                             <div class="col-12 md:col-10">
//                                 <InputText ref={inputMinClass} type='text' /><br />
//                             </div>
//                         </div>
//                         <div class="field grid"  >
//                             <label for="MaxClass" class="col-12 mb-2 md:col-2 md:mb-0">Maxclass:</label>
//                             <div class="col-12 md:col-10">
//                                 <InputText ref={inputMaxClass} type='text' /><br />
//                             </div>
//                         </div>
//                     </Dialog>
//                     <Dialog header={props.todo.title} visible={visibleDelete} style={{ width: '50vw' }} onHide={() => { if (!visibleDelete) return; setVisibleDelete(false); }} footer={footerDelete}>
//                         <p className="m-0" style={{ fontSize: 20 }}>
//                             Are you sure that you want to remove this todo?
//                         </p>
//                     </Dialog>
//                 </Card>
//             </div>
//         </div>
//     )
// }