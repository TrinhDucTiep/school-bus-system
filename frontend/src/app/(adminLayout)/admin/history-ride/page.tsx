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
    User,
    CardHeader,
    Select,
    SelectItem,
    Pagination
} from '@nextui-org/react';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { useGetAutoComplete, useGetSearch, useGetDirections } from '@/services/mapService';
import _, { set } from 'lodash';
import LocationIcon from '@/components/icons/location-icon';
import { convertStringInstantToDate, convertStringInstantToDateTime } from '@/util/dateConverter';
import { bus_status_map, ride_status_map, student_pickup_point_status_map } from '@/util/constant';
import { useGetAdminHistory } from '@/services/historyService';


const HistoryRidePage: React.FC = () => {
    // get admin history
    const [startAt, setStartAt] = React.useState<string | null>(null);
    const [rideId, setRideId] = React.useState<number | null>(null);
    const [numberPlate, setNumberPlate] = React.useState<string | null>(null);
    const [status, setStatus] = React.useState<string | null>(null);
    const [isToSchool, setIsToSchool] = React.useState<boolean | null>(null);
    const [address, setAddress] = React.useState<string | null>(null);
    const [studentPhoneNumber, setStudentPhoneNumber] = React.useState<string | null>(null);
    const [parentPhoneNumber, setParentPhoneNumber] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(1);

    let adminHistoryRideFilterParam: IAdminHistoryRideFilterParam = {
        startAt: startAt,
        rideId: rideId,
        numberPlate: numberPlate,
        status: status,
        isToSchool: isToSchool,
        address: address,
        studentPhoneNumber: studentPhoneNumber,
        parentPhoneNumber: parentPhoneNumber,
        page: page - 1,
        size: 5,
        sort: '-createdAt'
    }

    const { data: adminHistory, isLoading: isLoadingAdminHistory, isError: isErrorAdminHistory } = useGetAdminHistory(adminHistoryRideFilterParam);

    const bottomContent = (
        <div className="py-2 px-2 flex w-full justify-center items-center">
            <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={adminHistory?.result.totalPages || 1}
                onChange={setPage}
            />
        </div>
    )


    if (isLoadingAdminHistory) {
        return <CustomSkeleton />
    }
    if (isErrorAdminHistory) {
        return <div className='w-auto h-full m-4 flex justify-center'>
            <Card className='m-2 w-full h-full flex justify-center'>
                <CardBody className='flex justify-center'>
                    <div className='flex justify-center'>
                        <h1 className='font-bold'>Error!!!</h1>
                    </div>
                </CardBody>
            </Card>
        </div>
    }
    if (!adminHistory?.result) {
        return <div className='w-auto h-full m-4 flex justify-center'>
            <Card className='m-2 w-full h-full flex justify-center'>
                <CardBody className='flex justify-center'>
                    <div className='flex justify-center'>
                        <h1 className='font-bold'>No data</h1>
                    </div>
                </CardBody>
            </Card>
        </div>
    }
    return (
        <div className='m-4'>
            <Accordion selectionMode='single' variant='shadow' className='bg-default-100'>
                {
                    (adminHistory?.result?.content || []).map((history, index) => {
                        return (
                            <AccordionItem
                                key={index}
                                title={
                                    <div className='flex justify-between'>
                                        <div className='flex flex-col'>
                                            <h4 className='text-lg items-center flex-col gap-4'>
                                                <span className='flex gap-2 items-center'>
                                                    <p className='font-bold'>Chuyến:</p>
                                                    <Snippet symbol="" size='sm'> {history.ride.id}</Snippet>
                                                </span>
                                                <span className='flex gap-2 items-center'>
                                                    <p className='font-bold'>Khởi hành:</p>
                                                    <p>{convertStringInstantToDateTime(history.ride.startAt)}</p>
                                                </span>
                                                <span className='flex gap-2 items-center'>
                                                    <p className='font-bold'>Kết thúc:</p>
                                                    <p>{convertStringInstantToDateTime(history.ride.endAt)}</p>
                                                </span>
                                                <span className='flex gap-2 items-center'>
                                                    <p className='font-bold'>Từ:</p>
                                                    <p>{history.ride.startFrom}</p>
                                                </span>
                                                <span className='flex gap-2 items-center'>
                                                    <p className='font-bold'>Trạng thái:</p>
                                                    <Chip color={ride_status_map.find(status => status.value === history.ride.status)?.color} variant="flat" size="sm">
                                                        {ride_status_map.find(status => status.value === history.ride.status)?.label}
                                                    </Chip>
                                                </span>
                                                <span className='flex gap-2 items-center'>
                                                    <p className='font-bold'>Chiều: </p>
                                                    <p>{history.ride.isToSchool ? 'Trường -> Nhà' : 'Nhà -> Trường'}</p>
                                                </span>
                                                <span className='flex gap-2 items-center'>
                                                    <p className='font-bold'>Ngày tạo:</p>
                                                    <p>{convertStringInstantToDateTime(history.ride.createdAt)}</p>
                                                </span>
                                                <span className='flex gap-2 items-center'>
                                                    <p className='font-bold'>Ngày cập nhật:</p>
                                                    <p>{convertStringInstantToDateTime(history.ride.updatedAt)}</p>
                                                </span>
                                            </h4>
                                        </div>

                                        <div>
                                            <h4 className='text-lg items-center flex-col gap-4'>
                                                <span className='flex gap-2 items-center'>
                                                    <p className='font-bold'>Xe:</p>
                                                    <Snippet symbol="" size='sm'> {history.bus.numberPlate}</Snippet>
                                                </span>
                                                <span className='flex gap-2 items-center'>
                                                    <p className='font-bold'>Trạng thái:</p>
                                                    <Chip color={bus_status_map.find(status => status.value === history.bus.status)?.color} variant="flat" size="sm">
                                                        {bus_status_map.find(status => status.value === history.bus.status)?.label}
                                                    </Chip>
                                                </span>
                                                <span className='flex gap-2 items-center'>
                                                    <p className='font-bold'>Ngày tạo:</p>
                                                    <p>{convertStringInstantToDateTime(history.bus.createdAt)}</p>
                                                </span>
                                                <span className='flex gap-2 items-center'>
                                                    <p className='font-bold'>Ngày cập nhật:</p>
                                                    <p>{convertStringInstantToDateTime(history.bus.updatedAt)}</p>
                                                </span>
                                            </h4>
                                        </div>
                                    </div>
                                }

                            >
                                detail
                            </AccordionItem>
                        )
                    })
                }
            </Accordion>

            <div>
                {bottomContent}
            </div>
        </div>
    );
};

export default HistoryRidePage;