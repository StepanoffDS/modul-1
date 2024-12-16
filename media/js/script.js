document.addEventListener("DOMContentLoaded", function () {
	const burgerMenu = document.querySelector(".header__nav");

	const burgerBtn = document.querySelector(".header__burger");

	burgerBtn.addEventListener("click", () => {
		burgerMenu.classList.toggle("opened");
	});
});
