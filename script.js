const canvas = document.getElementById('planetCanvas');
const alien = document.getElementById('alien');
const ufo = document.getElementById('ufo');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const planets = [
    { name: "Death Star", imageSrc: "images/deathstar.png", size: 1, fact: "강력한 슈퍼레이저로 행성을 파괴할 수 있는 무서운 무기를 가지고 있다. 이 슈퍼레이저는 여러 개의 빔이 모여서 하나의 초강력 레이저로 합쳐지면서 발사된다. ", wiki: "https://ko.wikipedia.org/wiki/%EB%8D%B0%EC%8A%A4_%EC%8A%A4%ED%83%80", x: 768, y: 365},
    { name: "LV-426", imageSrc: "images/lv-426.png", size: 9, fact: "", wiki: "https://namu.wiki/w/LV-426", x: 758, y: 370},
    { name: "Oberon", imageSrc: "images/oberon.png", size: 12, fact: "", wiki: "https://ko.wikipedia.org/wiki/%EC%98%A4%EB%B2%A0%EB%A1%A0_(%EC%9C%84%EC%84%B1)", x: 773, y: 348},
    { name: "Pluto", imageSrc: "images/pluto.png", size: 19, fact: "2006년 국제천문연맹(IAU)은 '행성'이라는 용어를 재정의하고 명왕성을 왜행성으로 강등하기로 했다.", wiki: "https://ko.wikipedia.org/wiki/%EB%AA%85%EC%99%95%EC%84%B1", x: 780, y: 375 },
    { name: "Triton", imageSrc: "images/triton.png", size: 21, fact: "", wiki: "https://ko.wikipedia.org/wiki/%ED%8A%B8%EB%A6%AC%ED%86%A4_(%EC%9C%84%EC%84%B1)", x: 740, y: 330},
    { name: "Europa", imageSrc: "images/europa.png", size: 21, fact: "", wiki: "https://ko.wikipedia.org/wiki/%EC%9C%A0%EB%A1%9C%ED%8C%8C_(%EC%9C%84%EC%84%B1)", x: 730, y: 380},
    { name: "Moon", imageSrc: "images/moon.png", size: 25, fact: "달은 매년 약 3.8cm씩 지구에서 멀어지고 있어, 수십억 년 후에는 달이 더 멀어져 지금처럼 큰 달을 볼 수 없을지도 모른다. ", wiki: "https://ko.wikipedia.org/wiki/%EB%8B%AC", x: 790, y: 315},
    { name: "Io", imageSrc: "images/io.png", size: 29, fact: "", wiki: "https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%98%A4_(%EC%9C%84%EC%84%B1)", x: 700, y: 340},
    { name: "Ganymede", imageSrc: "images/ganymede.png", size: 29, fact: "가니메데의 표면 아래에는 지구보다도 많은 물이 존재할 가능성이 높다. 표면 아래 약 150km 깊이에 얼음 층과 액체 바다가 겹겹이 쌓여 있을 것으로 추정된다.", wiki: "https://ko.wikipedia.org/wiki/%EA%B0%80%EB%8B%88%EB%A9%94%EB%8D%B0_(%EC%9C%84%EC%84%B1)", x: 810, y: 360},
    { name: "Asia", imageSrc: "images/asia.png", size: 30, fact: "세계 인구의 약 60%가 아시아에 산다.", wiki: "https://ko.wikipedia.org/wiki/%EC%95%84%EC%8B%9C%EC%95%84", x: 760, y: 410},
    { name: "Callisto", imageSrc: "images/callisto.png", size: 38, fact: "태양계에서 가장 많은 크레이터를 가지고 있다.", wiki: "https://ko.wikipedia.org/wiki/%EC%B9%BC%EB%A6%AC%EC%8A%A4%ED%86%A0_(%EC%9C%84%EC%84%B1)", x: 680, y: 390},
    { name: "Titan", imageSrc: "images/titan.png", size: 40, fact: "타노스의 고향이며, 타이탄의 표면에는 물이 아닌 액체 메탄과 에탄으로 이루어진 호수와 강이 있다.", wiki: "https://ko.wikipedia.org/wiki/%ED%83%80%EC%9D%B4%ED%83%84_(%EC%9C%84%EC%84%B1)", x: 815, y: 415},
    { name: "Mercury", imageSrc: "images/mercury.png", size: 38, fact: "수성의 하루는 1408시간으로, 지구 하루의 약 59배이다.", wiki: "https://en.wikipedia.org/wiki/Mercury_(planet)", x: 720, y: 270 },
    { name: "Mars", imageSrc: "images/mars.png", size: 50, fact: "화성의 표면에 있는 골짜기와 계곡들은 물이 흘렀던 흔적으로 여겨진다. 과거 화성이 더 따뜻하고 습한 환경을 가지고 있었다면, 생명체가 존재했을지도 모른다.", wiki: "https://en.wikipedia.org/wiki/Mars", x: 720, y: 450 },
    { name: "Arrakis", imageSrc: "images/arrakis.png", size: 69, fact: "듄 시리즈의 주 무대인 행성이다. 카노푸스 행성계의 세 번째 행성으로, 행성 전체가 사막으로 되어 있다. 지표면에 물이라고는 한 방울도 없는 데다가 일교차도 엄청나며, 사람의 뼈와 살을 분리할 수 있는 폭풍인 '코리올리 스톰'이 휘몰아치는 무시무시한 곳이다.", wiki: "https://namu.wiki/w/%EC%95%84%EB%9D%BC%ED%82%A4%EC%8A%A4", x: 850, y: 290},
    { name: "Venus", imageSrc: "images/venus.png", size: 90, fact: "바람이 시속 300km까지 엄청 빠르게 분다. 화성의 낮은 지구의 243일이다.", wiki: "https://en.wikipedia.org/wiki/Venus", x: 580, y: 350 },
    { name: "Earth", imageSrc: "images/earth.png", size: 100, fact: "지금까지 밝혀진 지적 생명체가 사는 유일한 행성이다.", wiki: "https://en.wikipedia.org/wiki/Earth", x: 870, y: 420 },
    { name: "Cybertron", imageSrc: "images/cybertron.png", size: 100, fact: "트랜스포머들의 고향 행성이다. 행성 자체가 거대한 기계 도시로 이루어져 있으며, 프라이머스라는 신성한 존재가 깃든 곳이다.", wiki: "https://namu.wiki/w/%EC%82%AC%EC%9D%B4%EB%B2%84%ED%8A%B8%EB%A1%A0", x: 590, y: 200},
    { name: "Neptune", imageSrc: "images/neptune.png", size: 390, fact: "해왕성을 발견한 르베리에는 발견한 직후에 'Neptune'이라는 이름을 제안했다. 하지만 그는 나중에 이 행성의 이름을 자신의 이름인 르베리에로 지으려 했으나 프랑스 이외 지역에서 반대했다.", wiki: "https://en.wikipedia.org/wiki/Neptune", x: 420, y: 500 },    
    { name: "Uranus", imageSrc: "images/uranus.png", size: 400, fact: "핵에는 다이아몬드 비가 쏟아진다. 망원경으로 발견된 최초의 행성이다. 로마 신화가 아닌 그리스 신화에서 영어 이름을 따온 유일한 행성이다.", wiki: "https://en.wikipedia.org/wiki/Uranus", x: 850, y: -250 },
    { name: "Jupiter", imageSrc: "images/jupiter.png", size: 1100, fact: "질량이 지금보다 100배 컸다면 별이 될 뻔했다.", wiki: "https://en.wikipedia.org/wiki/Jupiter", x: 1000, y: 700 },
    { name: "Saturn", imageSrc: "images/saturn.png", size: 940, fact: "태양계에서 유일하게 평균 밀도가 물보다도 작다. 토성을 물이 가득찬 거대한 욕조에 넣을 수 있다면 아마 물에 둥둥 뜰 것이다.", wiki: "https://en.wikipedia.org/wiki/Saturn", x: -500, y: -250 },
    { name: "Calpamos", imageSrc: "images/calpamos.png", size: 1000, fact: "영화 프로메테우스, 에일리언에 등장하는 행성이다. 지구로부터 39광년 떨어진 쌍성인 제타 레티큘리계를 도는 토성형 외계 행성이다.", wiki: "https://namu.wiki/w/%EC%B9%BC%ED%8C%8C%EB%AA%A8%EC%8A%A4", x: -600, y: 700},
    { name: "Sun", imageSrc: "images/sun.png", size: 10900, fact: "태양은 초당 230km의 속도로 이동하며 은하를 돌고 있다. 또한 70~80억년 뒤 적색거성이 되면 지구를 삼킬 수 있을 정도로 거대해진다.", wiki: "https://ko.wikipedia.org/wiki/%ED%83%9C%EC%96%91", x: 3000, y: -2000},
    { name: "Sirius A", imageSrc: "images/sirius a.png", size: 18000, fact: "시리우스는 지구에서 맨눈으로 볼 때는 단독성처럼 보이지만 실제로 이 별은 백색 왜성을 반성으로 거느리고 있는 쌍성계로, 우리 눈으로 볼수 있는 밝은 별은 시리우스 A, 맨눈으로 볼 수 없는 짝별은 시리우스 B이다.", wiki: "https://ko.wikipedia.org/wiki/%EC%8B%9C%EB%A6%AC%EC%9A%B0%EC%8A%A4", x: -25000, y: -15000},
    { name: "Vega", imageSrc: "images/vega.png", size: 29500, fact: "베가는 밤하늘에서 다섯 번째로 밝은 별이다. 베가는 약 1만 2천 년 전에 북극성이었고, 약 1만 3천 년 후 다시 북극성이 될 것이다.", wiki: "https://ko.wikipedia.org/wiki/%EB%B2%A0%EA%B0%80", x: -34000, y: 8000},
    { name: "Sgr A*", imageSrc: "images/sagittarius.png", size: 188500, fact: "Sagittarius A*는 우리 은하의 중심에 위치한 초거대 블랙홀로, 그 질량은 약 400만 배의 태양 질량에 해당한다.", wiki: "https://ko.wikipedia.org/wiki/Sagittarius_A", x: 13000, y: -230000},
    { name: "Polaris", imageSrc: "images/polaris.png", size: 430000, fact: "폴라리스는 하나의 별이 아니라, 폴라리스 A, B, 그리고 AB라는 세 개의 별로 이루어진 삼중성계이다.", wiki: "https://ko.wikipedia.org/wiki/%EB%B6%81%EA%B7%BC%EC%84%B1", x: 200000, y: -120000},
    { name: "++height", imageSrc: "images/height.png", size: 1000000, fact: "전 세계 인구의 평균 신장 1.7m에 인구 80억명을 곱하면 10,000,000km에 달한다.", wiki: "https://namu.wiki/w/%ED%82%A4(%EC%8B%A0%EC%B2%B4)#s-14", x: -1200000, y: -500000}
    
];

let scale = 15.0; // 초기 확대 배율
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
        box.style.backgroundColor = "#333";
        box.style.color = "white";
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
        nameContainer.style.fontSize = `${boxSize * 0.2}px`; // 이미지 크기에 비례한 폰트 크기 설정
        nameContainer.style.padding = "5px";
        nameContainer.innerText = planet.name;

        box.appendChild(imageContainer);
        box.appendChild(nameContainer);
        document.body.appendChild(box);

        // 이미지 클릭 시 상세 정보 박스를 생성 또는 제거 (스위치 기능 적용)
        imageContainer.onclick = () => toggleDetailBox(planet, screenX + boxSize + 20, screenY);

        infoBoxes.push(box);
    });
}

// 행성 상세 정보 박스를 켜고 끄는 함수 (스위치 기능 추가)
function toggleDetailBox(planet, screenX, screenY) {
    // 현재 활성화된 행성을 다시 클릭하면 상세 정보 박스를 제거
    if (detailBox && detailBox.planet === planet) {
        detailBox.remove();
        detailBox = null;
    } else {
        // 다른 행성 클릭 시 기존 박스를 제거하고 새 박스 생성
        if (detailBox) {
            detailBox.remove();
        }
        createDetailBox(planet, screenX, screenY);
    }
}

// 행성 상세 정보 박스 생성 함수
function createDetailBox(planet, screenX, screenY) {
    // 새로운 상세 정보 박스 생성
    const box = document.createElement("div");
    box.className = "fact-box";
    box.style.position = "absolute";
    box.style.left = `${screenX}px`;
    box.style.top = `${screenY}px`;
    box.style.width = "200px";
    box.style.border = "1px solid #ddd";
    box.style.backgroundColor = "#000";
    box.style.color = "white";
    box.style.borderRadius = "10px";
    box.style.padding = "10px";
    box.style.boxShadow = "0 0 15px 5px rgba(255, 255, 255, 0.5)"; // 빛 번짐 효과 추가
    box.innerHTML = `
      <p>${planet.fact}</p>
      <a href="${planet.wiki}" target="_blank" style="color: #ffdd57;">더 알아보기</a>
    `;

    document.body.appendChild(box);
    detailBox = box;
    detailBox.planet = planet;  // 현재 행성 정보를 박스에 저장
}

// 확대/축소 이벤트
window.addEventListener("wheel", (event) => {
    event.preventDefault();

    // 지수 변경값 조절
    let exponentChange = event.deltaY * -0.0005;

    // scale을 10의 지수승 형태로 조정
    scale *= Math.pow(10, exponentChange);

    // 확대/축소 배율 제한 (10^-1 ~ 10^2)
    scale = Math.min(Math.max(scale, 0.0005), 100.0);

    // 스크롤할 때 상세 정보 박스를 제거
    if (detailBox) {
        detailBox.remove();
        detailBox = null;
    }

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

// 외계인 이미지를 무작위 위치로 이동시키는 함수
function moveAlien() {
    const maxX = window.innerWidth - alien.offsetWidth;
    const maxY = window.innerHeight - alien.offsetHeight;

    // 무작위 위치 생성
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // 외계인 이미지의 위치 업데이트
    alien.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// UFO 이미지를 무작위 위치로 이동시키는 함수
function moveUfo() {
    const maxX = window.innerWidth - ufo.offsetWidth;
    const maxY = window.innerHeight - ufo.offsetHeight;

    // 무작위 위치 생성
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // UFO 이미지의 위치 업데이트
    ufo.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// 주기적으로 외계인 이미지를 이동
setInterval(moveAlien, 1000); // 1초마다 새로운 위치로 이동

// 주기적으로 UFO 이미지를 이동
setInterval(moveUfo, 1000); // 1초마다 새로운 위치로 이동

// 초기 화면에 행성 박스를 생성하여 표시
drawPlanets();
