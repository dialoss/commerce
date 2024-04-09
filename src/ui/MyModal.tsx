import Modal from "react-bootstrap/Modal";
import {Button} from "@mui/material";
import React from "react";

export function MyModal({
                            children=<></>,
                            title,
                            callback=()=>{},
                            open = false,
                            style = {},
                            buttons = []
                        }: { buttons: string[]; children?: React.ReactElement; style?: object; title: string; open?: boolean; callback?: (b: string) => any }) {
    return (
        <Modal
            show={open}
            size="lg"
            onEscapeKeyDown={() => callback('')}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onHide={() => callback('')}>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={style}>
                {children}
            </Modal.Body>
            <Modal.Footer>
                {
                    buttons.map(b => <Button onClick={() => callback(b)}>{b}</Button>)
                }
            </Modal.Footer>
        </Modal>
    );
}