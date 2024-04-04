"use client";

import ClientStudentTable from '@/components/parent/client-student-table';
import { Avatar, Button, Card, User } from '@nextui-org/react';
import React from 'react';
import { EditIcon } from "@/components/icons/table/edit-icon";

const ClientPage: React.FC = () => {
    return (
        <div>
            <div className="flex justify-between flex-wrap gap-4 items-left m-4">
                <h3 className="text-xl font-semibold">Thông tin phụ huynh</h3>
                <div className="flex flex-row flex-wrap m-1 mb-8">

                </div>
            </div>

            <Card className='mx-4 flex flex-row items-center justify-between p-4 mb-16'>
                <div className="flex flex-row gap-2 m-2 w-auto">
                    <User
                        avatarProps={{
                            src: "https://www.w3schools.com/howto/img_avatar.png",
                        }}
                        name=""
                    >
                    </User>

                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-4">
                                <div className="font-semibold">Họ và tên:</div>
                                <div>Nguyễn Văn A</div>
                            </div>
                            <div className="flex flex-row gap-4">
                                <div className="font-semibold">Số điện thoại:</div>
                                <div>0123456789</div>
                            </div>
                            <div className="flex flex-row gap-4">
                                <div className="font-semibold">Email:</div>
                                <div>
                                    <a href="mailto:" className="text-blue-500" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-4">
                                <div className="font-semibold">Ngày sinh:</div>
                                <div>01/01/2000</div>
                            </div>
                            <div className="flex flex-row gap-4">
                                <div className="font-semibold">Địa chỉ:</div>
                                <div>123 Đường ABC, Quận XYZ, TP HCM</div>
                            </div>
                        </div>
                    </div>
                </div>

                <Button
                    // onPress={onOpen} 
                    color="primary"
                    endContent={
                        <EditIcon size={20} fill="#000000" />
                    }
                >
                    Chỉnh sửa thông tin
                </Button>
            </Card>

            <ClientStudentTable />
        </div>
    );
};

export default ClientPage;