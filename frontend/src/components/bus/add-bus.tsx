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

export const AddBus = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div>
            <>
                <Button onPress={onOpen} color="primary">
                    Thêm xe Bus
                </Button>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Thêm xe Bus
                                </ModalHeader>
                                <ModalBody>
                                    <Input label="Biển số xe" variant="bordered" />
                                    <Input label="Số chỗ ngồi" variant="bordered" />
                                    <Input label="Trạng thái" variant="bordered" />
                                    <Input label="Tài xế" variant="bordered" />
                                    <Input label="Phụ xe" variant="bordered" />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onClick={onClose}>
                                        Đóng
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        Thêm xe Bus
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        </div>
    );
};
