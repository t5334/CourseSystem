import { useForm } from "react-hook-form"
import { InputText } from 'primereact/inputtext';
export default function Register() {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)
    //userName, password, name, email, phone
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div class="field grid">
                <label for="userName" class="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10" >userName</label>
                <div class="col">
                    <InputText {...register("userName", { required: true, maxLength: 20 })} />
                </div>
            </div>
            <div class="field grid">
            <label for="name" class="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">name</label>   
                         <div class="col">
                    <InputText {...register("name", { pattern: /^[A-Za-z]+$/i })} />
                </div>
            </div>
            <div class="field grid">
            <label for="password" class="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">password</label>
                            <div class="col">
                    <InputText type="password"{...register("password",  {pattern: { 
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                            message: "Invalid email address" 
                        }}) }/>
                </div>
            </div>
            <div class="field grid">
            <label for="email" class="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">email</label>
                            <div class="col">
                    <InputText type="email "{...register("email", { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} />
                </div>
            </div>
            <div class="field grid">
            <label for="phone" class="col-12 mb-2 md:col-2 md:mb-0 text-xl w-10">phone</label>
                            <div class="col">
                    <InputText  {...register("phone", { pattern: /^(?:\+?\d{1,3})?[-.\s]?(\(?\d{3}\)?)[-.\s]?(\d{3})[-.\s]?(\d{4})$/ })} />

                </div>
            </div>
            <input type="submit" />
        </form>
    )
}