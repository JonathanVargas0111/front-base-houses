/** Componente reutilizable para Crear y Actualizar un Usuario */

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useGetDepartmentsQuery, useLazyGetCitiesByDepartamentQuery } from "../../features/api/apiColombiaSlice"
import { useState } from "react"

export default function HouseForm({ props }) {
    const { handleSubmit, handleChangeAvatar, house } = props

    const { data: departments, isLoading, isError, error } = useGetDepartmentsQuery()

    const [selectedDepartment, setSelectedDepartment] = useState(5)
    const [getCities] = useLazyGetCitiesByDepartamentQuery()
    const [cities, setCities] = useState([])
    const [parking, setParking] = useState(false)

    const handleChangeDepartment = async (e) => {
        setCities([]) // Limpio la lista de ciudades 
        setSelectedDepartment(e.target.value)
        if (e.target.value) {
            console.log(e.target.value);
            const response = await getCities(e.target.value)
            setCities(response.data) // Lleno la lista de ciudades       
        }
    }

    const handleChangeDepartmentShadCN = async (e) => {
        setCities([]) // Limpio la lista de ciudades 
        setSelectedDepartment(e)
        if (e) {
            const id = e.split("-")[0]
            console.log(id);
            const response = await getCities(id)
            setCities(response.data) // Lleno la lista de ciudades       
        }
    }

    if (isLoading) return <div role="status" className='flex justify-center'>
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
    </div>;
    else if (isError) return (<div>Error: {error.message} </div>)

    return (
        <div className="w-full  rounded-lg bg-black ">
            <form onSubmit={handleSubmit} className="shadow-md pt-6 pb-10 mb-4 px-10">
                <div className="grid gap-4 items-end sm:grid-cols-2 lg:grid-cols-3">


                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="address" >Addres</Label>
                        <Input type="text" id="address" required name="address" placeholder="Address" defaultValue={house?.address} />
                    </div>
                    {/* <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Department</label>
                    <select name="department" required
                        onChange={handleChangeDepartment}
                        defaultValue={selectedDepartment} // Seteando a Bogota como predeterminado
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                        <option value="">Seleccionar un Departmento</option>
                        {departments.map(department => (
                            <option key={department.id} value={`${department.id}-${department.name}`}    
                            >{department.name}</option>
                        ))}
                    </select>
                </div> */}
                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="address" >Department</Label>
                        <Select
                            name="department"
                            onValueChange={handleChangeDepartmentShadCN}
                            required
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Departaments</SelectLabel>
                                    {
                                        departments?.map((department) => (
                                            <SelectItem key={department.id} value={`${department.id}-${department.name}`}>{department.name}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* {
                    cities.length == 0 ? null : (
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">City</label>
                            <select name="city" required
                                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                <option value="">Seleccione la ciudad</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.name}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                    )
                } */}
                    {
                        cities.length == 0 ? null : (
                            <div className="mb-4">
                                <Label className="block text-gray-300 font-bold mb-2" htmlFor="address" >City</Label>

                                <Select name="city" required>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a city" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Departaments</SelectLabel>
                                            {
                                                cities?.map((city) => (
                                                    <SelectItem key={city.id} value={city.name}>{city.name}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )
                    }
                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="size" >Size</Label>
                        <Input type="number" id="size" required name="size" placeholder="Size" defaultValue={house?.size} />
                    </div>

                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="type_house" >¿What type is it?</Label>
                        <Select name="type_house" required >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="¿What type is it?" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Type</SelectLabel>
                                    <SelectItem value="apartment">Apartment</SelectItem>
                                    <SelectItem value="house">House</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="zip_code" >Zip Code</Label>
                        <Input type="text" id="zip_code" required name="zip_code" placeholder="Zip Code" defaultValue={house?.zip_code} />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="rooms" >Rooms</Label>
                        <Input type="number" id="rooms" required name="rooms" placeholder="Rooms" defaultValue={house?.rooms} />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="bathrooms" >Bathrooms</Label>
                        <Input type="number" id="bathrooms" required name="bathrooms" placeholder="Bathrooms" defaultValue={house?.bathrooms} />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="address" >Has parking?</Label>
                        <Select name="parking" required >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Parking?" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Parking</SelectLabel>
                                    <SelectItem value="true">SI</SelectItem>
                                    <SelectItem value="false">NO</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="price" >Price</Label>
                        <Input type="number" id="price" required name="price" placeholder="Price" defaultValue={house?.price} />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-gray-300 font-bold mb-2" htmlFor="code" >Code</Label>
                        <Input type="text" id="code" required name="code" placeholder="Code" defaultValue={house?.code} />
                    </div>

                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="avatar" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input onChange={handleChangeAvatar} id="avatar" name="avatar" accept="image/png, image/jpeg" type="file" className="hidden" />
                        </label>
                    </div>

                    <div className="flex justify-center md:col-span-2 lg:col-span-3">
                        <Button variant="secondary" className="mt-4 w-full max-w-24">Save</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}