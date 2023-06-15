import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';

import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/navigation/navigation.min.css';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { HeartButton } from '../../components/HeartButton';
import { Slider } from '../../components/Slider/Slider';
import { PhoneItem } from '../../types/PhoneItem';
import { getOnePhone, getPhones } from '../../api/phones';
import { Phone } from '../../types/Phone';
import { phoneTemplate } from '../../utils/phoneTemplate';

SwiperCore.use([Pagination]);

export const AboutPage: React.FC = () => {
  const { pathname } = useLocation();

  const [phones, setPhones] = useState<Phone[]>([]);
  const [device, setDevice] = useState<PhoneItem>(phoneTemplate);
  const [newPath, setNewPath] = useState<string>('');
  const category = 'Cart page';
  const currentPage = device.name.split(' ').slice(1, 4).join(' ');

  const loadPhone = async () => {
    try {
      const deviceFromServer = await getOnePhone(pathname);

      setDevice(deviceFromServer);
    } catch {
      // eslint-disable-next-line no-console
      console.log('failed to load phone');
    }
  };

  const loadPhones = async () => {
    const { visiblePhones: phonesFromServer } = await getPhones();

    setPhones(phonesFromServer);
  };

  const heartGaget = phones.find(({ phoneId }) => {
    return phoneId === device.id;
  });

  const onCapacityHandler = (
    capacity?: string,
    color?: string,
  ) => {
    let newPathName = '';

    if (capacity) {
      const deviceCapacity = device.capacity.toLowerCase();
      const avalibleCapacity = capacity.toLowerCase();

      newPathName = pathname.replace(deviceCapacity, avalibleCapacity);
    }

    if (color) {
      const deviceColor = device.color.toLowerCase();
      const avalibleColor = color.toLowerCase();

      newPathName = pathname.replace(deviceColor, avalibleColor);
    }

    setNewPath(() => newPathName);
  };

  useEffect(() => {
    loadPhones();
  }, []);

  useEffect(() => {
    loadPhone();
    window.scrollTo(0, 0);
  }, [pathname, newPath]);

  return (
    <main className="main-page-card">
      <div className="container">
        <Breadcrumbs category={category} currentPage={currentPage} />

        <div className="card-page__grid">
          <h1 className="card-page__title card-page__title_grid">
            {device.name}
          </h1>

          <section className="card-page__slider">
            <div className="card-page__slider-container">
              <Swiper
                direction="horizontal"
                id="swiper-1"
                slidesPerView={1}
                spaceBetween={30}
                loop
                pagination={{
                  clickable: true,
                  renderBullet: (index, className) => {
                    return `<div class="${className}">
                         <img class="bullet-image" src=${device.images[index]} alt="icon" />
                    </div>`;
                  },
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {device.images.map(image => {
                  return (
                    <SwiperSlide key={image}>
                      <div className="imgSwipe">
                        <img
                          src={image}
                          alt="sfasdf"
                          className="imgSwipe__image"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </section>

          <section className="card-page__settings settings">
            <div className="settings__color-container">
              <p className="settings__title">Available colors</p>
              <p className="settings__title">
                {heartGaget && `ID: ${heartGaget.id}`}
              </p>
            </div>

            <div className="settings__colors">
              {device.colorsAvailable.map(color => (
                <Link
                  to={newPath}
                  className="settings__button-color"
                  key={color}
                  style={{ border: `1px solid ${color}` }}
                  onClick={() => onCapacityHandler('', color)}
                >
                  <span
                    title={color}
                    className="settings__color settings__color_dynamic"
                    style={{ backgroundColor: color }}
                  >
                    { }
                  </span>
                </Link>
              ))}
            </div>

            <p className="settings__title">Select capacity</p>

            <div className="settings__capacities">
              {device.capacityAvailable.map(capacity => {
                return (
                  <Link
                    to={newPath}
                    key={capacity}
                    className={cn(
                      'settings__button-capacity',
                      // eslint-disable-next-line
                      { 'settings__button-capacity_active': device.capacity === capacity },
                    )}
                    onClick={() => onCapacityHandler(capacity)}
                  >
                    {capacity}
                  </Link>
                );
              })}
            </div>

            <div className="settings__price-container">
              <p className="settings__price">
                &#x24;
                {device.priceRegular || device.priceDiscount}
              </p>

              {device.priceRegular && (
                <p className="settings__price settings__price_not-actual">
                  <del>
                    &#x24;
                    {device.priceRegular}
                  </del>
                </p>
              )}

              <div className="settings__buttons-container">
                <button type="button" className="settings__button">
                  Add to cart
                </button>
                <button type="button" className="settings__like">
                  {heartGaget && <HeartButton gadget={heartGaget} />}
                </button>
              </div>
            </div>

            <div className="settings__parameters characteristic">
              <p className="characteristic__description
              characteristic__description_key"
              >
                Screen
              </p>

              <p className="characteristic__description
              characteristic__description_value"
              >
                {device.screen}
              </p>

              <p className="characteristic__description
              characteristic__description_key"
              >
                Resolution
              </p>

              <p className="characteristic__description
              characteristic__description_value"
              >
                {device.resolution}
              </p>

              <p className="characteristic__description
              characteristic__description_key"
              >
                Processor
              </p>

              <p className="characteristic__description
              characteristic__description_value"
              >
                {device.processor}
              </p>

              <p className="characteristic__description
              characteristic__description_key"
              >
                RAM
              </p>

              <p className="characteristic__description
              characteristic__description_value"
              >
                {device.ram}
              </p>
            </div>
          </section>

          <section className="card-page__about about">
            <h2 className="about__title">
              About
            </h2>

            <div className="about__description">
              <h3 className="about__subtitle">
                {device.description[0].title}
              </h3>
              <p className="about__text">
                {device.description[0].text[0]}
              </p>
              <p className="about__text">
                {device.description[0].text[1]}
              </p>
            </div>

            <div className="about__description">
              <h3 className="about__subtitle">
                {device.description[1].title}
              </h3>
              <p className="about__text">
                {device.description[1].text[0]}
              </p>
            </div>

            <div className="about__description">
              <h3 className="about__subtitle">
                {device.description[2].title}
              </h3>
              <p className="about__text">
                {device.description[2].text[0]}
              </p>
            </div>
          </section>

          <section className="card-page__tech-specs tech-specs">
            <h2 className="about__title">
              Tech specs
            </h2>

            <div className="settings__parameters tech-specs-parameters">
              <p className="tech-specs-parameters__description
              tech-specs-parameters__description_key"
              >
                Screen
              </p>

              <p className="tech-specs-parameters__description
              tech-specs-parameters__description_value"
              >
                {device.screen}
              </p>

              <p className="tech-specs-parameters__description
              tech-specs-parameters__description_key"
              >
                Resolution
              </p>

              <p className="tech-specs-parameters__description
              tech-specs-parameters__description_value"
              >
                {device.resolution}
              </p>

              <p className="tech-specs-parameters__description
              tech-specs-parameters__description_key"
              >
                Processor
              </p>

              <p className="tech-specs-parameters__description
              tech-specs-parameters__description_value"
              >
                {device.processor}
              </p>

              <p className="tech-specs-parameters__description
              tech-specs-parameters__description_key"
              >
                RAM
              </p>

              <p className="tech-specs-parameters__description
              tech-specs-parameters__description_value"
              >
                {device.ram}
              </p>

              <p className="tech-specs-parameters__description
              tech-specs-parameters__description_key"
              >
                Built in memory
              </p>

              <p className="tech-specs-parameters__description
              tech-specs-parameters__description_value"
              >
                {device.capacityAvailable}
              </p>

              <p className="tech-specs-parameters__description
              tech-specs-parameters__description_key"
              >
                Camera
              </p>

              <p className="tech-specs-parameters__description
              tech-specs-parameters__description_value"
              >
                {device.camera}
              </p>

              <p className="tech-specs-parameters__description
              tech-specs-parameters__description_key"
              >
                Zoom
              </p>

              <p className="tech-specs-parameters__description
              tech-specs-parameters__description_value"
              >
                {device.zoom}
              </p>

              <p className="tech-specs-parameters__description
              tech-specs-parameters__description_key"
              >
                Cell
              </p>

              <p className="tech-specs-parameters__description
              tech-specs-parameters__description_value"
              >
                {device.cell.join(', ')}
              </p>
            </div>
          </section>

          <section className="card-page__bottom-slider bottom-slider">
            <div className="bottom-slider__container">
              <Slider
                title="You may also like"
                gadgets={phones}
                navButtons={{
                  prevEl: '.models-slider-button-prev',
                  nextEl: '.models-slider-button-next',
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
