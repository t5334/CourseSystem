
import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import Course from "./Course";
import { Toast } from "primereact/toast"; // For notifications
import { Slider } from "primereact/slider"; // For range slider
import { useDispatch, useSelector } from 'react-redux';
import "./Courses.css";

export default function Courses() {
    const [data, setData] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [categories, setCategories] = useState([]); // State to hold unique categories
    const [selectedCategory, setSelectedCategory] = useState(null); // Selected category for filtering
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState(''); // Category filter (previous input text field)
    const [priceRange, setPriceRange] = useState([0, 1000]); // Price range filter
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
            const params = {
                name: categoryFilter || undefined, // Search filter by category name
                category: selectedCategory || undefined, // Filter by selected category dropdown
                minPrice: priceRange[0],
                maxPrice: priceRange[1],
                minClass: classRange[0], // Send numeric values for min class
                maxClass: classRange[1], // Send numeric values for max class
            };

            const res = await axios.get('http://localhost:7000/api/course', {
                params,
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                setData(res.data);
                extractUniqueCategories(res.data); // Extract unique categories dynamically
            }
        } catch (e) {
            console.error(e);
        }
    };

    const getTeachers = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/teachers',
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.status === 200) {
                setTeachers(res.data); // Set the list of teachers
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Extract unique categories from fetched courses
    const extractUniqueCategories = (courses) => {
        const uniqueCategories = [...new Set(courses.map((course) => course.category).filter(Boolean))];
        setCategories(uniqueCategories.map((category) => ({ label: category, value: category })));
    };

    useEffect(() => {
        getTeachers();
        getCourses();
    }, []);

    return (
        <div className="courses-container" style={{ display: 'flex' }}>
            {/* Filter Section */}
            <div style={{ width: '20%', padding: '10px', borderRight: '1px solid #ddd', position: 'fixed' }}>
                <h2>סינונים</h2>
                <div style={{ marginBottom: '20px' }}>
                    <InputText
                        placeholder="חפש לפי תחום"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    />
                </div>
                {/* Category Dropdown Filter */}
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
                        max={1000}
                        style={{ width: '100%' }}
                    />
                    <div style={{ marginTop: '10px', fontSize: '15px', fontWeight: 'bold' }}>{`From ${priceRange[0]} to ${priceRange[1]}`}</div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>טווח כיתות</label>
                    <Slider
                        value={classRange}
                        onChange={(e) => setClassRange(e.value)}
                        range
                        min={1}
                        max={8}
                        step={1}
                        style={{ width: '100%' }}
                    />
                    <div style={{ marginTop: '10px', fontSize: '18px', fontWeight: 'bold' }}>
                        {`מ ${classLabels[classRange[0] - 1]} עד ${classLabels[classRange[1] - 1]}`}
                    </div>
                </div>
                <Button label="Apply Filters" icon="pi pi-filter" onClick={getCourses} />
            </div>

            {/* Main Content Section */}
            <div className="courses-grid">
                <h1>חוגי בית יעקב</h1>
                {user.role === 'Manager' && (
                    <Button tooltip="הוסף" rounded aria-label="Filter" icon="pi pi-plus" onClick={() => setVisibleCreate(true)}></Button>
                )}

                <Dialog header="Create new course" visible={visibleCreate} style={{ width: '50vw' }} onHide={() => setVisibleCreate(false)} footer={footerContent}>
                    {/* Add Course Form */}
                    {/* The rest of the "Create Course" dialog remains unchanged */}
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