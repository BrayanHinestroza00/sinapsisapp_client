import DropZone from "./DropZone";

import { img, thumb, thumbInner, thumbsContainer } from "./styled";

import { HOST } from "src/app/Shared/utils/apiConstants";

function DropZoneComponent({ upFiles, files, filesUrl, ...props }) {
  return (
    <>
      <DropZone upFiles={upFiles} files={files} props={props} />
      {(files || filesUrl) && (
        <aside style={thumbsContainer}>
          <div style={thumb}>
            <div style={thumbInner}>
              <img
                src={
                  files
                    ? URL.createObjectURL(files[0])
                    : filesUrl
                    ? `${HOST}/${filesUrl}`
                    : ""
                }
                style={img}
                alt={files ? files[0].name : filesUrl}
              />
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

export default DropZoneComponent;
