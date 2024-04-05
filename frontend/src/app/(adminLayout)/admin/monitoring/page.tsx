"use client";
import CustomSkeleton from '@/components/custom-skeleton';
import { SearchIcon } from '@/components/icons/searchicon';
import { Autocomplete, AutocompleteItem, Input } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { useGetAutoComplete } from '@/services/mapService';
import _ from 'lodash';

const MonitoringPage: React.FC = () => {

    const [autoCompleteQuery, setAutoCompleteQuery] = React.useState('');
    let autoCompleteParams: IAutoCompleteParams = {
        text: autoCompleteQuery,
        boundary: {
            country: 'VNM'
        }
    }
    const debounceSetAutoCompleteQuery = _.debounce((value: string) => setAutoCompleteQuery(value), 500);
    const { data: autoCompleteData, isLoading: autoCompleteLoading, error: autoCompleteError } = useGetAutoComplete(autoCompleteParams);

    const Map = useMemo(() => dynamic(
        () => import('@/components/map/Map'),
        {
            loading: () => <CustomSkeleton />,
            ssr: false
        }
    ), [])

    console.log(autoCompleteData);
    console.log(autoCompleteData?.features.map((item) => item.properties) || [])

    return (
        <div className='flex justify-between'>
            <div className=''>
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

                <Autocomplete
                    label="Favorite Animal"
                    placeholder="Nhập địa điểm"
                    startContent={<SearchIcon />}
                    // defaultItems={autoCompleteData?.features.map((item) => item.properties) || []}
                    items={autoCompleteData?.features.map((item) => item.properties) || []}
                    labelPlacement="outside"
                    className="max-w-xs"
                    disableSelectorIconRotation
                    selectorIcon={false}
                    onInputChange={(value) => debounceSetAutoCompleteQuery(value)}
                // onInputChange={(value) => setAutoCompleteQuery(value)}
                >
                    {(item) =>
                        <AutocompleteItem
                            key={item.id}
                            value={item.label}
                        >
                            {/* content: street, county, region, country*/}
                            {/* {item.street + ', ' + item.county + ', ' + item.region + ', ' + item.country} */}
                            {`${item.street ?? ''}, ${item.county ?? ''}, ${item.region ?? ''}, ${item.country ?? ''}`}
                        </AutocompleteItem>
                    }
                </Autocomplete>
            </div>
            <div
                className="w-3/4"
            >
                <Map />
            </div >
        </div>

    );
};

export default MonitoringPage;