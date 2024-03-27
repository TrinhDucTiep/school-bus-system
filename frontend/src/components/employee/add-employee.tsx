import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { PlusIcon } from "../icons/plus";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddEmployee } from "@/services/employeeService";

export const AddEmployee = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const addEmployeeMutation = useAddEmployee();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IAddEmployee>();
    const handleAddEmployee: SubmitHandler<IAddEmployee> = (data) => {
        onOpenChange();
        addEmployeeMutation.mutate(data);
    }

    return (
        <div>
            <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
                Thêm nhân viên
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        Thêm nhân viên
                    </ModalHeader>
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(handleAddEmployee)}
                    >
                        <ModalBody>

                            <Input
                                label="Email đăng nhập"
                                variant="bordered"
                                {...register("username", {
                                    required: true,
                                    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                                })}
                            />
                            {errors.username && errors.username.type === "required" && (
                                <p className="text-red-500 text-sm">*Email không được để trống</p>
                            )}
                            {errors.username && errors.username.type === "pattern" && (
                                <p className="text-red-500 text-sm">*Email không hợp lệ</p>
                            )}
                            <Input
                                label="Mật khẩu"
                                variant="bordered"
                                type="password"
                                {...register("password", {
                                    required: true,
                                    minLength: 6
                                })}
                            />
                            {errors.password && errors.password.type === "required" && (
                                <p className="text-red-500 text-sm">*Mật khẩu không được để trống</p>
                            )}
                            {errors.password && errors.password.type === "minLength" && (
                                <p className="text-red-500 text-sm">*Mật khẩu phải dài hơn 6 ký tự</p>
                            )}
                            <Input
                                label="Nhập lại mật khẩu"
                                variant="bordered"
                                type="password"
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: (value) => value === watch("password") || "Mật khẩu không khớp"
                                })}
                            />
                            {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                                <p className="text-red-500 text-sm">*Mật khẩu không được để trống</p>
                            )}
                            <Input
                                label="Họ tên"
                                variant="bordered"
                                {...register("employee.name", { required: true, maxLength: 50 })}
                            />
                            {errors?.employee?.name && errors.employee.name.type === "required" && (
                                <p className="text-red-500 text-sm">*Tên không được để trống</p>
                            )}
                            {errors?.employee?.name && errors.employee.name.type === "maxLength" && (
                                <p className="text-red-500 text-sm">*Tên không được dài hơn 50 ký tự</p>
                            )}
                            <Input
                                label="Avatar"
                                variant="bordered"
                                {...register("employee.avatar", { required: false })}
                            />
                            <Input
                                label="Ngày sinh"
                                variant="bordered"
                                type="date"
                                {...register("employee.dob", { required: true })}
                            />
                            {errors?.employee?.dob && errors.employee.dob.type === "required" && (
                                <p className="text-red-500 text-sm">*Ngày sinh không được để trống</p>)}
                            <Input
                                label="Số điện thoại"
                                variant="bordered"
                                type="number"
                                {...register("employee.phoneNumber", {
                                    required: true,
                                    maxLength: 10,
                                    pattern: /^[0-9]{10,11}$/
                                })}
                            />
                            {errors.employee?.phoneNumber && errors.employee?.phoneNumber.type === "required" && (
                                <p className="text-red-500 text-sm">*Số điện thoại không được để trống</p>
                            )}
                            {errors.employee?.phoneNumber && errors.employee?.phoneNumber.type === "maxLength" && (
                                <p className="text-red-500 text-sm">*Số điện thoại phải là 10 hoặc 11 số</p>
                            )}
                            <Input
                                label="Xe Bus hiện tại"
                                variant="bordered"
                                {...register("employee.busNumberPlate", { required: false })}
                            />
                            <Input
                                label="Vai trò"
                                variant="bordered"
                                {...register("employee.role", { required: false })}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onOpenChange}>
                                Hủy
                            </Button>
                            <Button color="primary" type="submit">
                                Thêm nhân viên
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    );
}