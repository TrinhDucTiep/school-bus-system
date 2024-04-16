"use client";
import CustomSkeleton from '@/components/custom-skeleton';
import { SearchIcon } from '@/components/icons/searchicon';
import { Autocomplete, AutocompleteItem, Button, Input, RadioGroup, Switch, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { useGetAutoComplete, useGetSearch, useGetDirections } from '@/services/mapService';
import _ from 'lodash';



const ClientRegistration: React.FC = () => {

    // get auto complete
    const [autoCompleteQuery, setAutoCompleteQuery] = React.useState('');
    let autoCompleteParams: IAutoCompleteParams = {
        text: autoCompleteQuery,
        boundary: {
            country: 'VNM'
        }
    }
    const debounceSetAutoCompleteQuery = _.debounce((value: string) => setAutoCompleteQuery(value), 500);
    const { data: autoCompleteData, isLoading: autoCompleteLoading, error: autoCompleteError } = useGetAutoComplete(autoCompleteParams);
    const [selectedAutoCompleteData, setSelectedAutoCompleteData] = React.useState<IFeature | null>(null);

    // get directions
    const useGetDirectionsParams: IDirectionsParams = {
        coordinates: [[105.804817, 21.028511], [105.803577, 21.03422], [105.80325113694303, 21.03586062789824]]
    }
    const { data: directionsGetResponse, isLoading: directionsLoading, error: directionsError } = useGetDirections(useGetDirectionsParams);

    const Map = useMemo(() => dynamic(
        () => import('@/components/map/MapClient'),
        {
            loading: () => <CustomSkeleton />,
            ssr: false
        }
    ), [])

    // enable click point to map
    const [enableClickMap, setEnableClickMap] = React.useState<boolean>(false);

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between w-auto'>
                <div className='w-2/5 mr-4'>
                    <Autocomplete
                        placeholder="Nhập địa điểm"
                        startContent={<SearchIcon />}
                        items={autoCompleteData?.features.map((item) => item.properties) || []}
                        className="m-2 w-full"
                        selectorIcon={false}
                        onInputChange={(value) => debounceSetAutoCompleteQuery(value)}
                        onSelectionChange={
                            (selectedId) => {
                                const selectedItem = autoCompleteData?.features.find((item) => item.properties.id === selectedId);
                                console.log(selectedItem);
                                setSelectedAutoCompleteData(selectedItem ?? null);
                            }
                        }
                    >
                        {(item) =>
                            <AutocompleteItem
                                key={item.id}
                                textValue={`${item.name ?? ''}, ${item.county ?? ''}, ${item.region ?? ''}, ${item.country ?? ''}`}
                                value={`${item.name ?? ''}, ${item.county ?? ''}, ${item.region ?? ''}, ${item.country ?? ''}`}
                            >
                                <div className="flex gap-2 items-center">
                                    <div className='flex-shrink-0'>
                                        <LocationIcon />
                                    </div>

                                    <div className='flex flex-col'>
                                        {`${item.name ?? ''}, ${item.county ?? ''}, ${item.region ?? ''}, ${item.country ?? ''}`}
                                    </div>
                                </div>

                            </AutocompleteItem>
                        }
                    </Autocomplete>

                    <div className='flex justify-between'>
                        <div></div>
                        {/* <Switch
                            className='mx-2'
                            isSelected={manipulateIsToSchool}
                            color='primary'
                            onClick={() => setManipulateIsToSchool(!manipulateIsToSchool)}
                        >
                            {manipulateIsToSchool ? 'Đi học' : 'Về nhà'}
                        </Switch> */}

                        {/* <Input
                            placeholder="Ngày"
                            type='date'
                            className='m-2 w-1/3'
                            variant='bordered'
                            size='sm'
                            // onChange={(e) => setManipulateDate(e.target.value)}
                            // defaultValue={convertStringInstantToDate(manipulateDate)}
                        /> */}

                        <Button
                            color={enableClickMap ? 'primary' : 'default'}
                            onClick={() => setEnableClickMap(!enableClickMap)}
                        >
                            Chấm điểm
                        </Button>
                    </div>
                </div>

                {/* map */}
                <div
                    className="w-3/5 z-50"
                >
                    <Map
                        features={selectedAutoCompleteData ? [selectedAutoCompleteData] : []}
                        directionsGetResponse={directionsGetResponse}
                        enableClickMap={enableClickMap}
                    />
                </div >
            </div>
        </div>
    );
};

export default ClientRegistration;