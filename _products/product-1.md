---
#site_title: Продукт # Заголовок страницы (вкладка в браузере)
uniclass: product-1 # Это трогать не нужно

#------ Карточка товара ------
title: Вафельные полуфабрикаты # Заголовок, который будет везде отображаться
tumbnail: /assets/images/products/tumb-product-1.png # Изображение для карточки товара

#------ Отдельная страница товара - 1 экран ------
title_section: Вафельные полуфабрикаты # Название продукта на странице
subtitle: Пустые вафельные рожки разноцветные, 18 шт. # Подзаголовок
describe: Вафельный рожок литой, под мороженое, зефир и тд, высота 105 мм, диаметр 47 мм. # Описание под заголовком
size_upakovki: 143x55x187 мм # Размер упаковки
count_in: 8 шт # Кол-во в гофрокоробе
size_gofro: 395x240x150 мм # Размер гофрокороба

#------ Преимущества - 2 экран ------
# Одна карточка состоит из двух полей - img и text. Оба поля нужно заполнять, чтобы они отобазились на странице
advantages:
    - img: /assets/images/icons/sugar.svg
      text: Без добавляения сахара
    - img: /assets/images/icons/hrust.svg
      text: Хрустящая структура
    - img: /assets/images/icons/fasov.svg
      text: Удобная фасовка

#------ Продукция бренда - 3 экран ------
# Обязательные параметры: img - картинка которая будет отображаться
# Необязательные: img_slider - если нужна другая картинка в слайдере на первом экране
# exlude_slider - если НЕ нужно показывать в слайдере на первом экране, возможные значения: true - убрать, false - оставить как было (либо можно просто убрать этот параметр)
# subtitle, describe, size_upakovki, count_in, size_gofro - все настройки как на первом экране
brands_products:
    - img: /assets/images/products/product-1/brands/item-1.png
      img_slider: /assets/images/products/product-1/for-slider/item-1.png
      subtitle: Вафельная крошка, 250 г
      describe: Вафельная крошка для посыпки в изготовлении кондитерских изделий.
      size_upakovki: 143x55x187 мм # Размер упаковки
      count_in: 8 шт # Кол-во в гофрокоробе
      size_gofro: 395x240x150 мм # Размер гофрокороба
    - img: /assets/images/products/product-1/brands/item-2.png
      img_slider: /assets/images/products/product-1/for-slider/item-2.png
      subtitle: Пустые вафельные рожки, 18 шт
      describe: Вафельный рожок литой, под мороженое, зефир и тд, высота 105 мм, диаметр 47 мм.
      size_upakovki: 143x55x187 мм # Размер упаковки
      count_in: 8 шт # Кол-во в гофрокоробе
      size_gofro: 395x240x150 мм # Размер гофрокороба
    - img: /assets/images/products/product-1/brands/item-3.png
      img_slider: /assets/images/products/product-1/for-slider/item-3.png
      img_slider: /assets/images/products/product-1/brands/product-3.png
      subtitle: Вафельная крошка
      describe: Вафельная крошка для кондитерских производств, кондитерских, размер фракции 2-5 мм.
      size_upakovki: 800x400x300 мм # Размер упаковки
      weight: 15 кг # Вес
    - img: /assets/images/products/product-1/brands/item-4.png
      img_slider: /assets/images/products/product-1/for-slider/item-4.png
      subtitle: Вафельный мини-рожок
      describe: Вафельный мини-рожок под кондитерские изделия.
      size_product: высота 60 мм, диаметр 32 мм # Размер изделия
      count_in: 1408 шт # Кол-во в гофрокоробе
      size_gofro: 390х260х225 мм # Размер гофрокороба
    - img: /assets/images/products/product-1/brands/item-5.png
      img_slider: /assets/images/products/product-1/for-slider/item-5.png
      subtitle: Вафельный рожок
      describe: Вафельный рожок, литой, под мороженое, зефир и тд.
      size_product: высота 105 мм, диаметр 47 мм # Размер изделия
      count_in: 500 шт # Кол-во в гофрокоробе
      size_gofro: 390х260х225 мм # Размер гофрокороба
    - img: /assets/images/products/product-1/brands/item-6.png
      img_slider: /assets/images/products/product-1/for-slider/item-6.png
      subtitle: Вафельный стаканчик
      describe: Вафельный стаканчик стандартный под мороженое.
      size_product: высота 77 мм, диаметр 59 мм # Размер изделия
      count_in: 750 шт # Кол-во в гофрокоробе
      size_gofro: 635х325х345 мм # Размер гофрокороба
---