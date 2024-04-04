import React, {useEffect, useState} from 'react';
import ImageUploading from 'react-images-uploading';
import {Button, Checkbox, FormControlLabel, MenuItem, Stack, TextField, Typography} from "@mui/material";

export function Uploader({files, setFiles}) {
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        setFiles(imageList);
    };

    return (
        <ImageUploading
            multiple
            value={files}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
        >
            {({
                  imageList,
                  onImageRemoveAll,
                  onImageRemove,
              }) => (
                <Stack alignItems={'center'} rowGap={2} marginTop={10}>
                    <Button size={'small'} variant={'contained'} onClick={onImageRemoveAll}>Убрать все
                        файлы</Button>
                    <Stack direction={'row'} flexWrap={'wrap'} alignItems={'center'} justifyContent={'center'}
                           style={{width: "80%"}}>
                        {imageList.map((image, index) => (
                            <div key={index} style={{margin: 5}}>
                                <img src={image.url} alt="" width="100"/>
                                <Stack rowGap={1} mx={1}>
                                    <Button size={'small'} variant={'outlined'}
                                            onClick={() => onImageRemove(index)}>Удалить</Button>
                                </Stack>
                            </div>
                        ))}
                    </Stack>
                </Stack>
            )}
        </ImageUploading>
    );
}