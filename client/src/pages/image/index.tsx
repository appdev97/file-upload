import { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  TextField,
  ImageList,
  ListSubheader,
  ImageListItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import ImageItem from "~/components/Image";
import UploadFile from "~/components/upload-file";
import { httpClient } from "~/utils/api";
import useDebounce from "~/hooks/useDebounce";

import type { Image } from "~/types";

export const ImagePage = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    refetch();
  }, [debouncedSearch]);

  const handleSuccess = () => {
    queryClient.refetchQueries({ queryKey: ["getImages"] });
  };

  // GET Function
  const getImages = () => {
    return httpClient(
      `${import.meta.env.VITE_API_URL}/images?title=${debouncedSearch}`
    );
  };

  const { data, refetch } = useQuery<any>({
    queryKey: ["getImages", debouncedSearch],
    queryFn: getImages,
  });

  // UPLOAD
  const uploadMutation = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("pic", file);

      return httpClient(`${import.meta.env.VITE_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });
    },
    onSuccess: handleSuccess,
    onError: (e) => {
      console.log(e);
    },
  });

  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    event?.target?.files?.[0] &&
      uploadMutation.mutate(event?.target?.files?.[0]);
    event.target.value = "";
  };

  // DELETE Function
  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      httpClient(`${import.meta.env.VITE_API_URL}/image/${id}`, {
        method: "DELETE",
      }),
    onSuccess: handleSuccess,
    onError: (e) => {
      console.log(e);
    },
  });

  const handleDeleteImage = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 4 }}>
        <TextField
          id="search-image..."
          label="Search Images"
          variant="outlined"
          InputProps={{
            "aria-label": "search image",
            endAdornment: <SearchIcon />,
          }}
          value={search}
          onChange={handleChangeSearch}
        />
        <UploadFile onUpload={handleUploadImage} />
      </Box>
      <Box>
        <ImageList>
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="h1">
              {data?.length || 0} Images
            </ListSubheader>
          </ImageListItem>
          {data?.map((item: Image) => (
            <ImageItem key={item.id} data={item} onDelete={handleDeleteImage} />
          ))}
        </ImageList>
      </Box>
    </>
  );
};

export default ImagePage;
