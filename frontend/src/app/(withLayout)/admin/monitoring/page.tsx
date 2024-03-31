"use client";
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

const MonitoringPage: React.FC = () => {
    const Map = useMemo(() => dynamic(
        () => import('@/components/map/Map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    return (
        <div>
            <Map />
        </div>
    );
};

export default MonitoringPage;