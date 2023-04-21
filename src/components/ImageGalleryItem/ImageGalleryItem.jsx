import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export default function ImageGalleryItem (props) {
    return (
      <GalleryItem>
        <GalleryItemImage
          src={props.webformatURL}
          id={props.id}
          alt={props.tags}
        />
      </GalleryItem>
    );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
