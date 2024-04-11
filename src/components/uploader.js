import React from 'react';
import ImageUploading from 'react-images-uploading';
import {Button, Stack} from "@mui/material";
import {scaleImage} from "./CardImage";
import {MediaItem} from "./MediaItems";

export function Uploader({files, setFiles}) {
    const onChange = (imageList, addUpdateIndex) => {
        setFiles(imageList);
    };
    console.log(files)
    return (
        <ImageUploading
            multiple
            value={files}
            onChange={onChange}
            maxNumber={10}
            dataURLKey="data_url"
        >
            {({
                  imageList,
                  onImageRemoveAll,
                  onImageRemove,
              }) => (
                <Stack alignItems={'center'} rowGap={2}>
                    {files.length > 1 &&
                        <Button size={'small'} variant={'contained'} onClick={onImageRemoveAll}>Убрать все
                            файлы</Button>}
                    <Stack
                        // direction={'row'}
                        flexWrap={'wrap'}
                        // alignItems={'center'}
                        // justifyContent={'center'}
                        style={{width: "80%"}}>
                        {imageList.map((file, index) => {
                            return <div key={index} style={{
                                margin: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                maxWidth: 200,
                            }}>
                                <MediaItem data={file}></MediaItem>
                                <p className={'peer hover:cursor-pointer transition-all'}>{file.filename}</p>
                                <Button className={'opacity-0 transition-all peer-hover:!opacity-100'} size={'small'} variant={'outlined'}
                                        onClick={() => onImageRemove(index)}>Удалить</Button>
                            </div>
                        })}
                    </Stack>
                </Stack>
            )}
        </ImageUploading>
    );
}