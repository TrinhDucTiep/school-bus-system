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
import { useAddParent, useGetListStudent } from "@/services/accountService";
import { on } from "events";

export const AddParent = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const addParentMutation = useAddParent();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IParentAdd>();
    const handAddParent: SubmitHandler<IParentAdd> = (data) => {
        console.log("data: ", data)
        onOpenChange()
        addParentMutation.mutate(data)
    };

    const { data: studentList, isLoading: studentLoading, error: studentError } = useGetListStudent({
        id: null,
        name: null,
        dob: null,
        phoneNumber: null,
        studentClass: null,
        parent_id: null,
        page: null,
        size: null,
        sort: null,
        sortBy: null
    })

    return (
        <div>
            <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
                Thêm phụ huynh
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
                        onSubmit={handleSubmit(handAddParent)}
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
                                {...register("dob", { required: true })}
                            />
                            {errors.dob && errors.dob.type === "required" && (
                                <p className="text-red-500 text-sm">*Ngày sinh không được để trống</p>)}

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
                                label="Email đăng nhập"
                                type="email"
                                variant="bordered"
                                {...register("email", {
                                    required: true,
                                    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                                })}
                            >
                            </Input>
                            {errors.email && errors.email.type === "required" && (
                                <p className="text-red-500 text-sm">*Email không được để trống</p>
                            )}
                            {errors.email && errors.email.type === "pattern" && (
                                <p className="text-red-500 text-sm">*Email không hợp lệ</p>
                            )}
                            <Input
                                label="Mật khẩu"
                                type="password"
                                variant="bordered"
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
                                type="password"
                                variant="bordered"
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: (value) => value === watch("password") || "Mật khẩu không khớp"
                                })}
                            />
                            {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                                <p className="text-red-500 text-sm">*Mật khẩu không được để trống</p>
                            )}
                            <Select
                                label="Học sinh"
                                variant="bordered"
                                {...register("studentIds", { required: true })}
                                selectionMode="multiple"
                                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                    const newValue = event.target.value;
                                    setValue("studentIds", newValue.split(",").map((item) => parseInt(item, 10)));
                                }}
                                >
                                {(studentList?.result.content || []).map((student) => {
                                    return (
                                        <SelectItem key={student.id} value={student.id}>
                                            {student.name}
                                        </SelectItem>
                                    );
                                })}
                            </Select>


                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onOpenChange}>
                                Huỷ
                            </Button>
                            <Button color="primary" type="submit">
                                Thêm phụ huynh
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    );
};
