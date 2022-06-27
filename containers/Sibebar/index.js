import React,{useMemo} from 'react';
import dynamic from 'next/dynamic';

const Form = dynamic(() => import('../../components/form'));


const sidebars = {
    formFilter: <Form/>
};

const SideBarComponent = ({sidebar,children}) => {

    const Sidebar = useMemo(() => sidebars[sidebar], [sidebar]);
    // "sidebar" prop was passed renders sidebar, otherwise no
    return (
        <>
            {sidebar ? (
                <main>
                    <div className="sibebar-container">
                        {Sidebar}
                        {children}
                    </div>
                </main>
            ) : (
                <main>
                    {children}
                </main>
            )}

        </>
    )
};

export default SideBarComponent;
