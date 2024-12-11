document.addEventListener("DOMContentLoaded", function () {
	// Ищем все iframe с классом "vk-video"
	const iframes = document.querySelectorAll("iframe.vk-video");

	function playVideo(iframe) {
		return new Promise((resolve) => {
			let videoSrc = iframe.src;

			videoSrc += "&autoplay=1";

			// Создаем контейнер для превью
			const previewContainer = document.createElement("div");
			previewContainer.className = "videoplayer_thumb";
			const previewImageUrl = iframe.getAttribute("data-logo-src");
			if (previewImageUrl) {
				previewContainer.style.backgroundImage = `url(${previewImageUrl})`;
			} else {
				previewContainer.style.backgroundImage = `url('https://tiku.ru/wp-content/themes/Tiku/img/tiku-pattern.webp')`;
			}

			// Создаем контейнер для иконки плей
			const playIconContainer = document.createElement("div");
			playIconContainer.className = "play-icon-container";
			const playIcon = document.createElement("div");
			playIcon.className = "play-icon";
			playIcon.innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="#ffffff" viewBox="0 0 256 256"><path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path></svg>
			`;

			// Добавляем иконку в контейнер
			playIconContainer.appendChild(playIcon);
			previewContainer.appendChild(playIconContainer);

			// Заменяем iframe на контейнер с превью
			iframe.parentNode.replaceChild(previewContainer, iframe);

			// Добавляем событие клика на превью
			previewContainer.addEventListener("click", function () {
				// Восстанавливаем iframe с автозапуском
				const newIframe = document.createElement("iframe");
				newIframe.src = videoSrc;
				newIframe.width = iframe.width;
				newIframe.height = iframe.height;
				newIframe.allow = iframe.allow;
				newIframe.frameborder = iframe.frameborder;
				newIframe.allowFullscreen = iframe.allowFullscreen;
				newIframe.className = iframe.className;

				previewContainer.parentNode.replaceChild(newIframe, previewContainer);
			});
		});
	}
	Promise.all(Array.from(iframes).map((iframe) => playVideo(iframe))).then(
		() => {
			console.log("All videos are ready to play");
		},
	);
});
