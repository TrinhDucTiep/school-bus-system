"use client";
import CustomSkeleton from '@/components/custom-skeleton';
import { SearchIcon } from '@/components/icons/searchicon';
import { Autocomplete, AutocompleteItem, Button, Input, RadioGroup, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { useGetAutoComplete, useGetSearch, useGetDirections } from '@/services/mapService';
import _ from 'lodash';
import LocationIcon from '@/components/icons/location-icon';
import { useGetListStudentClient } from '@/services/client/clientAccountService';
import { useGetListPickupPoint, useGetListStudentPickupPointClient } from '@/services/pickupPointService';



const ClientRegistration: React.FC = () => {

    const [autoCompleteQuery, setAutoCompleteQuery] = React.useState('');
    let autoCompleteParams: IAutoCompleteParams = {
        text: autoCompleteQuery,
        boundary: {
            country: 'VNM'
        }
    }
    const debounceSetAutoCompleteQuery = _.debounce((value: string) => setAutoCompleteQuery(value), 500);
    const { data: pickupPointData, isLoading: pickupPointLoading, error: pickupPointError } =
        useGetListStudentPickupPointClient({});

    const { data: autoCompleteData, isLoading: autoCompleteLoading, error: autoCompleteError } = useGetAutoComplete(autoCompleteParams);

    const useGetDirectionsParams: IDirectionsParams = {
        coordinates: [[105.804817, 21.028511], [105.803577, 21.03422], [105.80325113694303, 21.03586062789824]]
    }
    const { data: directionsGetResponse, isLoading: directionsLoading, error: directionsError } = useGetDirections(useGetDirectionsParams);

    const [selectedAutoCompleteData, setSelectedAutoCompleteData] = React.useState<IFeature | null>(null);

    const [selectRow, setSelectRow] = React.useState(new Set(['']));

    const Map = useMemo(() => dynamic(
        () => import('@/components/map/Map'),
        {
            loading: () => <CustomSkeleton />,
            ssr: false
        }
    ), [])

    return (
        <div className='flex justify-between w-auto'>
            <div className='w-1/2 m-3'>
                <div className=''>
                    <div className="flex flex-col ">
                        <div className='flex justify-end'>

                            <Button color='primary'>
                                Thay đổi toàn bộ
                            </Button>
                        </div>
                        <Table
                            selectionMode="multiple"
                            selectedKeys={selectRow}

                            onSelectionChange={(selectedKeys: any) => {
                                console.log(selectedKeys);
                                setSelectRow(selectedKeys);
                            }}
                            aria-label="Example static collection table"
                        >
                            <TableHeader>
                                <TableColumn>Tên Học Sinh</TableColumn>
                                <TableColumn>Lớp</TableColumn>
                                <TableColumn>Điểm đón</TableColumn>
                            </TableHeader>
                            <TableBody items={pickupPointData?.result.content || []}
                                emptyContent={"No rows to display."}>
                                {(item) => (
                                    <TableRow key={item?.student?.id}>
                                        <TableCell>{item?.student?.name}</TableCell>
                                        <TableCell>{item?.student?.studentClass}</TableCell>
                                        <TableCell>{item?.pickupPoint ? item.pickupPoint.address : "Chưa có"}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>

                        </Table>
                    </div>
                </div>
                <Autocomplete
                    placeholder="Nhập địa điểm"
                    startContent={<SearchIcon />}
                    items={autoCompleteData?.features.map((item) => item.properties) || []}
                    className="w-full"
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
                            // value={item.label}
                            textValue={`${item.name ?? ''}, ${item.county ?? ''}, ${item.region ?? ''}, ${item.country ?? ''}`}
                            value={`${item.name ?? ''}, ${item.county ?? ''}, ${item.region ?? ''}, ${item.country ?? ''}`}
                        >
                            <div className="flex gap-2 items-center">
                                <div className='flex-shrink-0'>
                                    <LocationIcon />
                                </div>

                                <div className='flex flex-col'>
                                    {/* {` ${item.street ?? ''}, ${item.county ?? ''}, ${item.region ?? ''}, ${item.country ?? ''}`} */}
                                    {`${item.name ?? ''}, ${item.county ?? ''}, ${item.region ?? ''}, ${item.country ?? ''}`}
                                </div>
                            </div>

                        </AutocompleteItem>
                    }
                </Autocomplete>
                <div className='flex justify-end'>

                    <Button color='primary'>
                        Lưu
                    </Button>
                </div>
            </div>

            <div
                className="w-1/2"
            >
                <Map
                    features={selectedAutoCompleteData ? [selectedAutoCompleteData] : []}
                    directionsGetResponse={directionsGetResponse}
                />
            </div >
        </div>

    );
};

export default ClientRegistration;