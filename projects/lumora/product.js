/* 상품 추가: 아래 배열에 pid, pname, price, pdiscount를 추가하세요.
   상품 이미지는 product.html의 img 태그에서 관리합니다.
   결제/회원/문의 서버는 제공되지 않아 실제 거래를 요청하지 않습니다. */
'use strict';
const getParameter = (key) => new URLSearchParams(location.search).get(key);
const won = (value) => Math.round(Number(value)).toLocaleString('ko-KR');
const newProductArray = [
  { pid: 1, pname: '[LUMORA] 헤이든 원목 침대', price: 920000, pdiscount: .15, designTotal: 957000 },
  // 아래 두 상품은 기존 index.html에 있는 실제 상품명/가격/이미지를 사용합니다.
  { pid: 2, pname: '말름 높은침대프레임, 화이트', price: 100000, pdiscount: .3 },
  { pid: 3, pname: '테이블, 물푸레무늬목', price: 100000, pdiscount: .3 }
];
const designReview = "[매장/타쇼핑몰 구매 후기] 방 분위기를 고급스럽게 만들어줄 호텔식 침대를 찾다가 스와니에 아이보리 색상을 선택했는데, 결과적으로 정말 만족스러운 선택이었습니다. 처음에는 화이트 컬러도 고민했지만 자칫하면 병원 같은 차가운 느낌이 날 것 같았고, 오크 색상은 안정감은 있지만 공간이 다소 무거워 보일 수 있을 것 같아서 고민이 많았어요. 그 중간 지점인 아이보리는 밝으면서도 따뜻한 느낌을 동시에 주기 때문에 실제로 설치하고 나니 방 전체 분위기가 훨씬 부드럽고 고급스럽게 완성된 느낌입니다. 과하지 않으면서도 은은하게 포인트가 되는 색감이라 어떤 인테리어와도 잘 어울릴 것 같아요.요즘은 로봇청소기를 사용하는 집이 많아서 침대 선택할 때도 하부 구조를 중요하게 봤는데, 평상형으로 선택하니 여러모로 장점이 많았습니다. 바닥이 보이는 구조라 시각적으로 답답함이 없고, 실제 방 크기보다 더 넓어 보이는 효과가 있어서 작은 공간에서도 활용도가 높은 것 같아요. 청소할 때도 걸리는 부분이 적어서 관리가 훨씬 편해졌고, 생활 동선도 자연스럽게 정리되는 느낌입니다.조명 부분도 굉장히 만족스러운 요소 중 하나입니다. 전체 조명을 켜지 않고 헤드 부분에 있는 간접조명만 켜도 분위기가 충분히 아늑하게 연출됩니다. 자기 전에는 밝은 조명보다 이런 은은한 빛이 훨씬 편안하게 느껴지는데, 실제로 사용해보니 눈도 덜 피로하고 수면 준비에도 도움이 되는 것 같아요. 남편이 먼저 잠든 이후 혼자 휴대폰을 보거나 간단하게 책을 읽을 때는 독서등이 따로 있어서 훨씬 실용적입니다. 밝기도 적당해서 옆 사람을 방해하지 않으면서 개인 시간을 보낼 수 있다는 점이 특히 좋았어요.패널 가격이 조금 부담스럽긴 했지만 결국 선택하게 된 가장 큰 이유는 실용적인 기능들이었습니다. C타입 휴대폰 충전이 가능하고, 콘센트도 함께 구성되어 있어서 침대 위에서 생활하는 시간이 훨씬 편리해졌어요. 예전에는 충전하려고 따로 멀티탭을 빼거나 선을 길게 늘어뜨려야 해서 불편했는데, 지금은 그런 번거로움이 완전히 사라졌습니다. 이런 작은 디테일들이 실제 생활에서는 생각보다 큰 차이를 만들어준다는 걸 사용하면서 더 실감하고 있어요.침대 프레임 자체의 완성도도 굉장히 만족스럽습니다. 철제 프레임이라 내구성이 뛰어나고, 실제로 사용하면서 흔들림이나 소음이 거의 느껴지지 않습니다. 밤에 뒤척이거나 움직일 때도 안정감이 있어서 편안하게 사용할 수 있었어요. 알루미늄 테두리 마감도 상당히 고급스럽고 깔끔하게 처리되어 있어서 전체적인 디자인 완성도를 한층 더 높여주는 느낌입니다. 디테일 하나하나 신경 쓴 제품이라는 인상을 받았습니다.설치 과정도 매우 만족스러웠습니다. 기사님께서 시간 약속도 잘 지켜주셨고, 제품 설명도 친절하게 해주셔서 처음 사용하는 입장에서 이해하기 쉬웠어요. 설치도 깔끔하게 마무리해주셔서 따로 손볼 부분 없이 바로 사용할 수 있었고, 마무리 정리까지 꼼꼼하게 해주셔서 처음부터 기분 좋게 사용할 수 있었습니다.전체적으로 디자인, 색감, 기능성, 실용성까지 모두 만족스러운 제품이라 침실 인테리어를 중요하게 생각하시는 분들께 특히 추천드리고 싶어요. 저처럼 밝고 깔끔하면서도 고급스러운 분위기를 선호하시는 분들께는 정말 잘 맞을 것 같습니다. 단순히 잠만 자는 공간이 아니라 하루의 시작과 끝을 보내는 공간이 더 편안하고 만족스럽게 바뀌었다는 점에서, 이번 선택은 충분히 가치 있었다고 느끼고 있습니다.";
const reviewArray = [1,2,3].map(id => ({ id, pid: 1, name: '정*진', date: '2026.09.16', rating: 5, text: designReview, images: [1,2,3,4,5,6].map(n => 'Review'+n+'.png') }));
const requestedPid = getParameter('pid');
const productInfo = newProductArray.find(item => item.pid === (requestedPid === null ? 1 : Number(requestedPid)));
const reviewInfo = reviewArray.filter(item => item.pid === productInfo?.pid);
const $ = (selector) => document.querySelector(selector);
const asset = name => './img/' + name;
const infoDialog = $('#info-dialog');
let activeImages = [], activeImage = 0, mainIndex = 0;

function showInfo(title, content) {
  $('#dialog-title').textContent = title;
  $('#dialog-content').replaceChildren();
  if (typeof content === 'string') $('#dialog-content').textContent = content;
  else $('#dialog-content').append(content);
  infoDialog.showModal();
}
function imageElement(name, alt) {
  const img = document.createElement('img');
  img.src = asset(name); img.alt = alt;
  return img;
}
function renderProduct() {
  if (!productInfo) {
    $('#product-page').hidden = true;
    $('#product-not-found').hidden = false;
    document.title = '상품을 찾을 수 없습니다 | LUMORA';
    return;
  }
  document.title = productInfo.pname + ' | LUMORA';
  $('#product-title').textContent = productInfo.pname;
  $('#original-price').textContent = won(productInfo.price);
  $('#discount').textContent = Math.round(productInfo.pdiscount * 100) + '%';
  const price = productInfo.price * (1-productInfo.pdiscount);
  $('#sale-price').textContent = won(price);
  $('#total-price').textContent = won(productInfo.designTotal ?? price);
  const galleryImages = [...document.querySelectorAll('#main-image, #thumbnails img')]
    .map(image => image.getAttribute('src').replace(/^\.\/img\//, ''));
  document.querySelectorAll('#thumbnails .thumbnail').forEach((button, i) => {
    button.addEventListener('click', () => {
      $('#main-image').src = button.querySelector('img').getAttribute('src');
      mainIndex = i + 1;
      document.querySelectorAll('#thumbnails .thumbnail').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    });
  });
  $('.main-image').addEventListener('click', () => openGallery(galleryImages, mainIndex));
  if (!reviewInfo.length) {
    const p = document.createElement('p'); p.className = 'empty-state'; p.textContent = '등록된 리뷰가 없습니다.'; $('#reviews').append(p);
  }
  reviewInfo.forEach(renderReview);
}
function renderReview(review) {
  const article = document.createElement('article');
  article.className = 'review';
  article.innerHTML = '<div class="review-user"><b></b><time></time></div><div class="review-content"><div class="stars" role="img" aria-label="5점 만점에 5점"></div><div><p class="review-text"></p><button class="review-more" aria-expanded="false"><span>더보기</span><img src="./img/product/expand.svg" alt=""></button></div><div class="review-images" aria-label="리뷰 사진"></div><div class="review-actions"><button class="helpful" aria-pressed="false"><img src="./img/product/helpful.svg" alt=""><span>유용해요</span></button><button class="report"><img src="./img/product/report.svg" alt="">신고 차단</button></div></div>';
  article.querySelector('.review-user b').textContent = review.name;
  const time = article.querySelector('time'); time.textContent = review.date; time.dateTime = review.date.replaceAll('.', '-');
  for (let i=0; i<review.rating; i++) article.querySelector('.stars').append(imageElement('product/star.svg',''));
  const text = article.querySelector('.review-text'); text.textContent = review.text; text.id = 'review-text-'+review.id;
  const more = article.querySelector('.review-more'); more.setAttribute('aria-controls', text.id);
  more.addEventListener('click', () => {
    const expanded = text.classList.toggle('expanded'); more.setAttribute('aria-expanded', String(expanded)); more.querySelector('span').textContent = expanded ? '접기' : '더보기';
  });
  review.images.forEach((name,i) => {
    const button = document.createElement('button'); button.setAttribute('aria-label', '리뷰 사진 '+(i+1)+' 확대');
    const img = imageElement(name,'리뷰 사진 '+(i+1)); img.loading = 'lazy'; button.append(img);
    button.addEventListener('click', () => openGallery(review.images,i)); article.querySelector('.review-images').append(button);
  });
  article.querySelector('.helpful').addEventListener('click', event => {
    const button = event.currentTarget; const pressed = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(pressed)); button.querySelector('span').textContent = pressed ? '유용해요 1' : '유용해요';
  });
  article.querySelector('.report').addEventListener('click', () => showInfo('신고 차단', '현재는 포트폴리오 화면으로, 신고 접수 서비스가 연결되어 있지 않습니다.'));
  $('#reviews').append(article);
}
function openGallery(images, index) { activeImages = images; activeImage = index; updateGallery(); $('#gallery-dialog').showModal(); }
function updateGallery() { $('#gallery-image').src = asset(activeImages[activeImage]); $('#gallery-image').alt = '확대 이미지 '+(activeImage+1); $('#gallery-count').textContent = (activeImage+1)+' / '+activeImages.length; }
function stepGallery(direction) { activeImage = (activeImage+direction+activeImages.length)%activeImages.length; updateGallery(); }
$('#gallery-prev').addEventListener('click', () => stepGallery(-1));
$('#gallery-next').addEventListener('click', () => stepGallery(1));
$('#gallery-dialog').addEventListener('keydown', event => { if (event.key === 'ArrowLeft') stepGallery(-1); if (event.key === 'ArrowRight') stepGallery(1); });
for (const dialog of document.querySelectorAll('dialog')) {
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target !== dialog) return; const rect = dialog.getBoundingClientRect(); if (event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom) dialog.close(); });
}
const menuToggle = $('.menu-toggle');
function closeMenu() { $('#mobile-menu').hidden = true; menuToggle.setAttribute('aria-expanded','false'); menuToggle.setAttribute('aria-label','전체 메뉴 열기'); }
menuToggle.addEventListener('click', () => { const open = $('#mobile-menu').hidden; $('#mobile-menu').hidden = !open; menuToggle.setAttribute('aria-expanded',String(open)); menuToggle.setAttribute('aria-label',open?'전체 메뉴 닫기':'전체 메뉴 열기'); });
document.addEventListener('keydown', event => { if(event.key==='Escape' && !$('#mobile-menu').hidden) { closeMenu(); menuToggle.focus(); } });
document.addEventListener('click', event => { if(!event.target.closest('#mobile-menu,.menu-toggle')) closeMenu(); });
matchMedia('(min-width:1201px)').addEventListener('change', event => { if(event.matches) closeMenu(); });

function readCart() { try { const data = JSON.parse(localStorage.getItem('lumora-cart') || '[]'); return Array.isArray(data) ? data.filter(item => newProductArray.some(p => p.pid === item.pid) && Number.isInteger(item.quantity) && item.quantity > 0) : []; } catch { return []; } }
function addCart() {
  if (!productInfo) return showInfo('장바구니','상품을 먼저 선택해 주세요.');
  const cart = readCart(); const item = cart.find(item => item.pid === productInfo.pid);
  if (item) item.quantity++; else cart.push({pid:productInfo.pid,quantity:1});
  try { localStorage.setItem('lumora-cart',JSON.stringify(cart)); showInfo('장바구니','상품을 장바구니에 담았습니다. 이 브라우저에 저장됩니다.'); }
  catch { showInfo('장바구니','브라우저의 저장소를 사용할 수 없어 상품을 저장하지 못했습니다.'); }
}
function viewCart() {
  const container = document.createElement('div'); const cart = readCart();
  if(!cart.length) return showInfo('장바구니','장바구니가 비어 있습니다.');
  cart.forEach(item => {
    const p = newProductArray.find(p => p.pid===item.pid); const row = document.createElement('p'); row.textContent = p.pname+' · '+item.quantity+'개 · '+won(p.price*(1-p.pdiscount)*item.quantity)+'원';
    const remove = document.createElement('button'); remove.textContent = '삭제'; remove.addEventListener('click', () => { try { localStorage.setItem('lumora-cart',JSON.stringify(cart.filter(c => c.pid!==item.pid))); infoDialog.close(); viewCart(); } catch { showInfo('장바구니','저장소에 접근할 수 없습니다.'); } }); row.append(remove); container.append(row);
  }); showInfo('장바구니',container);
}
function showShipping() {
  const table = document.createElement('table');
  const rows = [['배송정보','무료배송 (제주도 제외) / 전문 설치배송'],['배송기간','주문 후 배송 일정은 별도 안내됩니다. 설치 일정과 배송 가능 지역은 고객센터로 문의해 주세요.'],['반품 / 교환','반품·교환 가능 여부와 비용은 상품 및 설치 상태에 따라 확인이 필요합니다. 고객센터 1588-2048로 문의해 주세요.']];
  rows.forEach(([title,description]) => { const row = table.insertRow(); const th = document.createElement('th'); th.scope='row'; th.textContent=title; row.append(th); row.insertCell().textContent=description; }); showInfo('배송 / 반품 / 교환 안내',table);
}
const notices = {
  login:['로그인','로그인 서비스가 연결되어 있지 않습니다.'],signup:['회원가입','회원가입 서비스가 연결되어 있지 않습니다.'],mypage:['마이페이지','회원 서비스가 연결되어 있지 않습니다.'],
  coupon:['전체 쿠폰 받기','쿠폰은 로그인 후 발급할 수 있습니다. 현재 로그인·쿠폰 발급 서비스가 연결되어 있지 않습니다.'],
  benefits:['추가혜택','무이자할부 최대 6개월\n카드 혜택은 결제 시 카드사와 적용 조건을 확인해 주세요.'],points:['LUMORA Point','LUMORA 회원 가입 시 적립 가능합니다. 실제 적립액은 주문 시 확인해 주세요.'],
  qa:['상품Q&A','등록된 상품 문의가 없습니다.\n상품 문의: 1588-2048\n평일 09:30 - 18:00 (점심시간 12:30 - 13:30)'],
  terms:['이용약관','포트폴리오 페이지입니다. 실제 쇼핑몰 이용약관은 제공되지 않았습니다.'],privacy:['개인정보처리방침','이 페이지는 입력한 정보를 서버로 전송하지 않습니다. 장바구니 정보만 현재 브라우저에 저장됩니다.'],
  'email-policy':['이메일무단수집거부','이메일 주소의 무단 수집을 거부합니다.'],company:['사업자정보확인','포트폴리오용 예시 사업자 정보입니다. 실제 사업자 조회 서비스가 연결되어 있지 않습니다.'],youtube:['유튜브','공식 채널 주소가 아직 등록되지 않았습니다.'],instagram:['인스타그램','공식 계정 주소가 아직 등록되지 않았습니다.']
};
document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-action]'); if(!trigger) return;
  const action = trigger.dataset.action;
  if(action==='add-cart') return addCart();
  if(action==='cart') return viewCart();
  if(action==='shipping') return showShipping();
  if(action==='buy') return showInfo('구매하기', !productInfo ? '상품을 먼저 선택해 주세요.' : productInfo.pname+'\n판매가 '+won(productInfo.price*(1-productInfo.pdiscount))+'원\n\n'+(productInfo.designTotal ? '시안의 총 합계금액과 판매가가 달라 주문 금액 확인이 필요합니다.\n' : '')+'현재 결제 서비스가 연결되어 있지 않아 주문이나 결제는 진행되지 않습니다.');
  if(action==='search') {
    const form = document.createElement('form'); const input = document.createElement('input'); input.type='search'; input.placeholder='상품명 검색'; input.setAttribute('aria-label','상품명 검색');
    const results = document.createElement('div');
    const search = () => { results.replaceChildren(); newProductArray.filter(p => p.pname.toLowerCase().includes(input.value.trim().toLowerCase())).forEach(p => { const a = document.createElement('a'); a.href='./product.html?pid='+p.pid; a.textContent=p.pname; a.style.display='block'; a.style.paddingBlock='12px'; results.append(a); }); if(!results.childElementCount) results.textContent='검색 결과가 없습니다.'; };
    form.addEventListener('submit',event=>{event.preventDefault();search();}); input.addEventListener('input',search); form.append(input,results); showInfo('검색',form); search(); input.focus(); return;
  }
  if(notices[action]) showInfo(...notices[action]);
});
const tabLinks = [...document.querySelectorAll('.product-tabs a')];
function updateTabs() {
  if(!productInfo) return;
  const inReviews = $('#product-reviews').getBoundingClientRect().top <= 100;
  tabLinks.forEach((link,i) => { const selected = i === (inReviews?1:0); link.classList.toggle('active',selected); if(selected) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
}
let scrollPending = false;
addEventListener('scroll', () => { if(scrollPending) return; scrollPending=true; requestAnimationFrame(()=>{updateTabs();scrollPending=false;}); }, {passive:true});
renderProduct(); updateTabs();
