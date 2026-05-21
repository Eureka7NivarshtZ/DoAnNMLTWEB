const contactForm = document.getElementById("contactForm");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupText = document.getElementById("popupText");
const popupIcon = document.getElementById("popupIcon");
const popupBtn = document.getElementById("popupBtn");

function showPopup(title, message, type) {
  popupTitle.textContent = title;
  popupText.textContent = message;
  if (type === "success") {
    popupIcon.textContent = "✅";
    popup.classList.add("show");
  }
}
popupBtn.addEventListener("click", function () {
  popup.classList.remove("show");
});

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!contactForm.checkValidity()) {
    showPopup("Lỗi", "Vui lòng nhập đầy đủ thông tin!", "error");
    return;
  }
  showPopup("Thành công", "Gửi liên hệ thành công ", "success");
  contactForm.reset();
});
