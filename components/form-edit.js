import React,{ useState } from 'react';
import {updateProduct} from "../utils/fetchApi";
import Multiselect from "multiselect-react-dropdown";
import {useRouter} from "next/router";

const FormEdit = ({data, id, onEdit}) => {

    const router = useRouter();

    const options = ['research','design', 'development'];
    const { title, tags, priority, description } = data;

    const initialValues = {
        title: title,
        tags: tags,
        priority: priority,
        description: description
    };

    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(id, values);
            router.reload();
        } catch (e) {
        console.log(e.message)
        }
    };
    return (
        <>
            <div className="navigation" >
                <button onClick={onEdit} className="back-button">Назад</button>
            </div>
            <form onSubmit={onSubmit}>
                <div className="edit">
                    <label>НАЗВАНИЕ ЗАДАЧИ</label>
                    <input className="input-text" type="text" name="title" value={values.title} onChange={handleInputChange}/>
                    <h2>ПРИОРИТЕТ</h2>
                    <select defaultValue={values.priority} onChange={handleInputChange} name="priority">
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                    </select>
                    <h2>ОТМЕТКИ</h2>
                    <Multiselect
                        isObject={false}
                        onRemove={(event) => {
                            setValues({
                                ...values,
                                ['tags']: event,
                            });
                        }}
                        onSelect={(event) => {
                            const updatedState = Array.from(new Set([...values.tags, ...event].sort()));
                            setValues({
                                ...values,
                                ['tags']: updatedState,
                            });
                        }}
                        options={options}
                        selectedValues={tags}
                    />
                    <h2>ОПИСАНИЕ</h2>
                    <textarea placeholder={'...'} name={'description'} onChange={handleInputChange} value={values.description}/>
                    <input type="submit" value="Сохранить"/>
                </div>
            </form>
        </>
    )
};

export default FormEdit;
