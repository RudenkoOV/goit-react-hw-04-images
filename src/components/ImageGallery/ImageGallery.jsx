/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { LoadMoreBtn } from 'components/Button/Button';
import { toast } from 'react-hot-toast';

export default function ImageGallery(props) { 
  const { status, currentPage, isShowModal, largeImgURL, closeModal, images, imageClick, isLoadMore, loadMoreBtn } = props.props;
  console.log(props);
  const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  };
  return (
    <>
      {status === STATUS.PENDING && currentPage === 1 && <Loader />}
      {isShowModal && (
        <Modal largeImageURL={largeImgURL} closeModal={closeModal} />
      )}
      {images.length > 0 && (
        <>
          <ImageGalleryList onClick={e => imageClick(e)}>
            {images.map(image => {
              return (
                <ImageGalleryItem
                  webformatURL={image.webformatURL}
                  key={image.id}
                  id={image.id}
                  tags={image.tags}
                />
              );
            })}
          </ImageGalleryList>
          {status === STATUS.RESOLVED && isLoadMore && (
            <LoadMoreBtn onClick={loadMoreBtn} />
          )}
          {status === STATUS.PENDING && <Loader />}
        </>
      )}
      {status === STATUS.REJECTED &&
        toast.error('Что-то пошло не так ...', {
          position: 'top-center',
          duration: 2000,
        })}
    </>
  );
}

ImageGallery.propTypes = {
  props: PropTypes.object.isRequired,
};
