import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import Course from "./Course";
import { Toast } from "primereact/toast"; // For notifications
import { Slider } from "primereact/slider"; // For range slider
import { useSelector } from 'react-redux';
import "./Courses.css";

export default function Courses() {
    const [data, setData] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [categories, setCategories] = useState([]); // State to hold unique categories
    const [selectedCategory, setSelectedCategory] = useState(null); // Selected category for filtering
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState(''); // Category filter (previous input text field)
    const [priceRange, setPriceRange] = useState([0, 2000]); // Price range filter
    const [classRange, setClassRange] = useState([1, 8]); // Class range filter
    const classLabels = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח']; // Hebrew grade labels
    const inputName = useRef(null);
    const inputDescription = useRef(null);
    const inputPrice = useRef(null);
    const inputCategory = useRef(null);
    const inputMinClass = useRef(null);
    const inputMaxClass = useRef(null);
    const toast = useRef(null); // For notifications
    const { user, token } = useSelector((state) => state.token);

    // Add new course
    const add = async () => {
        if (!inputName.current.value.trim()) {
            toast.current.show({
                severity: "error",
                summary: "Validation Error",
                detail: "Course name is required.",
                life: 3000,
            });
            return;
        }

        if (!selectedTeacher) {
            toast.current.show({
                severity: "error",
                summary: "Validation Error",
                detail: "Please select a teacher.",
                life: 3000,
            });
            return;
        }

        const newCourse = {
            name: inputName.current.value,
            description: inputDescription.current.value,
            price: inputPrice.current.value,
            category: inputCategory.current.value,
            minClass: inputMinClass.current.value,
            maxClass: inputMaxClass.current.value,
            teacherId: selectedTeacher.id // Use the selected teacher's ID
        };

        try {
            const res = await axios.post('http://localhost:7000/api/course', newCourse, { headers: { Authorization: `Bearer ${token}` } });
            setData((prevData) => [...prevData, res.data]);
            setVisibleCreate(false);
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

    // Fetch all courses with optional filters
    const getCourses = async (filters = {}) => {
        try {
            const params = {
                name: filters.name || undefined,
                category: filters.category || undefined,
                minPrice: filters.minPrice || undefined,
                maxPrice: filters.maxPrice || undefined,
            };

            const res = await axios.get('http://localhost:7000/api/course', {
                params,
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.status === 200) {
                setData(res.data);
                extractUniqueCategories(res.data);
            }
        } catch (e) {
            console.error(e);
            setData([]);
        }
    };

    // Extract unique categories from courses
    const extractUniqueCategories = (courses) => {
        const uniqueCategories = [...new Set(courses.map((course) => course.category).filter(Boolean))];
        setCategories(uniqueCategories.map((category) => ({ label: category, value: category })));
    };

    // Fetch all teachers
    const getTeachers = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/teachers',
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.status === 200) {
                setTeachers(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Reset all filters to default and fetch all courses
    const resetFilters = () => {
        setCategoryFilter('');
        setSelectedCategory(null);
        setPriceRange([0, 2000]);
        setClassRange([1, 8]);
        getCourses(); // Fetch all courses without filters
    };

    // Fetch data on component load
    useEffect(() => {
        getTeachers();
        getCourses(); // Fetch all courses by default
    }, []);

    return (
        <div className="courses-container" style={{ display: 'flex' }}>
            {/* Filter Section */}
            <div style={{ width: '20%', padding: '10px', borderRight: '1px solid #ddd', position: 'fixed' }}>
                <br /><br />
                <h2>חיפוש</h2>
                <div style={{ marginBottom: '20px' }}>
                    <InputText
                        placeholder="חפש לפי שם החוג"
                        value={categoryFilter}
                        style={{ width: '100%' }}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>בחר קטגוריה</label>
                    <Dropdown
                        value={selectedCategory}
                        options={categories}
                        onChange={(e) => setSelectedCategory(e.value)}
                        placeholder="בחר קטגוריה"
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>טווח מחירים</label>
                    <Slider
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.value)}
                        range
                        min={0}
                        max={2000}
                        style={{ width: '100%' }}
                    />
                    <div style={{ marginTop: '10px', fontSize: '15px', fontWeight: 'bold' }}>{`החל מ ${priceRange[0]} עד ${priceRange[1]}`}</div>
                </div>
                <Button label="חפש" icon="pi pi-filter"  style={{ marginTop: '10px', width: '100%' }} onClick={() => getCourses({ name: categoryFilter, category: selectedCategory, minPrice: priceRange[0], maxPrice: priceRange[1] })} />
                <br />
                <Button label="אפס סינונים" icon="pi pi-refresh" onClick={resetFilters}  className="restart-button"   />
            </div>

            {/* Main Content Section */}
            <div className="courses-grid">
                <h1>חוגי בית יעקב</h1>
                {user.role==="Manager"&&(<Button tooltip="הוסף" rounded aria-label="Filter" icon="pi pi-plus" onClick={() => setVisibleCreate(true)}></Button>)}
                <Dialog header="Create new course" visible={visibleCreate} style={{ width: '50vw' }} onHide={() => setVisibleCreate(false)} footer={footerContent}>
                    <div className="field grid">
                        <label htmlFor="name" className="col-12 mb-2 md:col-2 md:mb-0">שם:</label>
                        <div className="col-12 md:col-10">
                            <InputText ref={inputName} type='text' /><br />
                        </div>
                    </div>
                    <div className="field grid">
                        <label htmlFor="Description" className="col-12 mb-2 md:col-2 md:mb-0">תאור:</label>
                        <div className="col-12 md:col-10">
                            <InputText ref={inputDescription} type='text' /><br />
                        </div>
                    </div>
                    <div className="field grid">
                        <label htmlFor="TecherName" className="col-12 mb-2 md:col-2 md:mb-0">מורה:</label>
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
                        <label htmlFor="Price" className="col-12 mb-2 md:col-2 md:mb-0">מחיר:</label>
                        <div className="col-12 md:col-10">
                            <InputText ref={inputPrice} type='text' /><br />
                        </div>
                    </div>
                    <div className="field grid">
                        <label htmlFor="Category" className="col-12 mb-2 md:col-2 md:mb-0">תחום:</label>
                        <div className="col-12 md:col-10">
                            <InputText ref={inputCategory} type='text' /><br />
                        </div>
                    </div>
                    <div className="field grid">
                        <label htmlFor="MinClass" className="col-12 mb-2 md:col-2 md:mb-0">מכיתה:</label>
                        <div className="col-12 md:col-10">
                            <InputText ref={inputMinClass} type='text' /><br />
                        </div>
                    </div>
                    <div className="field grid">
                        <label htmlFor="MaxClass" className="col-12 mb-2 md:col-2 md:mb-0">עד כיתה:</label>
                        <div className="col-12 md:col-10">
                            <InputText ref={inputMaxClass} type='text' /><br />
                        </div>
                    </div>
                </Dialog>

                <div className="grid">
                    {data.map((item) => (
                        <Course
                            key={item.id}
                            course={item}
                            teachers={teachers}
                            setCourses={setData}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}