"use client";
import CustomSkeleton from '@/components/custom-skeleton';
import { SearchIcon } from '@/components/icons/searchicon';
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Input,
    RadioGroup,
    Switch,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Chip,
    Card,
    CardBody,
    Accordion,
    AccordionItem,
    Snippet,
    User
} from '@nextui-org/react';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { useGetAutoComplete, useGetSearch, useGetDirections } from '@/services/mapService';
import _ from 'lodash';
import LocationIcon from '@/components/icons/location-icon';
import { convertStringInstantToDate } from '@/util/dateConverter';
import { useGetListManipulatePickupPoint } from '@/services/employee/employeeService';

const EmployeeMonitoring: React.FC = () => {

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

    const Map = useMemo(() => dynamic(
        () => import('@/components/map/MapEmployee'),
        {
            loading: () => <CustomSkeleton />,
            ssr: false
        }
    ), [])

    // enable click point to map
    const [enableClickMap, setEnableClickMap] = React.useState<boolean>(false);

    // get manipulate pickup point
    const { data: manipulatePickupPointData, isLoading: manipulatePickupPointLoading, error: manipulatePickupPointError } = useGetListManipulatePickupPoint();

    // get directions
    const useGetManipulatePickupPointDirectionParams: IDirectionsParams = {
        coordinates: manipulatePickupPointData?.result.pickupPointWithStudents.map((item) => [item.pickupPoint.longitude, item.pickupPoint.latitude]) || []
    }
    const { data: directionsGetResponse, isLoading: directionsLoading, error: directionsError } = useGetDirections(useGetManipulatePickupPointDirectionParams);

    return (
        <div className='flex flex-col'>
            <Card className='m-2'>
                <CardBody>
                    <div className='flex gap-8 items-center my-2'>
                        <span>Xe bus hiện tại: <Snippet symbol="" color="default">{manipulatePickupPointData?.result.bus.numberPlate}</Snippet></span>
                        <span> Trạng thái:
                            <Chip
                                variant='flat'
                                color={
                                    manipulatePickupPointData?.result.bus.status === 'AVAILABLE' ? 'success' :
                                        manipulatePickupPointData?.result.bus.status === 'RUNNING' ? 'warning' :
                                            manipulatePickupPointData?.result.bus.status === 'BROKEN' ? 'danger' :
                                                manipulatePickupPointData?.result.bus.status === 'MAINTENANCE' ? 'primary' : 'default'

                                }
                            >
                                {manipulatePickupPointData?.result.bus.status}
                            </Chip>
                        </span>
                    </div>

                    <div className='flex gap-8 items-center my-2'>
                        <span className='flex items-center'>Tài xế:
                            <User
                                name={manipulatePickupPointData?.result.driver.name}
                            >
                                {manipulatePickupPointData?.result?.driver.name}
                            </User>
                        </span>
                        <span className='flex items-center'>
                            Phụ xe:
                            <User
                                name={manipulatePickupPointData?.result.driverMate.name}
                            >
                                {manipulatePickupPointData?.result?.driverMate.name}
                            </User>
                        </span>
                    </div>

                    <div className='flex items-center my-2 gap-8'>
                        <span>Chuyến hiện tại: <Snippet symbol="" color="default">{manipulatePickupPointData?.result.ride.id}</Snippet> </span>
                        <span>Thời gian bắt đầu: {convertStringInstantToDate(manipulatePickupPointData?.result.ride.startAt)} </span>
                        <span>Trạng thái:
                            <Chip variant='flat'
                                color={
                                    manipulatePickupPointData?.result.ride.status === 'PENDING' ? 'primary' :
                                        manipulatePickupPointData?.result.ride.status === 'READY' ? 'success' :
                                            manipulatePickupPointData?.result.ride.status === 'RUNNING' ? 'warning' :
                                                manipulatePickupPointData?.result.ride.status === 'FINISHED' ? 'danger' : 'default'

                                }>
                                {manipulatePickupPointData?.result.ride.status}
                            </Chip>
                        </span>
                    </div>
                </CardBody>
            </Card>
            <div className='flex justify-between w-auto'>
                <div className='w-2/5 mr-4'>
                    <Autocomplete
                        placeholder="Nhập địa điểm"
                        allowsCustomValue
                        startContent={<SearchIcon />}
                        items={autoCompleteData?.features.map((item) => item.properties) || []}
                        className="m-2 w-full"
                        selectorIcon={false}
                        onInputChange={(value) => {
                            debounceSetAutoCompleteQuery(value);
                        }}
                        onSelectionChange={
                            (selectedId) => {
                                const selectedItem = autoCompleteData?.features.find((item) => item.properties.id === selectedId);
                                if (selectedItem) {
                                    setSelectedAutoCompleteData(selectedItem);
                                }
                            }
                        }
                        isClearable={false}
                    >
                        {(item) =>
                            <AutocompleteItem
                                key={item.id}
                                textValue={`${item.name ?? ''}, ${item.county ?? ''}, ${item.region ?? ''}, ${item.country ?? ''}`}
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
                        <Button
                            color={enableClickMap ? 'primary' : 'default'}
                            onClick={() => setEnableClickMap(!enableClickMap)}
                        >
                            Chấm điểm
                        </Button>
                    </div>

                    {/* Accordion pickupPoints & Student inside */}
                    <div className='my-2 ml-2'>
                        <Accordion variant='shadow'>
                            {
                                (manipulatePickupPointData?.result.pickupPointWithStudents || []).map((item, index) => {
                                    return (
                                        <AccordionItem
                                            key={index}
                                            title={item.pickupPoint.address}
                                        >
                                            <div className='flex flex-col gap-2'>
                                                {item.studentWithPickupPoints.map((student, index) => {
                                                    return (
                                                        <div key={index} className='flex gap-4 items-center'>
                                                            <User
                                                                name={student.student.name}
                                                            >
                                                                {student.student.name}
                                                            </User>
                                                            <Chip
                                                                color={
                                                                    student.studentPickupPoint.status === 'PICKED' ? 'success' :
                                                                        student.studentPickupPoint.status === 'PICKING' ? 'primary' :
                                                                            student.studentPickupPoint.status === 'MISSED' ? 'danger' : 'default'
                                                                }
                                                            >
                                                                {student.studentPickupPoint.status}
                                                            </Chip>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </AccordionItem>
                                    )
                                })
                            }
                        </Accordion>
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
                        manipulatePickupPointsOutput={manipulatePickupPointData?.result || []}
                    />
                </div >
            </div>


            <div className='m-4'>

            </div>


        </div>
    );
};

export default EmployeeMonitoring;