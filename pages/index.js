import '../styles/Home.module.scss'
import {baseUrl, fetchApi} from "../utils/fetchApi";
import moment from "moment";
import 'moment/locale/ru';
moment.locale('ru');
import { useEffect, useState, useRef } from 'react';
import {useRouter} from "next/router";
import Link from 'next/link'

export default function Home({ todos, totalPages }) {

    const router = useRouter();
    const { query } = router;

    const sort = query.sort || '';
    const priority = query.priority || '';
    const tags = query.tags || '';
    const limit = 15;


    const [allTodos, setAllTodos] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [lastElement, setLastElement] = useState(null);

    // if todos come from getServerSideProps, update page and empty state
    useEffect(() => {
        setAllTodos(todos)
        setPageNum(2)
    },[todos]);

    // if viewport intersect bottom component - load more data
    let observer = useRef();
    useEffect(() => {
        observer.current = new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting && pageNum <= totalPages + 1) {
                    setPageNum((no) => no + 1);
                    loadMore()
            }
        })
    }, [lastElement]);

    const loadMore = async () => {
        let response = await fetchApi(`${baseUrl}?priority=${priority}&tags=${tags}&sort=${sort}&page=${pageNum}&limit=${limit}`);
        let all = new Set([...allTodos, ...response.products]);
        setAllTodos([...all]);
    };

    // sets ref to bottom element
    useEffect(() => {
        const currentElement = lastElement;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement,todos]);


    return (
        <>
                <div className="catalog">
                    <button>Добавить задачу</button>
                    {allTodos.map(({_id, title, createdAt, priority, tags},index) => {
                        return (
                            <div  ref={setLastElement} key={_id} className="catalog__item">
                                <Link href={`/todos/${_id}`}>
                                <h2>{title}</h2>
                                </Link>

                                <div className="date-block">
                                    <span>создано: {moment(createdAt).fromNow()}</span>
                                    <span>Приоритет: {priority}</span>
                                    <span>Отметки: {tags.join(', ')}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
        </>
    )
}


export async function getServerSideProps({query}) {
    const sort = query.sort || '';
    const priority = query.priority || '';
    const tags = query.tags || '';
    const page = query.page || 1;
    const limit = 15;
    const data = await fetchApi(`${baseUrl}?priority=${priority}&tags=${tags}&sort=${sort}&page=${page}&limit=${limit}`);

    return {
        props: {
            sidebar: 'formFilter',
            todos: data.products,
            totalItems: data.nbHits,
            totalPages: data.totalPages
        },
    };
}


