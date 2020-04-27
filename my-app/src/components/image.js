import * as React from "react";

import ImageUploading from "react-images-uploading";
import './../css/imageUploading.css';

const maxNumber = 10;
const maxMbFileSize = 5;
class Example extends React.Component {
  onChange = (imageList) => {
    // data for submit
    console.log(imageList);
    this.props.callback(imageList);
  };

  render() {
    return (
      <ImageUploading
        onChange={this.onChange}
        maxNumber={maxNumber}
        multiple
        maxFileSize={maxMbFileSize}
        acceptType={["jpg", "gif", "png"]}
      >
        {({ imageList, onImageUpload, onImageRemoveAll }) => (
          // write your building UI
          <div>
            <button onClick={onImageUpload} className="image-button">Upload images</button>

            {imageList.map((image) => (
              <div key={image.key}>
                <img src={image.dataURL} className="thumbnail"/>
                <button onClick={image.onRemove} className="image-button">Remove</button>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    );
  }
}

export default Example;
