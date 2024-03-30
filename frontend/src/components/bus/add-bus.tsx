import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { PlusIcon } from "../icons/plus";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddBus } from "@/services/busService";
import { bus_status_map } from "@/util/constant";

export const AddBus = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const addBusMutation = useAddBus(onOpenChange);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IBus>();
    const handleAddBus: SubmitHandler<IBus> = (data) => addBusMutation.mutate(data);

    return (
        <div>
            <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
                Thêm xe Bus
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        Thêm xe Bus
                    </ModalHeader>
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(handleAddBus)}
                    >
                        <ModalBody>

                            <Input
                                label="Biển số xe"
                                variant="bordered"
                                {...register("numberPlate", { required: true })}
                            />
                            <Input
                                label="Số chỗ ngồi"
                                variant="bordered"
                                {...register("seatNumber", {
                                    required: true,
                                    validate: (value: any) => parseInt(value, 10) > 0 || 'Số chỗ ngồi không hợp lệ'
                                })}
                            />
                            {errors.seatNumber && errors.seatNumber.message && <p className="text-red-500 text-sm">{`*${errors.seatNumber.message}`}</p>}
                            
                            <Select
                                label="Trạng thái"
                                placeholder="Chọn trạng thái"
                                selectionMode="single"
                                {...register("status", { required: true })}
                            >
                                {bus_status_map.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Input
                                label="Tài xế"
                                variant="bordered"
                                {...register("driverId", { required: false })}
                            />
                            <Input
                                label="Phụ xe"
                                variant="bordered"
                                {...register("driverMateId", { required: false })}
                            />

                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onOpenChange}>
                                Huỷ
                            </Button>
                            <Button color="primary" type="submit">
                                Thêm xe Bus
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    );
};
