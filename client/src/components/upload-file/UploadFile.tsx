import { ChangeEvent } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface InputFileUploadProps {
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputFileUpload = ({ onUpload }: InputFileUploadProps) => {
  return (
    <Button
      component="label"
      aria-label="upload image"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput name="pic" type="file" onChange={onUpload} />
    </Button>
  );
};

export default InputFileUpload;
