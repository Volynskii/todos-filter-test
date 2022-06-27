import dynamic from 'next/dynamic'
import { baseUrl,fetchApi } from "../../utils/fetchApi";
import React,{useState} from 'react';

const FormEdit = dynamic(
    () => import('../../components/form-edit'),
    { ssr: true }
);

const SingleTodo = dynamic(
    () => import('../../components/single-todo'),
    { ssr: false }
);

export default function Post ({ data,id })  {

    const [isEdited,setIsEdited] = useState(false);
    const onEdit = () => {
      setIsEdited((prev) => !prev)
    };

    return (
        <>
            {isEdited ? <FormEdit data={data} id={id} onEdit={onEdit}/>
            : <SingleTodo data={data} id={id} onEdit={onEdit}/>}
            </>
    )
}


export async function getServerSideProps({ params: { id } }) {

     const data = await fetchApi(`${baseUrl}/todos/${id}`);

    return {
        props: {
            data: data,
            id: id
        },
    };
}
