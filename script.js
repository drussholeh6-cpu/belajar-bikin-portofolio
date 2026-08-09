function scrollToContact() {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("contactForm").innerText = 
    "Pesan berhasil dikirim! Terima kasih yah.";
    this.reset();
});