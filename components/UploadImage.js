import { useCallback, useState } from 'react';
import { STRAPI_URL } from '../constants/strapi';
import urlJoin from 'url-join';
import Image from 'next/image';

const UploadImage = ({ image, setFile }) => {
  const [showUpload, setShowUpload] = useState(!image);

  const handleChange = useCallback((e) => {
    const [file] = e.target.files;
    setFile(file);
  }, []);

  const imageUrl = image.attributes.formats.small.url;

  const width = image.attributes.formats.small.width;
  const height = image.attributes.formats.small.height;

  return (
    <div>
      {!showUpload && (
        <>
          <Image
            src={urlJoin(STRAPI_URL, imageUrl)}
            width={width}
            height={height}
          />

          <button onClick={() => setShowUpload(true)}>Edit</button>
        </>
      )}

      {showUpload && (
        <>
          <input type="file" accept="image/*" onChange={handleChange} />

          {image && (
            <button onClick={() => setShowUpload(false)}>Cancel</button>
          )}
        </>
      )}
    </div>
  );
};

export default UploadImage;
