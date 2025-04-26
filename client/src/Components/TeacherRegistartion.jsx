import { useForm } from "react-hook-form"
import { InputText } from 'primereact/inputtext';
import axios from "axios";
export default function StudentRegistration(props) {
    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        try {
            const res = await axios.post('http://localhost:7000/api/auth/register', data)
            if (res.status == 400)
                console.log(res.data);
            if (res.status == 201)
                console.log(data);
            props.closeDialog()
            //  setUsersData(res.data)
            // setVisibleCreate(false)
        } catch (error) {

            console.log(error);
        }
    }
    //userName, password, name, email, phone
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div class="field grid">
                <label for="userName" class="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10" >שם משתמש:</label>
                <div class="col">
                    <InputText {...register("userName", { required: true, maxLength: 20 })} required />
                </div>
            </div>
            <div class="field grid">
                <label for="name" class="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">שם:</label>
                <div class="col">
                    <InputText {...register("name", { pattern: /^[A-Za-z]+$/i })} required />
                </div>
            </div>
            <div class="field grid">
                <label for="password" class="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">סיסמא:</label>
                <div class="col">
                    <InputText type="password"{...register("password", {
                        // pattern: {
                        //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        //     message: "Invalid email address"
                        // }
                    })} required />
                </div>
            </div>
            <div class="field grid">
                <label for="email" class="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">אימייל:</label>
                <div class="col">
                    <InputText type="email "{...register("email", { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} required />
                </div>
            </div>
            <div class="field grid">
                <label for="phone" class="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">פלאפון:</label>
                <div class="col">
                    <InputText  {...register("phone", { pattern: /^(?:\+?\d{1,3})?[-.\s]?(\(?\d{3}\)?)[-.\s]?(\d{3})[-.\s]?(\d{4})$/ })} required />

                </div>
            </div>
            <input type="submit" />
        </form>
    )
}