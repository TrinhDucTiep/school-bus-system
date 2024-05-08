"use client";
import {
    Autocomplete,
    AutocompleteItem,
    Avatar,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Skeleton,
    useDisclosure,
} from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { PlusIcon } from "../../../icons/plus";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddStudent, useGetListParent, useGetListStudent } from "@/services/admin/accountService";
import _, { set } from 'lodash';
import { SearchIcon } from "../../../icons/searchicon";
import { useAddStudentClient } from "@/services/client/clientAccountService";

export const AddStudentClient = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const addStudentMutation = useAddStudentClient(onOpenChange);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IStudenAddClient>();
    const handAddStudent: SubmitHandler<IStudenAddClient> = (data) => {
        addStudentMutation.mutate(data)
    };

    return (
        <div>
            <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
                Thêm học sinh
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                size='2xl'
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        Thêm học sinh
                    </ModalHeader>
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(handAddStudent)}
                    >
                        <ModalBody>

                            <Input
                                label="Họ và tên"
                                variant="bordered"
                                {...register("name",
                                    { required: true, maxLength: 50 })}
                            />
                            {errors.name && errors.name.type === "required" && (
                                <p className="text-red-500 text-sm">*Tên không được để trống</p>
                            )}
                            {errors.name && errors.name.type === "maxLength" && (
                                <p className="text-red-500 text-sm">*Tên không được dài hơn 50 ký tự</p>
                            )}
                            <Input
                                label="Ngày sinh"
                                variant="bordered"
                                type="date"
                                {...register("dob", { required: true, pattern: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/ })}
                            />
                            {errors.dob && errors.dob.type === "required" && (
                                <p className="text-red-500 text-sm">*Ngày sinh không được để trống</p>)}
                            {errors.dob && errors.dob.type === "pattern" && (
                                <p className="text-red-500 text-sm">*Ngày sinh không hợp lệ</p>)}
                            <Input
                                label="Số điện thoại"
                                variant="bordered"
                                type="number"
                                {...register("phoneNumber", {
                                    required: true,
                                    maxLength: 10,
                                    pattern: /^[0-9]{10,11}$/
                                })}
                            />
                            {errors.phoneNumber && errors.phoneNumber.type === "required" && (
                                <p className="text-red-500 text-sm">*Số điện thoại không được để trống</p>
                            )}
                            {errors.phoneNumber && errors.phoneNumber.type === "pattern" && (
                                <p className="text-red-500 text-sm">*Số điện thoại phải là 10 hoặc 11 số</p>
                            )}

                            <Input
                                label="Lớp"
                                variant="bordered"
                                {...register("studentClass", {
                                    required: true,
                                    maxLength: 20,
                                })}
                            />
                            {errors.studentClass && errors.studentClass.type === "required" && (
                                <p className="text-red-500 text-sm">*Tên lớp không được để trống</p>
                            )}
                            {errors.studentClass && errors.studentClass.type === "maxLength" && (
                                <p className="text-red-500 text-sm">*Tên lớp không được dài hơn 20 ký tự</p>
                            )}


                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onOpenChange}>
                                Huỷ
                            </Button>
                            <Button color="primary" type="submit">
                                Xác nhận
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    );
};
