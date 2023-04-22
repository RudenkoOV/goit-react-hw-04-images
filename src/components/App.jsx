
import { Toaster } from 'react-hot-toast';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { AppMain } from './App.styled';

import { useEffect, useState } from 'react';
import { getImages } from 'services/fetch';
import { toast } from 'react-hot-toast';


export function App() {
  const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  };
  
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImgURL, setLargeImgURL] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [endOfImage, setEndOfImage] = useState(false);

    const createSearchText = searchText => {
    setSearchText(searchText);
    };
  
  const closeModal = () => {
    setIsShowModal(false);
  };

  useEffect(() => {
    if (searchText)
      toast.success('Больше картинок не найдено.', {
        position: 'top-center',
        duration: 1500,
      });
  }, [endOfImage]);

  useEffect(() => {
    setCurrentPage(1);
    if (searchText) {
      setStatus(STATUS.PENDING);
      setIsLoadMore(true);
      getImages(searchText, 1)
        .then(data => {
          if (data.totalHits === 0) {
            setStatus(STATUS.RESOLVED);
            setIsLoadMore(false);
            toast.error('Ничего не найдено. Попробуйте изменить запрос.', {
              position: 'top-center',
              duration: 1500,
            });
          } else if (Math.floor(data.totalHits / currentPage) < 12) {
            setStatus(STATUS.RESOLVED);
            setIsLoadMore(false);
            setEndOfImage(!endOfImage);
          }
          if (data.status === 'error') {
            return Promise.reject(data.message);
          }
          const imageArr = data.hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id,
              tags,
              webformatURL,
              largeImageURL,
            })
          );

          setImages(imageArr);
          setStatus(STATUS.RESOLVED);
        })
        .catch(() => {
          setStatus(STATUS.REJECTED);
        });
    }
  }, [searchText]);

  useEffect(() => {
    if (currentPage === 1) return;
    if (searchText) {
      setStatus(STATUS.PENDING);
      setIsLoadMore(true);
      // console.log('fetch from pageeffect');
      getImages(searchText, currentPage)
        .then(data => {
          if (data.totalHits === 0) {
            setStatus(STATUS.RESOLVED);
            setIsLoadMore(false);
            toast.error('Ничего не найдено. Попробуйте изменить запрос.', {
              position: 'top-center',
              duration: 1500,
            });
          } else if (Math.floor(data.totalHits / currentPage) < 12) {
            setStatus(STATUS.RESOLVED);
            setIsLoadMore(false);
            setEndOfImage(!endOfImage);
          }
          if (data.status === 'error') {
            return Promise.reject(data.message);
          }
          const imageArr = data.hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id,
              tags,
              webformatURL,
              largeImageURL,
            })
          );
          if (currentPage !== 1) {
            setImages(prev => [...prev, ...imageArr]);
          } else {
            setImages(imageArr);
          }
          setStatus(STATUS.RESOLVED);
        })
        .catch(() => {
          setStatus(STATUS.REJECTED);
        });
    }
  }, [currentPage]);

  const loadMoreBtn = () => {
    setCurrentPage(prev => prev + 1);
  };

  const imageClick = e => {
    const imageId = e.target.id;
    const index = images.findIndex(
      image => Number(image.id) === Number(imageId)
    );
    const largeImage = images[index].largeImageURL;
    setLargeImgURL(largeImage);
    setIsShowModal(true);
  };
  const props = { status, currentPage, isShowModal, largeImgURL, closeModal, images, imageClick, isLoadMore, loadMoreBtn };
  console.log(props);
  return (
    <AppMain>
      <Toaster />
      <Searchbar createSearchText={createSearchText} />
      <ImageGallery props={props} />
    </AppMain>
  );
}
