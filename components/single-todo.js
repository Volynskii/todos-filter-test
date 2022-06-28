import React from 'react';
import {useRouter} from "next/router";
import {deleteProduct} from "../utils/fetchApi";
import moment from "moment";
import 'moment/locale/ru';
moment.locale('ru');


const SingleTodo = ({data,id, onEdit}) => {

    const {title, createdAt, priority, tags, description} = data;
    const router = useRouter();

    const onRemoveItem = async (id) => {
            e.preventDefault();
            try {
                await deleteProduct(id);
                router.push({ pathname: `http://localhost:3000` });
            } catch (e) {
                console.log(e.message)
            }
    };

    return (
        <>
            <div className="navigation">
                <button onClick={() =>  router.push({ pathname: `http://localhost:3000` })} className="back-button">Назад</button>
                <button onClick={onEdit} className="edit-button">Редактировать</button>
                <button onClick={() => onRemoveItem(id)} className="remove-button">Удалить</button>
            </div>
            <div className="todo">
                <div>
                    <h2>НАЗВАНИЕ ЗАДАЧИ</h2>
                    <span>{title}</span>
                </div>
                <div>
                    <h2>ДАТА СОЗДАНИЯ</h2>
                    <span>{moment(createdAt).format(' Do MMMM YYYY, H:mm ')}</span>
                </div>
                <div>
                    <h2>ПРИОРИТЕТ</h2>
                    <span>{priority}</span>
                </div>
                <div>
                    <h2>ОТМЕТКИ</h2>
                    <span>{tags.join(', ')}</span>
                </div>
                <div>
                    <h2>ОПИСАНИЕ</h2>
                    <span>{description || '...'}</span>
                </div>
            </div>
        </>
    );
};

export default SingleTodo;
