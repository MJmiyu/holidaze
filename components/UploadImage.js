import { useCallback, useMemo, useState } from 'react';
import { STRAPI_URL } from '../constants/strapi';
import styles from './UploadImage.module.css';
import urlJoin from 'url-join';
import Image from 'next/image';
import Input from './Input';
import Button from './Button';

const UploadImage = ({ image, setFile }) => {
  const [showUpload, setShowUpload] = useState(!image);

  const handleChange = useCallback(
    (e) => {
      const [file] = e.target.files;
      setFile(file);
    },
    [setFile]
  );

  const { imageUrl, width, height } = useMemo(() => {
    if (!image) {
      return {};
    }

    return {
      imageUrl: image.attributes.formats.small.url,
      width: image.attributes.formats.small.width,
      height: image.attributes.formats.small.height,
    };
  }, [image]);

  return (
    <div className={styles.UploadImageContainer}>
      {!showUpload && (
        <>
          <Image
            alt=""
            src={urlJoin(STRAPI_URL, imageUrl)}
            width={width}
            height={height}
          />

          <Button onClick={() => setShowUpload(true)}>Edit</Button>
        </>
      )}
      {showUpload && (
        <>
          <Input type="file" accept="image/*" onChange={handleChange} />

          {image && (
            <Button onClick={() => setShowUpload(false)}>Cancel</Button>
          )}
        </>
      )}
    </div>
  );
};

export default UploadImage;
