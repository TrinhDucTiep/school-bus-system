"use client";
import CustomSkeleton from '@/components/custom-skeleton';
import { SearchIcon } from '@/components/icons/searchicon';
import { Input } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

const MonitoringPage: React.FC = () => {
    const Map = useMemo(() => dynamic(
        () => import('@/components/map/Map'),
        {
            loading: () => <CustomSkeleton />,
            ssr: false
        }
    ), [])

    return (
        <div className='flex justify-between'>
            <div>
                <Input
                    startContent={<SearchIcon />}
                    isClearable
                    className="w-full m-2"
                    classNames={{
                        input: "w-full",
                        mainWrapper: "w-full",
                    }}
                    placeholder="Nhập địa điểm..."
                />
            </div>
            <div
                className="w-2/3"
            >
                <Map />
            </div >
        </div>

    );
};

export default MonitoringPage;