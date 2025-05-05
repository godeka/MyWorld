export default function SelectLanguage({ $app, setState }) {
  this.$selectLang = document.createElement("div");
  this.$selectLang.className = "select-lang";
  this.$selectLang.innerHTML = `
    <div class="globe-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            <path d="M2 12h20"></path>
        </svg>
    </div>
      <span class="lang-text active">KO</span>
      <span class="lang-divider">|</span>
      <span class="lang-text">EN</span>
  `;

  this.$selectLang.querySelectorAll(".lang-text").forEach((span) => {
    span.addEventListener("click", () => {
      setState();

      this.$selectLang.querySelectorAll(".lang-text").forEach((el) => {
        el.classList.toggle("active");
      });
    });
  });

  $app.appendChild(this.$selectLang);
}
