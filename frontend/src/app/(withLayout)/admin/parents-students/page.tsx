"use client";
import { ExportIcon } from '@/components/icons/export-icon';
import ParentTable from '@/components/parent/parentTable';
import StudentTable from '@/components/parent/studentTable';
import { Button, Input } from '@nextui-org/react';
import React from 'react';


const ParentsStudentsPage: React.FC = () => {


    return (
        <div className="flex flex-wrap items-center">
            <div className='sm:w-full xl:w-1/2'>
                <div className='m-2'>
                    <ParentTable/>
                   
                </div>

            </div>

            <div className='sm:w-full xl:w-1/2'>
                <div className='m-2'>
                    <StudentTable/>
                </div>

            </div>
        </div>
    );
};

export default ParentsStudentsPage;