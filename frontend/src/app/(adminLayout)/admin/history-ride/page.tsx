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
    Pagination,
    Image
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
        <div className='m-4 w-1/2'>
            <Accordion selectionMode='single' variant='shadow' className='bg-default-100'>
                {
                    (adminHistory?.result?.content || []).map((history, index) => {
                        return (
                            <AccordionItem
                                key={index}
                                title={
                                    <div className='flex justify-around'>
                                        <Image
                                            width={70}
                                            alt="NextUI hero Image"
                                            src="https://cdn4.iconfinder.com/data/icons/BRILLIANT/transportation/png/256/school_bus.png"
                                        />
                                        <div className='flex-col gap-2 justify-between'>
                                            <div className='flex flex-col'>
                                                <h4 className='text-lg items-center flex gap-4'>
                                                    <span className='flex gap-2 items-center'>
                                                        <p className='font-bold'>Chuyến:</p>
                                                        <Snippet symbol="" size='sm'> {history.ride.id}</Snippet>
                                                    </span>
                                                    <span className='flex gap-2 items-center'>
                                                        <p className='font-bold'>Trạng thái:</p>
                                                        <Chip color={ride_status_map.find(status => status.value === history.ride.status)?.color} variant="flat" size="sm">
                                                            {ride_status_map.find(status => status.value === history.ride.status)?.label}
                                                        </Chip>
                                                    </span>
                                                </h4>
                                            </div>

                                            <div>
                                                <h4 className='text-lg items-center flex gap-4 mt-2'>
                                                    <span className='flex gap-2 items-center'>
                                                        <p className='font-bold'>Xe:</p>
                                                        <Snippet symbol="" size='sm'> {history.bus.numberPlate}</Snippet>
                                                    </span>
                                                    <span className='flex gap-2 items-center'>
                                                        <p className='font-bold'>Chiều: </p>
                                                        <p>{history.ride.isToSchool ? 'Trường -> Nhà' : 'Nhà -> Trường'}</p>
                                                    </span>
                                                    {/* <span className='flex gap-2 items-center'>
                                                    <p className='font-bold'>Trạng thái:</p>
                                                    <Chip color={bus_status_map.find(status => status.value === history.bus.status)?.color} variant="flat" size="sm">
                                                        {bus_status_map.find(status => status.value === history.bus.status)?.label}
                                                    </Chip>
                                                </span> */}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                }

                            >
                                <div className='flex-col'>
                                    <div className='flex gap-4n'>
                                        <div className='flex flex-col'>
                                            <h4 className='text-lg items-center flex-col gap-4'>
                                                <span className='flex gap-2 items-center'>
                                                    <p className='font-bold'>Khởi hành:</p>
                                                    <p>{convertStringInstantToDateTime(history.ride.startAt)}</p>
                                                </span>
                                                <span className='flex gap-2 items-center'>
                                                    <p className='font-bold'>Kết thúc:</p>
                                                    <p>{convertStringInstantToDateTime(history.ride.endAt)}</p>
                                                </span>
                                                <span className='flex gap-2'>
                                                    <p className='font-bold'>Từ:</p>
                                                    <p>{history.ride.startFrom}</p>
                                                </span>
                                                <span className='flex gap-2 items-center'>
                                                    <p className='font-bold'>Chiều: </p>
                                                    <p>{history.ride.isToSchool ? 'Trường -> Nhà' : 'Nhà -> Trường'}</p>
                                                </span>
                                            </h4>
                                        </div>

                                        <div>
                                            <h4 className='text-lg items-center flex-col gap-4'>
                                                <span className='flex gap-2 items-center'>
                                                    <p className='font-bold'>Xe:</p>
                                                    <Snippet symbol="" size='sm'> {history.bus.numberPlate}</Snippet>
                                                </span>

                                                <div className='flex gap-1 items-center'>
                                                    <h4 className='font-bold'>Tài xế:</h4>
                                                    <User
                                                        avatarProps={{
                                                            src: history?.driver.avatar || ""
                                                        }}
                                                        name={history?.driver.name}
                                                    >
                                                        {history?.driver.name}
                                                    </User>
                                                </div>
                                                <div className='flex gap-1 items-center'>
                                                    <h4 className='font-bold'>Phụ xe:</h4>
                                                    <User
                                                        avatarProps={{
                                                            src: history?.driverMate.avatar || ""
                                                        }}
                                                        name={history?.driverMate.name}
                                                    >
                                                        {history?.driverMate.name}
                                                    </User>
                                                </div>
                                            </h4>
                                        </div>
                                    </div>

                                    <div className='flex gap-4'>
                                        <div className='flex-col'>
                                            <h4 className='font-bold'>Lịch sử chuyến đi: </h4>
                                            <div className='flex-col gap-2'>
                                                <Table hideHeader>
                                                    <TableHeader>
                                                        <TableColumn>STT</TableColumn>
                                                        <TableColumn>Thời gian</TableColumn>
                                                        <TableColumn>Trạng thái</TableColumn>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {
                                                            history?.rideHistories?.map((rideHistory, index) => {
                                                                return (
                                                                    <TableRow key={index}>
                                                                        <TableCell>{index}</TableCell>
                                                                        <TableCell>{convertStringInstantToDateTime(rideHistory.createdAt)}</TableCell>
                                                                        <TableCell>
                                                                            <Chip color={ride_status_map.find(status => status.value === rideHistory.status)?.color} variant="flat" size="sm">
                                                                                {ride_status_map.find(status => status.value === rideHistory.status)?.label}
                                                                            </Chip>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )
                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex gap-4 mt-2'>
                                        <div className='flex-col'>
                                            <h4 className='font-bold'>Lịch sử điểm đón: </h4>
                                            <div className='flex-col gap-2'>
                                                <Table hideHeader>
                                                    <TableHeader>
                                                        <TableColumn>STT</TableColumn>
                                                        <TableColumn>Địa chỉ</TableColumn>
                                                        <TableColumn>Thời gian</TableColumn>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {
                                                            history?.ridePickupPointHistories?.map((ridePickupPointHistory, index) => {
                                                                return (
                                                                    <TableRow key={index}>
                                                                        <TableCell>{ridePickupPointHistory.orderIndex}</TableCell>
                                                                        <TableCell>{ridePickupPointHistory.address}</TableCell>
                                                                        <TableCell>{convertStringInstantToDateTime(ridePickupPointHistory.updatedAt)}</TableCell>
                                                                    </TableRow>
                                                                )
                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex gap-4 mt-2'>
                                        <div className='flex-col'>
                                            <h4 className='font-bold'>Lịch sử học sinh: </h4>
                                            <div className='flex-col gap-2'>
                                                {/* {
                                                    history?.studentRideHistories.map((studentRideHistory, index) => {
                                                        return (
                                                            <div key={index} className='flex gap-4'>
                                                                <div className='flex gap-2'>
                                                                    <User
                                                                        avatarProps={{
                                                                            src: studentRideHistory.student.avatar || ""
                                                                        }}
                                                                        name={studentRideHistory.student.name}
                                                                    >
                                                                        {studentRideHistory.student.name}
                                                                    </User>
                                                                </div>
                                                                <div className='flex-col gap-2'>
                                                                    {
                                                                        studentRideHistory.studentPickupPointHistories.map((studentPickupPointHistory, index) => {
                                                                            return (
                                                                                <div key={index} className='flex gap-2'>
                                                                                    <p>{studentPickupPointHistory.address}</p>
                                                                                    <Chip color={student_pickup_point_status_map.find(status => status.value === studentPickupPointHistory.status)?.color} variant="flat" size="sm">
                                                                                        {student_pickup_point_status_map.find(status => status.value === studentPickupPointHistory.status)?.label}
                                                                                    </Chip>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                } */}
                                                <Table hideHeader>
                                                    <TableHeader>
                                                        <TableColumn>Học sinh</TableColumn>
                                                        <TableColumn>Lịch sử</TableColumn>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {
                                                            history?.studentRideHistories.map((studentRideHistory, index) => {
                                                                return (
                                                                    <TableRow key={index}>
                                                                        <TableCell>
                                                                            <User
                                                                                avatarProps={{
                                                                                    src: studentRideHistory.student.avatar || ""
                                                                                }}
                                                                                name={studentRideHistory.student.name}
                                                                            >
                                                                                {studentRideHistory.student.name}
                                                                            </User>
                                                                        </TableCell>
                                                                        {/* <TableCell>
                                                                            {
                                                                                studentRideHistory.studentPickupPointHistories.map((studentPickupPointHistory, index) => {
                                                                                    return (
                                                                                        <div key={index} className='flex gap-2'>
                                                                                            <p>{studentPickupPointHistory.address}</p>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </TableCell> */}
                                                                        <TableCell>
                                                                            {
                                                                                studentRideHistory.studentPickupPointHistories.map((studentPickupPointHistory, index) => {
                                                                                    return (
                                                                                        <div key={index} className='flex gap-2'>
                                                                                            <p>{studentPickupPointHistory.address}</p>
                                                                                            <Chip color={student_pickup_point_status_map.find(status => status.value === studentPickupPointHistory.status)?.color} variant="flat" size="sm">
                                                                                                {student_pickup_point_status_map.find(status => status.value === studentPickupPointHistory.status)?.label}
                                                                                            </Chip>
                                                                                            <p>{convertStringInstantToDateTime(studentPickupPointHistory.updatedAt)}</p>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )
                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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