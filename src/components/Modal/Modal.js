"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({ header, data }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>{header}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        className="overflow-y-auto"
      >
        <Box sx={{ ...style, width: 400 }}>
          {data.map((response) => (
            <div>{`${response.question_id - 2}. soru: ${
              response.answer_choice
            }`}</div>
          ))}
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal({
  children,
  responsesObj,
  participantArray,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Sonuçlar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          {participantArray.map((e) => (
            <ChildModal
              key={e}
              data={responsesObj[String(e)]}
              header={`katılımcı-${e}`}
            />
          ))}
        </Box>
      </Modal>
    </div>
  );
}
