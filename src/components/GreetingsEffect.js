export default function GreetingsEffect({ $app }) {
  this.$target = document.createElement("div");
  this.$target.className = "message-container";
  this.$target.innerHTML = `
        <div class="message"></div>
    `;

  $app.appendChild(this.$target);
}
