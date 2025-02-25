import { useState, useRef, useEffect, useCallback } from "react";
import * as LR from "@uploadcare/react-uploader";
import { FileEntry } from "@/types";
import {
  FileUploaderRegular,
  OutputFileEntry,
} from "@uploadcare/react-uploader";

import "@uploadcare/react-uploader/core.css";

interface IFileUploaderProps {
  fileEntry: FileEntry;
  onChange: (fileEntry: FileEntry) => void;
  preview: boolean;
}

const localeDefinitionOverride = {
  en: {
    "upload-file": "Upload photo",
    "upload-files": "Upload photos",
    "choose-file": "Choose photo",
    "choose-files": "Choose photos",
    "drop-files-here": "Drop photos here",
    "select-file-source": "Select photo source",
    "edit-image": "Edit photo",
    "no-files": "No photos selected",
    "caption-edit-file": "Edit photo",
    "files-count-allowed": "Only {{count}} {{plural:photo(count)}} allowed",
    "files-max-size-limit-error":
      "Photo is too big. Max photo size is {{maxFileSize}}.",
    "header-uploading": "Uploading {{count}} {{plural:photo(count)}}",
    "header-succeed": "{{count}} {{plural:photo(count)}} uploaded",
    "header-total": "{{count}} {{plural:photo(count)}} selected",
    photo__one: "photo",
    photo__many: "photos",
    photo__other: "photos",
  },
};

const FileUploader: React.FunctionComponent<IFileUploaderProps> = ({
  fileEntry,
  onChange,
  preview,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry[]>([]);
  const ctxProviderRef = useRef<InstanceType<LR.UploadCtxProvider>>(null);

  // const handleRemoveClick = useCallback(
  //   (uuid: OutputFileEntry["uuid"]) =>
  //     onChange({ files: fileEntry.files.filter((f) => f.uuid !== uuid) }),
  //   [fileEntry.files, onChange]
  // );

  // const [files, setFiles] = useState<OutputFileEntry[]>([]);

  const handleRemoveClick = useCallback(
    (uuid: OutputFileEntry["uuid"]) => {
      const updatedFiles = uploadedFiles.filter((f) => f.uuid !== uuid);
      setUploadedFiles(updatedFiles);
      onChange({ files: updatedFiles });
      console.log("File removed:", uuid);
    },
    [uploadedFiles, onChange]
  );

  useEffect(() => {
    const handleUploadEvent = (e: CustomEvent<OutputFileEntry[]>) => {
      if (e.detail) {
        setUploadedFiles([...e.detail]);
      }
    };
    ctxProviderRef.current?.addEventListener("data-output", handleUploadEvent);
    return () => {
      ctxProviderRef.current?.removeEventListener(
        "data-output",
        handleUploadEvent
      );
    };
  }, [setUploadedFiles]);

  useEffect(() => {
    const resetUploaderState = () =>
      ctxProviderRef.current?.uploadCollection.clearAll();

    const handleDoneFlow = () => {
      resetUploaderState();
      onChange({ files: [...uploadedFiles] });
      setUploadedFiles([]);
    };

    ctxProviderRef.current?.addEventListener("done-flow", handleDoneFlow);

    return () => {
      ctxProviderRef.current?.removeEventListener("done-flow", handleDoneFlow);
    };
  }, [fileEntry, onChange, uploadedFiles, setUploadedFiles]);

  const handleChangeEvent = (files) => {
    setUploadedFiles([
      ...files.allEntries.filter((f) => f.status === "success"),
    ]);
  };

  // const resetUploaderState = () =>
  //   ctxProviderRef.current?.uploadCollection.clearAll();

  const handleModalCloseEvent = () => {
    // resetUploaderState();

    onChange({ files: [...uploadedFiles] });

    // setUploadedFiles([]);
  };

  return (
    <div>
      <FileUploaderRegular
        imgOnly
        multiple={preview}
        removeCopyright
        confirmUpload={false}
        localeDefinitionOverride={localeDefinitionOverride}
        apiRef={ctxProviderRef}
        onModalClose={handleModalCloseEvent}
        onChange={handleChangeEvent}
        pubkey="d36606b1fe6a334b4ab4"
        sourceList="local, url, camera, dropbox"
        classNameUploader="uc-light"
      />

      {preview ? (
        <div className="grid grid-cols-2 gap-4 mt-8">
          {uploadedFiles.map((file) => (
            <div key={file.uuid} className="relative">
              <img
                key={file.uuid}
                src={`${file.cdnUrl}/-/format/webp/-/quality/smart/-/stretch/fill/`}
              />

              <div className="cursor-pointer flex justify-center absolute -right-2 -top-2 bg-white border-2 border-slate-800 rounded-full w-7 h-7">
                <button
                  className="text-slate-800 text-center"
                  type="button"
                  onClick={() => handleRemoveClick(file.uuid)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FileUploader;
