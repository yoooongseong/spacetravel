const planets = [
    { name: "Mercury", imageSrc: "images/mercury.png", size: 70, fact: "Mercury is the smallest planet.", wiki: "https://en.wikipedia.org/wiki/Mercury_(planet)", x: 100, y: 250 },
    { name: "Venus", imageSrc: "images/venus.png", size: 98, fact: "Venus is the hottest planet.", wiki: "https://en.wikipedia.org/wiki/Venus", x: 300, y: 290 },
    { name: "Earth", imageSrc: "images/earth.png", size: 100, fact: "Earth is the only planet known to support life.", wiki: "https://en.wikipedia.org/wiki/Earth", x: 700, y: 300 },
    { name: "Mars", imageSrc: "images/mars.png", size: 70, fact: "Mars is known as the Red Planet.", wiki: "https://en.wikipedia.org/wiki/Mars", x: 500, y: 320 },
    { name: "Jupiter", imageSrc: "images/jupiter.png", size: 300, fact: "Jupiter is the largest planet.", wiki: "https://en.wikipedia.org/wiki/Jupiter", x: 1000, y: 260 },
    { name: "Saturn", imageSrc: "images/saturn.png", size: 300, fact: "Saturn has spectacular rings.", wiki: "https://en.wikipedia.org/wiki/Saturn", x: 1400, y: 315 },
    { name: "Uranus", imageSrc: "images/uranus.png", size: 200, fact: "Uranus rotates on its side.", wiki: "https://en.wikipedia.org/wiki/Uranus", x: 1800, y: 300 },
    { name: "Neptune", imageSrc: "images/neptune.png", size: 360, fact: "Neptune is the farthest planet.", wiki: "https://en.wikipedia.org/wiki/Neptune", x: 2200, y: 300 }
  ];


let scale = 0.2; // 초기 확대 배율
let infoBoxes = []; // 행성 이미지 및 이름 박스들
let detailBox = null; // 행성 상세 정보 박스 추적
const baseX = window.innerWidth / 2;
const baseY = window.innerHeight / 2;

// 행성 박스를 HTML 요소로 생성하여 표시하는 함수
function drawPlanets() {
    // 기존 행성 박스들을 모두 제거
    infoBoxes.forEach(box => box.remove());
    infoBoxes = [];

    planets.forEach((planet) => {
        const screenX = (planet.x - baseX) * scale + baseX;
        const screenY = (planet.y - baseY) * scale + baseY;
        const boxSize = planet.size * scale;

        // 이미지 및 이름 박스 생성
        const box = document.createElement("div");
        box.className = "info-box";
        box.style.position = "absolute";
        box.style.left = `${screenX}px`;
        box.style.top = `${screenY}px`;
        box.style.width = `${boxSize}px`;
        box.style.border = "2px solid rgba(255, 255, 255, 0.7)";
        box.style.backgroundColor = "#333";
        box.style.color = "white";
        box.style.borderRadius = "10px";
        box.style.overflow = "hidden";

        // 상단 이미지 칸
        const imageContainer = document.createElement("div");
        imageContainer.style.cursor = "pointer";
        const image = document.createElement("img");
        image.src = planet.imageSrc;
        image.style.width = "100%";
        image.style.height = "auto";
        imageContainer.appendChild(image);

        // 하단 이름 칸
        const nameContainer = document.createElement("div");
        nameContainer.style.textAlign = "center";
        nameContainer.style.fontSize = `${14 * scale}px`; // 확대/축소에 비례하는 폰트 크기
        nameContainer.style.padding = "5px";
        nameContainer.innerText = planet.name;

        box.appendChild(imageContainer);
        box.appendChild(nameContainer);
        document.body.appendChild(box);

        // 이미지 클릭 시 상세 정보 박스 생성
        imageContainer.onclick = () => createDetailBox(planet, screenX + boxSize + 20, screenY);

        infoBoxes.push(box);
    });
}

// 행성 상세 정보 박스 생성 함수
function createDetailBox(planet, screenX, screenY) {
    // 기존 상세 정보 박스가 있으면 제거
    if (detailBox) {
        detailBox.remove();
        detailBox = null;
    }

    // 새로운 상세 정보 박스 생성
    const box = document.createElement("div");
    box.className = "fact-box";
    box.style.position = "absolute";
    box.style.left = `${screenX}px`;
    box.style.top = `${screenY}px`;
    box.style.width = "200px";
    box.style.border = "1px solid #ddd";
    box.style.backgroundColor = "#333";
    box.style.color = "white";
    box.style.borderRadius = "10px";
    box.style.padding = "10px";
    box.innerHTML = `
      <p>${planet.fact}</p>
      <a href="${planet.wiki}" target="_blank" style="color: #ffdd57;">더 알아보기</a>
    `;
    document.body.appendChild(box);

    detailBox = box;
}

// 확대/축소 이벤트
window.addEventListener("wheel", (event) => {
    event.preventDefault();
    scale += event.deltaY * -0.001;

    // 확대/축소 배율 제한
    scale = Math.min(Math.max(scale, 0.1), 2.0);

    drawPlanets(); // 확대/축소된 상태로 행성 박스를 다시 그림
});

// 전체 문서 클릭 이벤트 추가
document.addEventListener("click", (event) => {
    // 클릭된 요소가 박스가 아닐 경우 상세 정보 박스를 제거
    if (!event.target.closest('.info-box') && !event.target.closest('.fact-box')) {
        if (detailBox) {
            detailBox.remove();
            detailBox = null;
        }
    }
});

// 초기 화면에 행성 박스를 생성하여 표시
drawPlanets();
