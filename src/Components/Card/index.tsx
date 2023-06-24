import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";

interface CardProps {
    title: string;
    route: string;
  }
  
  interface Info {
    title: string;
    thumbnail: {
        path: string;
        extension: string;
      };
  }

const token = 'feb88b10b6a916f1c2cb8a3e3f608f31'

export const Card = ({ title, route }: CardProps) => {

    const [info, setInfo] = useState<Info[]>([]);

    useEffect(() => {
        const url = route + '?apikey=' + token;
        axios.get(url).then((response) => {
            setInfo(response.data.data.results);
        });
    }, [route]);

  return (
    <CardContainer>
        {info.length > 0 &&
            <>
                <Title>{title}</Title>
                <CardBody>
                    <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                    clickable: true,
                    }}
                    breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {info.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img
                            src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                            alt={item.title}></img>
                            <p key={index}>{item.title}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
                </CardBody>
            </>
        }
    </CardContainer>
  );
}

const CardContainer = styled.h3`
    display:flex;
    flex-direction:column;
`;

const Title = styled.h3`
    color:#fff;
`;

const CardBody = styled.div`
    width: 100%;
    height: 460px;
    padding:20px;
    gap:20px;
    max-width:840px;
    margin:auto;
    background-color:rgba(255,255,255,0.2);
    border-radius:10px;
    img {
        width:100%;
        height:360px;
        object-fit:cover;
        border-radius:10px;
    }
    p {
        color:#fff;
        font-size:14px;
        font-family: 'Marvel', sans-serif;
        text-align:center;
        margin-bottom:40px;
    }
    @media (max-width: 840px) {
        width: calc(100% - 40px);
    }
    @media (max-width: 640px) {
        height: 560px;
    }
    @media (max-width: 640px) {
        img {
            height: 470px;
        }
    }
`;