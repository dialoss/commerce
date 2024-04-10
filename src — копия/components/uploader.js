import React, {useEffect, useState} from 'react';
import ImageUploading from 'react-images-uploading';
import {Button, Checkbox, FormControlLabel, MenuItem, Stack, TextField, Typography} from "@mui/material";
import {scaleImage} from "./CardImage";

export function Uploader({files, setFiles}) {
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        setFiles(imageList);
    };
    console.log(files)
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
                <Stack alignItems={'center'} rowGap={2}>
                    {files.length > 1 && <Button size={'small'} variant={'contained'} onClick={onImageRemoveAll}>Убрать все
                        файлы</Button>}
                    <Stack direction={'row'} flexWrap={'wrap'} alignItems={'center'} justifyContent={'center'}
                           style={{width: "80%"}}>
                        {imageList.map((image, index) => (
                            <div key={index} style={{margin: 5, display:'flex',flexDirection:'column', alignItems:'center'}}>
                                {/*<p>{image}</p>*/}
                                <img src={scaleImage(image.url, 0, 200)} alt="" width="100"/>
                                <p>{image.filename}</p>
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