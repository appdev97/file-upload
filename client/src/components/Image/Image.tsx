import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Delete from "@mui/icons-material/Delete";

import { getImageData } from "~/utils/helper";
import type { Image } from "~/types";

const Img = styled("img")({
  aspectRatio: 1,
  width: "100%",
});

interface ImagePros {
  data: Image;
  onDelete: (id: string) => void;
}

export const ImageItem = ({ data, onDelete }: ImagePros) => {
  return (
    <ImageListItem>
      <Img src={getImageData(data.img)} alt={data.title} loading="lazy" />
      <ImageListItemBar
        title={data.title}
        actionIcon={
          <IconButton
            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
            aria-label={`delete ${data.title}`}
            onClick={() => onDelete(data.id)}
          >
            <Delete />
          </IconButton>
        }
      />
    </ImageListItem>
  );
};

export default ImageItem;
