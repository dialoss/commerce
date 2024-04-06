import Modal from "react-bootstrap/Modal";
import {Button} from "@mui/material";
import React from "react";

export function MyModal({children,
                            title,
                            onHide,
                            open = false,
                        }: { children: React.ReactElement; title: string; open?: boolean; onHide?: () => any }) {
    return (
        <Modal
            show={open}
            size="lg"
            onEscapeKeyDown={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
}