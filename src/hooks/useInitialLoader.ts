import { useState, useEffect } from 'react';

/**
 * Hook для управления начальной загрузкой сайта
 * Показывает лоадер пока загружаются критические ресурсы
 */
export const useInitialLoader = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Проверяем, был ли сайт уже загружен в этой сессии
    const hasLoaded = sessionStorage.getItem('siteInitiallyLoaded');
    
    if (hasLoaded === 'true') {
      setIsInitialLoading(false);
      setLoadingProgress(100);
      return;
    }

    const startTime = Date.now();
    const minLoadingTime = 10000; // Минимум 10 секунд как запрашивалось
    const maxLoadingTime = 15000; // Максимум 15 секунд (защита от зависания)
    
    let isFinished = false;

    // Плавное увеличение прогресса
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 85) return prev; // Останавливаемся на 85% для ожидания ресурсов
        const increment = Math.random() * 4 + 1; // От 1% до 5% за раз
        return Math.min(prev + increment, 85);
      });
    }, 200); // Обновляем каждые 200мс для плавности

    // Функция проверки загрузки ресурсов
    const checkResourcesLoaded = () => {
      // Проверяем что DOM готов
      if (document.readyState !== 'complete') {
        return false;
      }

      // Проверяем что все изображения загружены
      const images = Array.from(document.querySelectorAll('img'));
      const allImagesLoaded = images.length === 0 || images.every(img => {
        if (img.complete && img.naturalHeight !== 0) return true;
        if (img.src.includes('data:') || img.src.includes('blob:')) return true; // Skip data URLs
        return false;
      });
      
      // Проверяем что все видео готовы (метаданные загружены)
      const videos = Array.from(document.querySelectorAll('video'));
      const allVideosReady = videos.length === 0 || videos.every(video => {
        // Проверяем, что видео имеет минимально необходимые метаданные
        return video.readyState >= 1; // HAVE_METADATA
      });

      // Проверяем что критические элементы страницы готовы
      const criticalElements = document.querySelectorAll('main, header, [data-animate]');
      const elementsReady = criticalElements.length > 0;

      return allImagesLoaded && allVideosReady && elementsReady;
    };

    // Проверяем готовность каждые 300мс
    const checkInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const resourcesReady = checkResourcesLoaded();

      // Условие завершения:
      // 1. Прошло минимум 10 секунд И ресурсы загружены
      // ИЛИ
      // 2. Прошло максимум 15 секунд (принудительно)
      if ((elapsed >= minLoadingTime && resourcesReady) || elapsed >= maxLoadingTime) {
        if (!isFinished) {
          isFinished = true;
          finishLoading();
        }
      }
    }, 300);

    // Дополнительная проверка для видео - прослушиваем события загрузки
    const handleVideoLoad = () => {
      // Проверяем все видео на странице
      const videos = Array.from(document.querySelectorAll('video'));
      videos.forEach(video => {
        // Добавляем обработчики событий загрузки видео
        video.addEventListener('loadeddata', () => {
          console.log('Video loaded:', video.src);
        });
        video.addEventListener('canplaythrough', () => {
          console.log('Video can play through:', video.src);
        });
        // Предзагружаем метаданные
        if (video.preload !== 'metadata') {
          video.preload = 'metadata';
        }
      });
    };

    // Запускаем проверку видео через небольшую задержку
    setTimeout(handleVideoLoad, 1000);

    function finishLoading() {
      clearInterval(progressInterval);
      clearInterval(checkInterval);
      
      // Доводим прогресс до 100% с плавным переходом
      setLoadingProgress(100);
      
      // Небольшая задержка для плавности анимации завершения
      setTimeout(() => {
        setIsInitialLoading(false);
        sessionStorage.setItem('siteInitiallyLoaded', 'true');
        
        // Добавляем класс для запуска анимаций на главной странице
        document.body.classList.add('initial-load-complete');
        
        // Добавляем событие для уведомления других компонентов
        window.dispatchEvent(new CustomEvent('initialLoadComplete'));
      }, 800);
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(checkInterval);
    };
  }, []);

  return { isInitialLoading, loadingProgress };
};