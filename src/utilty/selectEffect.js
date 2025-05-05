export function showFireworks(message) {
  const $messageContainer = document.querySelector(".message-container");
  const $messageBox = document.querySelector(".message");

  // 메시지 컨테이너 활성화
  $messageContainer.classList.add("active");
  $messageBox.textContent = message;

  // 색종이 조각 생성 (30개)
  createConfetti(30);

  // 1초 후에 메시지 사라지게 하기
  setTimeout(() => {
    $messageBox.style.animation = "fadeOut 0.8s forwards";

    // 애니메이션 완료 후 초기화
    setTimeout(() => {
      $messageContainer.classList.remove("active");
      $messageBox.style.animation = "";

      // 모든 색종이 조각 제거
      const confetti = document.querySelectorAll(".confetti");
      confetti.forEach((item) => item.remove());
    }, 800);
  }, 1000);
}

function createConfetti(count) {
  const $messageContainer = document.querySelector(".message-container");
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "cyan",
  ];
  const shapes = ["rect", "circle", "star"];

  for (let i = 0; i < count; i++) {
    const $confetti = document.createElement("div");

    // 랜덤 속성 설정
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = Math.random() * 15 + 5; // 5~20px 사이 크기

    $confetti.classList.add(
      "confetti",
      `confetti-${randomColor}`,
      `confetti-${randomShape}`
    );

    // 중앙에서 시작
    const startX = 50;
    const startY = 50;

    // 랜덤 방향 (360도 방향으로 퍼짐)
    const angle = Math.random() * Math.PI * 2; // 0-360도 랜덤 각도
    const distance = 50 + Math.random() * 200; // 퍼져나갈 거리

    // 각도에 따른 X, Y 방향 계산
    const xDirection = Math.cos(angle) * distance;
    const yDirection = Math.sin(angle) * distance;

    // CSS 변수로 방향 설정
    $confetti.style.setProperty("--x-direction", `${xDirection}px`);
    $confetti.style.setProperty("--y-direction", `${yDirection}px`);

    const rotation = Math.random() * 360;

    // 크기 및 위치 설정
    $confetti.style.width = `${size}px`;
    $confetti.style.height = `${size}px`;
    $confetti.style.left = `${startX}%`;
    $confetti.style.top = `${startY}%`;
    $confetti.style.transform = `rotate(${rotation}deg)`;

    // 애니메이션 속도를 랜덤하게 설정 (1~2초)
    const explosionDuration = Math.random() * 1 + 1;

    // 애니메이션 적용
    $confetti.style.animation = `confettiExplosion ${explosionDuration}s ease-out forwards`;

    // 시작 지연 랜덤 설정 (0~0.3초)
    $confetti.style.animationDelay = `${Math.random() * 0.3}s`;

    $messageContainer.appendChild($confetti);
  }
}
