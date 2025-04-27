// import { useEffect, useState, useRef } from "react"
// import axios from 'axios'
// //import Todo from './todo'
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// export default function Courses() {
//     const [data, setData] = useState([]);
//     const [visibleCreate, setVisibleCreate] = useState(false);
//     const inputName = useRef(null)
//     const inputDescription = useRef(null)
//     const inputTecher = useRef(null)
//     const inputPrice = useRef(null)
//     const inputDomain = useRef(null)
//     const inputMinClass = useRef(null)
//     const inputMaxClass = useRef(null)
//     const add = async () => {
//         if (!inputName.current.value)
//             return alert("Name is required")
//         const teacherId = async () => {
//             try {
//                 const res = await axios.get('http://localhost:7000/api/course/' + { inputTecher },)
//                 if (res.status == 200) {
//                     const newCourse = {
//                         name: inputName.current.value,
//                         description: inputDescription.current.value,
//                         price: inputPrice.current.value,
//                         domain: inputDomain.current.value,
//                         minClass: inputMinClass.current.value,
//                         maxClass: inputMaxClass.current.value,
//                         teacherId: res.data
//                     }
//                     try {
//                         const res = await axios.post('http://localhost:7000/api/course', newCourse)
//                         setData(...data, res.data)
//                         setVisibleCreate(false)
//                     } catch (error) {

//                         console.log(error);
//                     }
//                 }
//             }
//             catch (error) {

//                 console.log(error);
//             }
//         }
//         teacherId()
//     }
//     const footerContent = (
//         <div>
//             <Button label="Close" icon="pi pi-times" onClick={() => setVisibleCreate(false)} className="p-button-text" />
//             <Button label="Save" icon="pi pi-check" onClick={() => add()} autoFocus />
//         </div>
//     );
//     const getCourses = async () => {

//         try {
//             const res = await axios.get('http://localhost:7000/api/course')
//             if (res.status === 200) {
//                 console.log(res.data);
//                 setData(res.data)
//             }
//         } catch (e) {
//             console.error(e)
//         }

//     }
//     return (<>
//         <h1>Courses</h1>
//         <Button icon="pi pi-plus" rounded aria-label="Filter" direction="up-left" style={{ right: -100, bottom: 50 }} tooltip="Add corse" onClick={() => setVisibleCreate(true)} />
//         <Dialog header="Create new todo" visible={visibleCreate} style={{ width: '50vw' }} onHide={() => { if (!visibleCreate) return; setVisibleCreate(false); }} footer={footerContent}>

//             <div class="field grid"  >
//                 <label for="name" class="col-12 mb-2 md:col-2 md:mb-0">name:</label>
//                 <div class="col-12 md:col-10">
//                     <InputText ref={inputName} type='text' /><br />
//                 </div>
//             </div>
//             <div class="field grid"  >
//                 <label for="Description" class="col-12 mb-2 md:col-2 md:mb-0">Description:</label>
//                 <div class="col-12 md:col-10">
//                     <InputText ref={inputDescription} type='text' /><br />

//                 </div>
//             </div>
//             <div class="field grid"  >
//                 <label for="TecherName" class="col-12 mb-2 md:col-2 md:mb-0">TecherName:</label>
//                 <div class="col-12 md:col-10">
//                     <InputText ref={inputTecher} type='text' /><br />
//                 </div>
//             </div>
//             <div class="field grid"  >
//                 <label for="Price" class="col-12 mb-2 md:col-2 md:mb-0">Price:</label>
//                 <div class="col-12 md:col-10">
//                     <InputText ref={inputPrice} type='text' /><br />
//                 </div>
//             </div>
//             <div class="field grid"  >
//                 <label for="Domain" class="col-12 mb-2 md:col-2 md:mb-0">Domain:</label>
//                 <div class="col-12 md:col-10">
//                     <InputText ref={inputDomain} type='text' /><br />
//                 </div>
//             </div>
//             <div class="field grid"  >
//                 <label for="MinClass" class="col-12 mb-2 md:col-2 md:mb-0">MinClass:</label>
//                 <div class="col-12 md:col-10">
//                     <InputText ref={inputMinClass} type='text' /><br />
//                 </div>
//             </div>
//             <div class="field grid"  >
//                 <label for="MaxClass" class="col-12 mb-2 md:col-2 md:mb-0">Maxclass:</label>
//                 <div class="col-12 md:col-10">
//                     <InputText ref={inputMaxClass} type='text' /><br />
//                 </div>
//             </div>

//         </Dialog>
//     </>)
// }

import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import Course from "./Course";
export default function Courses() {
    const [data, setData] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [visibleCreate, setVisibleCreate] = useState(false);
    const inputName = useRef(null);
    const inputDescription = useRef(null);
    const inputPrice = useRef(null);
    const inputDomain = useRef(null);
    const inputMinClass = useRef(null);
    const inputMaxClass = useRef(null);

    const add = async () => {
        if (!inputName.current.value) {
            return alert("Name is required");
        }

        if (!selectedTeacher) {
            return alert("Please select a teacher");
        }

        const newCourse = {
            name: inputName.current.value,
            description: inputDescription.current.value,
            price: inputPrice.current.value,
            domain: inputDomain.current.value,
            minClass: inputMinClass.current.value,
            maxClass: inputMaxClass.current.value,
            teacherId: selectedTeacher.id // Use the selected teacher's ID
        };

        try {
            const res = await axios.post('http://localhost:7000/api/course', newCourse);
            setData((prevData) => [...prevData, res.data]);
            setVisibleCreate(false);
            // Clear the selected teacher after successful creation
            setSelectedTeacher(null);
        } catch (error) {
            console.log(error);
        }
    };

    const footerContent = (
        <div>
            <Button label="Close" icon="pi pi-times" onClick={() => setVisibleCreate(false)} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={() => add()} autoFocus />
        </div>
    );

    const getCourses = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/course');
            if (res.status === 200) {
                setData(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const getTeachers = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/teachers');
            if (res.status === 200) {
                setTeachers(res.data); // Set the list of teachers
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getTeachers();
        getCourses();

    }, []);

    return (
        <>
            <h1>חוגי בית יעקב</h1>
            <Button icon="pi pi-plus" rounded aria-label="Filter" direction="up-left" style={{ right: -100, bottom: 50 }} tooltip="Add course" onClick={() => setVisibleCreate(true)} />
            <Dialog header="Create new course" visible={visibleCreate} style={{ width: '50vw' }} onHide={() => setVisibleCreate(false)} footer={footerContent}>
                <div className="field grid">
                    <label htmlFor="name" className="col-12 mb-2 md:col-2 md:mb-0">Name:</label>
                    <div className="col-12 md:col-10">
                        <InputText ref={inputName} type='text' /><br />
                    </div>
                </div>
                <div className="field grid">
                    <label htmlFor="Description" className="col-12 mb-2 md:col-2 md:mb-0">Description:</label>
                    <div className="col-12 md:col-10">
                        <InputText ref={inputDescription} type='text' /><br />
                    </div>
                </div>
                <div className="field grid">
                    <label htmlFor="TecherName" className="col-12 mb-2 md:col-2 md:mb-0">Teacher:</label>
                    <div className="col-12 md:col-10">
                        <Dropdown
                            value={selectedTeacher}
                            options={teachers}
                            onChange={(e) => setSelectedTeacher(e.value)}
                            optionLabel="userId.name"
                            placeholder="Select a teacher"
                        /><br />
                    </div>
                </div>
                <div className="field grid">
                    <label htmlFor="Price" className="col-12 mb-2 md:col-2 md:mb-0">Price:</label>
                    <div className="col-12 md:col-10">
                        <InputText ref={inputPrice} type='text' /><br />
                    </div>
                </div>
                <div className="field grid">
                    <label htmlFor="Domain" className="col-12 mb-2 md:col-2 md:mb-0">Domain:</label>
                    <div className="col-12 md:col-10">
                        <InputText ref={inputDomain} type='text' /><br />
                    </div>
                </div>
                <div className="field grid">
                    <label htmlFor="MinClass" className="col-12 mb-2 md:col-2 md:mb-0">Min Class:</label>
                    <div className="col-12 md:col-10">
                        <InputText ref={inputMinClass} type='text' /><br />
                    </div>
                </div>
                <div className="field grid">
                    <label htmlFor="MaxClass" className="col-12 mb-2 md:col-2 md:mb-0">Max Class:</label>
                    <div className="col-12 md:col-10">
                        <InputText ref={inputMaxClass} type='text' /><br />
                    </div>
                </div>
            </Dialog>

            <div class="grid">
                {data.map((item) => { return <Course entity={item} type={"manager"} /> })}
                    </div>
        </>
    );
}