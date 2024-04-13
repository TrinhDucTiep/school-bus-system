"use client";
import CustomSkeleton from '@/components/custom-skeleton';
import { SearchIcon } from '@/components/icons/searchicon';
import { Autocomplete, AutocompleteItem, Button, Input, Table, TableHeader, TableColumn, TableRow, TableCell, TableBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { useGetAutoComplete, useGetSearch, useGetDirections } from '@/services/mapService';
import _, { set } from 'lodash';
import LocationIcon from '@/components/icons/location-icon';
import { useGetListPickupPoint } from '@/services/pickupPointService';
import { useGetListManipulateBus } from '@/services/busService';
import { useAddRide } from '@/services/rideService';
import { on } from 'events';

const ManipulatingPage: React.FC = () => {

    // get search auto complete
    const [autoCompleteQuery, setAutoCompleteQuery] = React.useState('');
    let autoCompleteParams: IAutoCompleteParams = {
        text: autoCompleteQuery,
        boundary: {
            country: 'VNM'
        }
    }
    const debounceSetAutoCompleteQuery = _.debounce((value: string) => setAutoCompleteQuery(value), 500);
    const { data: autoCompleteData, isLoading: autoCompleteLoading, error: autoCompleteError } = useGetAutoComplete(autoCompleteParams);

    // get drirections
    const useGetDirectionsParams: IDirectionsParams = {
        coordinates: [[105.804817, 21.028511], [105.803577, 21.03422], [105.80325113694303, 21.03586062789824]]
    }
    const { data: directionsGetResponse, isLoading: directionsLoading, error: directionsError } = useGetDirections(useGetDirectionsParams);

    const [selectedAutoCompleteData, setSelectedAutoCompleteData] = React.useState<IFeature | null>(null);

    // get list pickup point
    const [addressQuery, setAddressQuery] = React.useState('');
    let pickupPointParams: IGetListPickupPointParams = {
        address: addressQuery
    }
    const { data: listPickupPoint, isLoading: listPickupPointLoading, error: listPickupPointError } = useGetListPickupPoint(pickupPointParams);

    // get list manipulate bus
    let manipulateBusParams: IGetListManipulateBusParams = {
    }
    const { data: listManipulateBus, isLoading: listManipulateBusLoading, error: listManipulateBusError } = useGetListManipulateBus(manipulateBusParams);

    // form to create a ride with pickup points
    const [manipulateBusId, setManipulateBusId] = React.useState<number | null>(null);
    const [manipulateStartAt, setManipulateStartAt] = React.useState<string | null>(null);
    const [manipulateStartFrom, setManipulateStartFrom] = React.useState<string | null>(null);
    const [manipulatePickupPoints, setManipulatePickupPoints] = React.useState<IPickupPoint[]>([]);
    const { isOpen: isOpenAddRideConfirm, onOpen: onOpenAddRideConfirm, onOpenChange: onOpenChangeAddRideConfirm } = useDisclosure();

    let addRideRequest: IAddRideRequest = {
        busId: manipulateBusId,
        startAt: manipulateStartAt,
        endAt: null,
        startFrom: manipulateStartFrom,
        pickupPointIds: manipulatePickupPoints.map((item) => item.id)
    }
    const addRideMutation = useAddRide(() => {
        setManipulateBusId(null);
        setManipulateStartAt(null);
        setManipulateStartFrom(null);
        setManipulatePickupPoints([]);
        onOpenChangeAddRideConfirm();
    });
    const handleAddRide = () => {
        addRideMutation.mutate(addRideRequest);
    }
    // search manipulate pickup points direction
    const useGetManipulatePickupPointsDirectionsParams: IDirectionsParams = {
        coordinates: manipulatePickupPoints.map((item) => [item.longitude, item.latitude])
    }
    const { data: manipulatePickupPointsDirections, isLoading: manipulatePickupPointsDirectionsLoading, error: manipulatePickupPointsDirectionsError } = useGetDirections(useGetManipulatePickupPointsDirectionsParams);

    // get map admin component
    const MapAdmin = useMemo(() => dynamic(
        () => import('@/components/map/MapAdmin'),
        {
            loading: () => <CustomSkeleton />,
            ssr: false
        }
    ), [])

    console.log('manipulatePickupPoints', manipulatePickupPoints);

    const [enableClickMap, setEnableClickMap] = React.useState<boolean>(false);

    return (
        <div className='flex flex-col'>
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

                    <div className='flex justify-end'>
                        <Button
                            color={enableClickMap ? 'primary' : 'default'}
                            onClick={() => setEnableClickMap(!enableClickMap)}
                        >
                            Chấm điểm
                        </Button>
                    </div>

                    <div className='m-2'>
                        <Table
                            aria-label="List manipulate bus"
                            selectionMode='single'
                            // selectedKeys={listManipulateBus?.result.map((item) => item.bus.id) || []}
                            onSelectionChange={(selectedKeys) => {
                                const keysArray = Array.from(selectedKeys);
                                const selectedKey = Number(keysArray[0]);
                                console.log(selectedKey);

                                const selectedManipulateBus = listManipulateBus?.result.find((item) => item.bus.id === selectedKey);
                                setManipulateBusId(selectedManipulateBus?.bus.id ?? null);
                                setManipulatePickupPoints(selectedManipulateBus?.pickupPoints ?? []);
                            }}
                        >
                            <TableHeader columns={[
                                { key: 'numberPlate', label: 'Biển số xe' },
                                { key: 'status', label: 'Trạng thái' },
                                { key: 'ride', label: 'Chuyến' }
                            ]}>
                                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody items={listManipulateBus?.result ?? []}>
                                {(item) => (
                                    <TableRow key={item.bus.id}>
                                        <TableCell>{item.bus.numberPlate}</TableCell>
                                        <TableCell>{item.bus.status}</TableCell>
                                        <TableCell>{item?.ride?.id}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className='mx-2'>
                        <Input
                            placeholder="Thời gian khởi hành"
                            type='datetime-local'
                            className='m-2'
                            variant='bordered'
                            onChange={(e) => setManipulateStartAt(e.target.value)}
                        />
                        <Input
                            placeholder="Địa điểm xuất phát"
                            className='m-2'
                            variant='bordered'
                            onChange={(e) => setManipulateStartFrom(e.target.value)}
                        />
                    </div>

                    <div className='flex justify-end'>
                        <Button
                            color='primary'
                            onClick={onOpenAddRideConfirm}
                        >
                            Tạo chuyến
                        </Button>
                    </div>

                </div>

                <div
                    className="w-3/5 z-50"
                >
                    <MapAdmin
                        autoCompletePoint={selectedAutoCompleteData}
                        pickupPoints={listPickupPoint?.result.content ?? []}
                        manipulatePickupPointsDirections={manipulatePickupPointsDirections}
                        enableClickMap={enableClickMap}
                        manipulatePickupPoints={manipulatePickupPoints}
                        setManipulatePickupPoints={setManipulatePickupPoints}
                    />
                </div >
            </div>

            {/* modal xác nhận tạo chuyến, nếu xác nhận => handle add ride */}
            <div className='relative z-10'>
                <Modal isOpen={isOpenAddRideConfirm} onOpenChange={onOpenChangeAddRideConfirm}
                >
                    <ModalContent>
                        {(onOpenAddRideConfirm) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Xác nhận thêm chuyến</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Bạn có muốn thêm chuyến không?
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light"
                                        onPress={onOpenChangeAddRideConfirm}
                                    >
                                        Huỷ
                                    </Button>
                                    <Button color="primary" onPress={() => {
                                        handleAddRide();
                                    }}>
                                        Xác nhận
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>

        </div>
    );
};

export default ManipulatingPage;