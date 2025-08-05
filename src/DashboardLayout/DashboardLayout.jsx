
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../ReusableComponents/Header'



const DashboardLayout = ({ children }) => {
    return (
        <div className='w-full flex fixed h-screen '>
            {/* <Sidebar/> */}
            
            <div className='w-full  flex-col overflow-y-scroll pb-6'>
                <div className='flex flex-col items-start  '>
                    <div className='w-full  bg-white'>
                       <Header/>
                        <Outlet>
                            {children}
                        </Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;





