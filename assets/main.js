(function () {
  'use strict';

  var STORAGE_KEY = 'couple-order-draft-v2';
  var CUSTOM_DISHES_KEY = 'couple-order-custom-dishes-v1';
  var zodiacData = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'];
  var zodiacMeta = {
    '白羊座': {
      symbol: '♈',
      dishId: 'pizza',
      badge: '白羊挚爱',
      fortune: '热情直率，趁热拉丝才够尽兴痛快',
      quote: '火象的热烈与真诚，愿每一口都有心动的温度。'
    },
    '金牛座': {
      symbol: '♉',
      dishId: 'pasta',
      badge: '金牛本命',
      fortune: '务实挑剔，浓郁奶油抚平所有疲惫',
      quote: '土象的温厚与深情，都融在这一餐的细水长流里。'
    },
    '双子座': {
      symbol: '♊',
      dishId: 'tea',
      badge: '双子特调',
      fortune: '灵感漫游，来杯清甜特调和TA碰杯',
      quote: '风象的奇思妙想，只想和你分享生活的每一刻雀跃。'
    },
    '巨蟹座': {
      symbol: '♋',
      dishId: 'ramen',
      badge: '巨蟹暖胃',
      fortune: '细腻温柔，热气腾腾的最抚凡人心',
      quote: '水象的体贴顾家，把最柔软的爱意都藏进热汤里。'
    },
    '狮子座': {
      symbol: '♌',
      dishId: 'pizza',
      badge: '狮子霸气款',
      fortune: '全场焦点，就要大口吃肉尽情享受',
      quote: '坦荡又热忱的偏爱，要给TA毫无保留的大方浪漫。'
    },
    '处女座': {
      symbol: '♍',
      dishId: 'pasta',
      badge: '处女座挑剔之选',
      fortune: '细节至上，恰到好处的火候最显诚意',
      quote: '不轻易许诺的严谨，化作日复一日陪你好好吃饭的笃定。'
    },
    '天秤座': {
      symbol: '♎',
      dishId: 'cake',
      badge: '天秤纠结之选',
      fortune: '颜值即正义，把甜蜜平衡拿捏得刚刚好',
      quote: '告别选择困难，只要和你坐在一起就是最好的答案。'
    },
    '天蝎座': {
      symbol: '♏',
      dishId: 'ramen',
      badge: '天蝎私藏',
      fortune: '浓郁深邃，一口入魂的极致风味',
      quote: '神秘深邃的专一深情，只在两人共享的一蔬一饭里盛放。'
    },
    '射手座': {
      symbol: '♐',
      dishId: 'fries',
      badge: '射手快乐搭档',
      fortune: '自由无拘，随手分享才是快乐的真谛',
      quote: '热爱自由的灵魂，甘愿停留在这张只属于两人的餐桌旁。'
    },
    '摩羯座': {
      symbol: '♑',
      dishId: 'ramen',
      badge: '摩羯务实首选',
      fortune: '踏实笃定，碳水与暖汤带来最实在的安心',
      quote: '不擅言辞的深沉关切，全都在默默为你准备的可口饭菜中。'
    },
    '水瓶座': {
      symbol: '♒',
      dishId: 'tea',
      badge: '水瓶灵感专属',
      fortune: '天马行空，特立独行也要清爽解腻',
      quote: '在万千世界里寻觅契合灵魂，和你吃饭就是最浪漫的频道。'
    },
    '双鱼座': {
      symbol: '♓',
      dishId: 'cake',
      badge: '双鱼浪漫治愈',
      fortune: '软绵梦幻，把爱意化作舌尖的第一口甜',
      quote: '极致浪漫的水象幻想，在每一口温存中写满爱的诗意。'
    }
  };
  var categories = ['全部', '主食', '小吃', '饮品', '甜品', '沙拉', '汤品'];
  var dishes = [
    { id: 'pasta', category: '主食', name: '奶油意面', desc: '绵密奶油，香气刚刚好', price: 28, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20creamy%20Italian%20pasta%20with%20parmesan%20and%20parsley%20on%20a%20ceramic%20plate%2C%20warm%20restaurant%20lighting&image_size=square' },
    { id: 'pizza', category: '主食', name: '芝士披萨', desc: '拉丝芝士的快乐', price: 36, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20a%20cheesy%20pepperoni%20pizza%20with%20melted%20mozzarella%20on%20a%20wooden%20table&image_size=square' },
    { id: 'ramen', category: '主食', name: '番茄浓汤面', desc: '热乎乎的一大碗', price: 25, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20tomato%20broth%20noodles%20with%20egg%20and%20greens%20in%20a%20ceramic%20bowl&image_size=square' },
    { id: 'fries', category: '小吃', name: '薯条', desc: '适合分享的小份快乐', price: 16, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20golden%20crispy%20French%20fries%20in%20a%20paper%20cone%20with%20ketchup&image_size=square' },
    { id: 'tea', category: '饮品', name: '蜜桃乌龙', desc: '清甜茶香，碰杯吧', price: 18, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20peach%20oolong%20tea%20in%20a%20clear%20glass%20with%20peach%20slices&image_size=square' },
    { id: 'cake', category: '甜品', name: '云朵蛋糕', desc: '柔软的甜蜜收尾', price: 22, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20fluffy%20cloud%20cake%20with%20white%20cream%20and%20berries&image_size=square' }
  ];
  var zodiacRecommend = { '白羊座': 'pizza', '金牛座': 'pasta', '双子座': 'tea', '巨蟹座': 'ramen', '狮子座': 'pizza', '处女座': 'pasta', '天秤座': 'cake', '天蝎座': 'ramen', '射手座': 'fries', '摩羯座': 'ramen', '水瓶座': 'tea', '双鱼座': 'cake' };
  var state = { gender: '', zodiac: '', category: '全部', pageIndex: 0, orders: { boy: {}, girl: {} } };
  var customDishes = [];
  var pendingCustomImage = '';
  var turning = false;
  var suppressBookClick = false;
  var dragStartX = 0;
  var dragging = false;

  var $ = function (selector) { return document.querySelector(selector); };
  var onboardingView = $('#onboardingView');
  var orderView = $('#orderView');
  var completeView = $('#completeView');
  var zodiacGrid = $('#zodiacGrid');
  var categoryTabs = $('#categoryTabs');
  var dishScroller = $('#dishScroller');
  var bookPageLeft = $('#bookPageLeft');
  var bookPageRight = $('#bookPageRight');
  var pageTurnSheet = $('#pageTurnSheet');
  var startOrderButton = $('#startOrderButton');
  var receiptPhotoBg = $('#receiptPhotoBg');
  var receiptPhotoSources = ['./pic/最终订单纪念小票1.jpg', './pic/最终订单纪念小票2.jpg', './pic/最终订单纪念小票3.jpg', './pic/最终订单纪念小票4.jpg'];

  function saveState() {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ gender: state.gender, zodiac: state.zodiac, orders: state.orders })); } catch (error) {}
  }

  function loadCustomDishes() {
    try {
      var saved = JSON.parse(window.localStorage.getItem(CUSTOM_DISHES_KEY) || '[]');
      if (Array.isArray(saved)) {
        customDishes = saved;
      } else {
        customDishes = [];
      }
    } catch (error) {
      customDishes = [];
    }
  }

  function saveCustomDishes() {
    try {
      window.localStorage.setItem(CUSTOM_DISHES_KEY, JSON.stringify(customDishes));
      return true;
    } catch (error) {
      window.alert('存储空间不足，请删除部分自定义菜品后再试');
      return false;
    }
  }

  function getAllDishes() {
    return dishes.concat(customDishes);
  }

  function showToast(message) {
    var toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    window.setTimeout(function () {
      toast.classList.add('show');
    }, 20);
    window.setTimeout(function () {
      toast.classList.remove('show');
      window.setTimeout(function () {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 250);
    }, 1800);
  }

  function loadState() {
    loadCustomDishes();
    try {
      var saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
      if (saved) { state.gender = saved.gender || ''; state.zodiac = saved.zodiac || ''; state.orders = saved.orders || { boy: {}, girl: {} }; }
    } catch (error) {}
  }

  function renderZodiac() {
    zodiacGrid.innerHTML = '';
    zodiacData.forEach(function (zodiac) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'zodiac-item' + (state.zodiac === zodiac ? ' active' : '');
      button.textContent = zodiac;
      button.addEventListener('click', function () {
        state.zodiac = zodiac;
        saveState();
        renderZodiac();
        updateStartButton();
        $('#selectionHint').textContent = state.gender ? '已选择' + zodiac + '，可以开始点单' : '已选择' + zodiac + '，还需要选择点单者';
      });
      zodiacGrid.appendChild(button);
    });
  }

  function getActiveRole() { return state.gender || 'boy'; }
  function updateStartButton() {
    var ready = Boolean(state.gender && state.zodiac);
    startOrderButton.disabled = !ready;
    startOrderButton.setAttribute('aria-disabled', String(!ready));
  }
  function filteredDishes() {
    var all = getAllDishes();
    return state.category === '全部' ? all : all.filter(function (dish) { return dish.category === state.category; });
  }
  function getDish(id) {
    var all = getAllDishes();
    return all.filter(function (dish) { return dish.id === id; })[0];
  }

  function getDishArt(id) {
    var art = {
      pasta: '<svg viewBox="0 0 100 76" aria-hidden="true"><ellipse class="plate" cx="50" cy="52" rx="40" ry="16"/><path class="food cream" d="M25 49c8-27 44-28 52 0-13 12-39 12-52 0z"/><path d="M31 45c10-11 27-13 39-2M35 51c11-10 25-10 34-2M42 39c8 2 15 7 19 15"/><circle class="green" cx="35" cy="41" r="3"/><circle class="green" cx="67" cy="46" r="3"/></svg>',
      pizza: '<svg viewBox="0 0 100 76" aria-hidden="true"><path class="food cheese" d="M18 58L48 15l35 45z"/><path class="crust" d="M45 18c10-8 30 14 35 34"/><circle class="tomato" cx="47" cy="39" r="6"/><circle class="tomato" cx="62" cy="50" r="5"/><circle class="green" cx="56" cy="31" r="3"/></svg>',
      fries: '<svg viewBox="0 0 100 76" aria-hidden="true"><path class="fries-stick" d="M31 39L25 11M43 37L42 8M55 38L62 10M66 41L76 18"/><path class="food redbox" d="M24 31h53l-7 37H32z"/><path d="M31 42c11 7 27 7 39 0"/><path class="heart-line" d="M44 49c5-7 14 0 7 8-7-8-2-15 5-8"/></svg>',
      tea: '<svg viewBox="0 0 100 76" aria-hidden="true"><path class="food cup" d="M27 18h43l-4 50H32z"/><path d="M70 29c19-4 19 24-2 23"/><path class="tea" d="M31 35h35l-2 29H34z"/><circle class="peach" cx="43" cy="42" r="6"/><circle class="peach" cx="57" cy="51" r="5"/><path class="green-line" d="M46 24c5-9 15-8 18-4"/></svg>',
      cake: '<svg viewBox="0 0 100 76" aria-hidden="true"><path class="food cake" d="M20 38l31-21 30 21v27H20z"/><path class="cream-fill" d="M20 38h61v13c-8-4-13 7-21 0-8-7-14 6-22 0-7-5-11 4-18 0z"/><circle class="tomato" cx="51" cy="17" r="7"/><path class="green-line" d="M52 12c4-8 10-7 13-4"/></svg>',
      ramen: '<svg viewBox="0 0 100 76" aria-hidden="true"><path class="food bowl" d="M13 31h74c-3 27-17 39-37 39S16 58 13 31z"/><ellipse class="soup" cx="50" cy="31" rx="37" ry="14"/><path d="M24 30c15-13 34 10 51-3M30 36c12-10 27 7 40-2"/><circle class="egg" cx="66" cy="28" r="10"/><circle class="yolk" cx="66" cy="28" r="5"/></svg>'
    };
    return art[id] || '';
  }

  function updateTheme() {
    var role = getActiveRole();
    if (role === 'girl') {
      document.body.classList.add('theme-girl');
    } else {
      document.body.classList.remove('theme-girl');
    }
  }

  function renderCategories() {
    categoryTabs.innerHTML = '';
    categories.forEach(function (category) {
      var button = document.createElement('button');
      button.type = 'button'; button.className = state.category === category ? 'active' : ''; button.textContent = category;
      button.addEventListener('click', function () { state.category = category; state.pageIndex = 0; renderCategories(); renderDishes(); });
      categoryTabs.appendChild(button);
    });
  }

  function getZodiacBadge(zodiac) {
    var meta = zodiacMeta[zodiac];
    return meta ? meta.badge : '今日推荐';
  }

  function getBookItems() {
    var list = filteredDishes().slice();
    if (state.category !== '全部') {
      list.push({ isAddCard: true });
    }
    return list;
  }

  function renderAddCard() {
    return '<div class="book-dish book-add-card" data-action="open-camera">' +
      '<div class="add-card-circle"><span class="add-card-plus">＋</span></div>' +
      '<strong class="add-card-title">拍一道菜</strong>' +
      '<small class="add-card-desc">添加属于你们的专属美味</small>' +
      '<button type="button" class="book-count-btn add-card-btn" data-action="open-camera">立即拍照</button>' +
      '</div>';
  }

  function renderBookPage(item, side) {
    if (!item) return '<div class="page-empty"><span>—</span><p>这一页暂时空着</p></div>';
    if (item.isAddCard) return renderAddCard();

    var dish = item;
    var count = state.orders[getActiveRole()][dish.id] || 0;
    var meta = zodiacMeta[state.zodiac];
    var isRecommended = meta ? meta.dishId === dish.id : (zodiacRecommend[state.zodiac] === dish.id);
    var badgeText = getZodiacBadge(state.zodiac);
    var illustrationHtml = dish.isCustom ?
      '<span class="dish-illustration dish-illustration-custom"><img src="' + dish.image + '" alt="' + dish.name + '" /></span>' :
      '<span class="dish-illustration illustration-' + dish.id + '">' + getDishArt(dish.id) + '</span>';

    var deleteBtnHtml = dish.isCustom ?
      '<button type="button" class="dish-delete-btn" data-action="delete-dish" data-id="' + dish.id + '" aria-label="删除菜品 ' + dish.name + '">×</button>' :
      '';

    return '<div class="book-dish' + (dish.isCustom ? ' book-dish-custom' : '') + '" data-dish-id="' + dish.id + '">' +
      deleteBtnHtml +
      (isRecommended ? '<span class="recommend-badge">' + badgeText + '</span>' : '') +
      illustrationHtml +
      '<strong>' + dish.name + '</strong><small>' + (dish.desc || '专属自定义美味') + '</small><em>❤️ ' + dish.price + ' 爱意值</em>' +
      (count > 0 ?
        '<div class="book-counter" role="group" aria-label="' + dish.name + '数量调整">' +
          '<button type="button" class="book-counter-btn book-btn-minus" data-action="minus" aria-label="减少一份 ' + dish.name + '">−</button>' +
          '<span class="book-counter-num">' + count + '</span>' +
          '<button type="button" class="book-counter-btn book-btn-plus" data-action="plus" aria-label="增加一份 ' + dish.name + '">+</button>' +
        '</div>' :
        '<button type="button" class="book-count-btn book-btn-add" data-action="plus" aria-label="加入清单 ' + dish.name + '">加入清单 ＋</button>'
      ) +
      '</div>';
  }

  function renderRecommendation() {
    var meta = zodiacMeta[state.zodiac];
    if (meta) {
      $('#recommendation').textContent = '★ ' + meta.symbol + ' ' + state.zodiac + ' · 今日美食签：' + meta.fortune;
    } else {
      var dish = getDish(zodiacRecommend[state.zodiac] || 'pasta');
      $('#recommendation').textContent = state.zodiac ? '★ ' + state.zodiac + '今日推荐：' + (dish ? dish.name : '') : '★ 今日推荐：' + (dish ? dish.name : '');
    }
  }

  function renderDishes() {
    var items = getBookItems();
    var totalPages = Math.max(1, Math.ceil(items.length / 2));
    if (state.pageIndex >= totalPages) state.pageIndex = totalPages - 1;
    if (state.pageIndex < 0) state.pageIndex = 0;
    bookPageLeft.innerHTML = renderBookPage(items[state.pageIndex * 2], 'left');
    bookPageRight.innerHTML = renderBookPage(items[state.pageIndex * 2 + 1], 'right');
    $('#bookPageLabel').textContent = (state.pageIndex + 1) + ' / ' + totalPages;
    $('#bookPrev').disabled = state.pageIndex === 0;
    $('#bookNext').disabled = state.pageIndex === totalPages - 1;
    renderRecommendation();
  }

  function turnPage(direction) {
    var totalPages = Math.max(1, Math.ceil(getBookItems().length / 2));
    var nextIndex = state.pageIndex + direction;
    if (turning || nextIndex < 0 || nextIndex >= totalPages) return;
    turning = true; pageTurnSheet.className = 'page-turn-sheet ' + (direction > 0 ? 'turn-forward' : 'turn-back');
    window.setTimeout(function () { state.pageIndex = nextIndex; renderDishes(); pageTurnSheet.className = 'page-turn-sheet'; turning = false; }, 360);
  }

  function getTotals() {
    var count = 0; var total = 0;
    Object.keys(state.orders[getActiveRole()]).forEach(function (id) { var dish = getDish(id); var amount = state.orders[getActiveRole()][id]; if (dish) { count += amount; total += amount * dish.price; } });
    return { count: count, total: total };
  }

  function addDish(dish) {
    var role = getActiveRole();
    state.orders[role][dish.id] = (state.orders[role][dish.id] || 0) + 1;
    saveState(); renderOrder(); renderDishes();
  }

  function removeDish(dish) {
    var role = getActiveRole();
    if (state.orders[role] && state.orders[role][dish.id]) {
      state.orders[role][dish.id] -= 1;
      if (state.orders[role][dish.id] <= 0) {
        delete state.orders[role][dish.id];
      }
      saveState(); renderOrder(); renderDishes();
    }
  }

  function renderSelected() {
    var list = $('#selectedList'); var orders = state.orders[getActiveRole()]; var hasItems = false;
    list.innerHTML = '';
    Object.keys(orders).forEach(function (id) {
      var dish = getDish(id); var amount = orders[id];
      if (!dish || !amount) return;
      hasItems = true;
      var row = document.createElement('div'); row.className = 'selected-row';
      row.innerHTML = '<span>' + dish.name + '</span><span>×' + amount + '</span><strong>❤️ ' + (dish.price * amount) + '</strong>';
      list.appendChild(row);
    });
    if (!hasItems) {
      var role = getActiveRole();
      var emptyTip = role === 'boy' ? 'TA今天想吃什么？<br />从下方菜单开始添加' : '还没有选择菜品<br />从下方菜单开始添加';
      list.innerHTML = '<p class="empty-note" id="emptyNote">' + emptyTip + '</p>';
    }
  }

  function renderOrder() {
    updateTheme();
    var totals = getTotals();
    var isBoy = getActiveRole() === 'boy';
    var headerMeta = $('#headerMeta');
    if (headerMeta) {
      headerMeta.textContent = isBoy ? '👦🏻 男朋友点单' : '👧🏻 女朋友点单';
    }
    $('#itemCount').textContent = totals.count + ' 道';
    $('#totalPrice').textContent = '❤️ ' + totals.total;

    var finishBtn = $('#finishButton');
    if (finishBtn) {
      var btnText = isBoy ? '点好了，投喂TA' : '点好了，坐等大餐';
      finishBtn.innerHTML = btnText + ' <b>→</b>';
    }

    renderSelected();
  }

  function enterOrder(gender) {
    if (!state.zodiac) { window.alert('请先选择星座，再开始点单'); return; }
    state.gender = gender; state.category = '全部'; state.pageIndex = 0; saveState();
    updateTheme();
    onboardingView.classList.add('hidden'); completeView.classList.add('hidden'); orderView.classList.remove('hidden');
    renderCategories(); renderDishes(); renderOrder();
  }

  function showOnboarding() {
    updateTheme();
    orderView.classList.add('hidden'); completeView.classList.add('hidden'); onboardingView.classList.remove('hidden'); renderZodiac();
  }

  function clearOrders() { state.orders = { boy: {}, girl: {} }; saveState(); renderDishes(); renderOrder(); }

  function getZodiacQuote(zodiac) {
    var meta = zodiacMeta[zodiac];
    return meta ? meta.quote : '今天这顿，值得记住。';
  }

  function showComplete() {
    var totals = getTotals();
    if (!totals.count) { window.alert('请先选择一道菜'); return; }
    if (!window.confirm('确认生成这份订单吗？')) return;
    updateTheme();
    var receiptPhoto = receiptPhotoSources[Math.floor(Math.random() * receiptPhotoSources.length)];
    receiptPhotoBg.src = receiptPhoto;
    receiptPhotoBg.setAttribute('data-source', receiptPhoto);

    var isBoy = getActiveRole() === 'boy';
    var meta = zodiacMeta[state.zodiac];
    var symbol = meta ? meta.symbol + ' ' : '';
    var roleLabel = isBoy ? '👦🏻 男生' : '👧🏻 女生';

    $('#finalDate').textContent = getDateText();
    $('#finalZodiac').textContent = roleLabel + ' · ' + symbol + state.zodiac;
    var quoteText = getZodiacQuote(state.zodiac);
    var finalQuoteEl = $('#finalLoveQuote');
    if (finalQuoteEl) finalQuoteEl.textContent = quoteText;

    var finalList = $('#finalOrderList'); finalList.innerHTML = '';
    Object.keys(state.orders[getActiveRole()]).forEach(function (id) {
      var dish = getDish(id);
      var amount = state.orders[getActiveRole()][id];
      if (dish && amount) {
        var row = document.createElement('div');
        row.innerHTML = '<span>' + dish.name + ' ×' + amount + '</span><strong>❤️ ' + (dish.price * amount) + '</strong>';
        finalList.appendChild(row);
      }
    });
    $('#finalTotal').textContent = '❤️ ' + totals.total;
    orderView.classList.add('hidden'); completeView.classList.remove('hidden');
    var receiptCard = $('#receiptCard');
    receiptCard.classList.add('receipt-replay');
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () { receiptCard.classList.remove('receipt-replay'); });
    });
  }

  function getDateText() { var date = new Date(); return date.getFullYear() + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + String(date.getDate()).padStart(2, '0'); }

  function buildReceiptDataUrl() {
    var view = $('#completeView'); var card = $('#receiptCard'); var content = $('.receipt-content'); var actions = $('.receipt-actions');
    var viewRect = view.getBoundingClientRect(); var cardRect = card.getBoundingClientRect(); var contentRect = content.getBoundingClientRect(); var actionsRect = actions.getBoundingClientRect();
    var width = Math.round(view.clientWidth); var height = Math.round(Math.min(view.clientHeight, window.innerHeight)); var scale = 2;
    var canvas = document.createElement('canvas'); canvas.width = width * scale; canvas.height = height * scale; var context = canvas.getContext('2d'); context.scale(scale, scale);
    var x = function (rect) { return rect.left - viewRect.left; }; var y = function (rect) { return rect.top - viewRect.top; };
    context.fillStyle = '#f5f1eb'; context.fillRect(0, 0, width, height);
    context.textAlign = 'center'; context.fillStyle = '#7b8277'; context.font = '700 10px sans-serif'; context.letterSpacing = '2px'; context.fillText('ORDER RECEIPT', width / 2, y(view.querySelector('.eyebrow').getBoundingClientRect()) + 10);
    context.fillStyle = '#1c2421'; context.font = '700 26px sans-serif'; context.fillText('订单已生成', width / 2, y(view.querySelector('h1').getBoundingClientRect()) + 26);
    context.fillStyle = '#7a827e'; context.font = '13px sans-serif'; context.fillText('这一顿，值得好好吃完。', width / 2, y(view.querySelector('.complete-note').getBoundingClientRect()) + 13);
    var machine = view.querySelector('.receipt-machine').getBoundingClientRect(); var machineX = x(machine); var machineY = y(machine);
    context.fillStyle = '#182c29'; context.fillRect(machineX + 5, machineY, machine.width - 10, 23); context.fillStyle = '#0f1c1a'; context.fillRect(machineX + 22, machineY + 9, Math.min(205, machine.width - 70), 4); context.fillRect(machineX + 22, machineY + 27, machine.width - 44, 9);
    context.fillStyle = '#4caf50'; context.beginPath(); context.arc(machineX + machine.width - 31, machineY + 17, 4, 0, Math.PI * 2); context.fill(); context.fillStyle = '#ff9800'; context.beginPath(); context.arc(machineX + machine.width - 18, machineY + 17, 4, 0, Math.PI * 2); context.fill();
    var receiptHeight = Math.max(0, y(actionsRect) - y(cardRect));
    context.fillStyle = '#fff'; context.fillRect(x(cardRect), y(cardRect), cardRect.width, receiptHeight);
    var photo = $('#receiptPhotoBg'); if (photo.complete && photo.naturalWidth) {
      var photoBox = contentRect; var photoRatio = photo.naturalWidth / photo.naturalHeight; var boxRatio = photoBox.width / photoBox.height; var drawWidth = photoBox.width; var drawHeight = photoBox.height;
      if (photoRatio > boxRatio) { drawHeight = drawWidth / photoRatio; } else { drawWidth = drawHeight * photoRatio; }
      var drawX = x(photoBox) + (photoBox.width - drawWidth) / 2; var drawY = y(photoBox) + (photoBox.height - drawHeight) / 2;
      context.globalAlpha = .32; context.globalCompositeOperation = 'multiply'; context.drawImage(photo, drawX, drawY, drawWidth, drawHeight); context.globalAlpha = 1; context.globalCompositeOperation = 'source-over';
    }
    var left = x(contentRect) + 16; var right = x(contentRect) + contentRect.width - 16; context.textAlign = 'left'; context.fillStyle = '#2c3531'; context.font = '700 14px monospace'; context.fillText('OUR TABLE', left, y(contentRect) + 38); context.textAlign = 'right'; context.fillStyle = '#8c9690'; context.font = '10px sans-serif'; context.fillText('纪念小票', right, y(contentRect) + 38);
    context.strokeStyle = '#e4ece8'; context.beginPath(); context.moveTo(left, y(contentRect) + 58); context.lineTo(right, y(contentRect) + 58); context.stroke();
    context.textAlign = 'left'; context.font = '11px monospace'; context.fillText($('#finalDate').textContent, left, y(contentRect) + 88); context.textAlign = 'right'; context.fillText($('#finalZodiac').textContent, right, y(contentRect) + 88);
    var rowY = y(contentRect) + 126; context.textAlign = 'left'; context.fillStyle = '#2c3531'; context.font = '12px monospace'; var rows = $('#finalOrderList').children; for (var i = 0; i < rows.length; i += 1) { if (rowY > y(contentRect) + contentRect.height - 50) break; context.fillText(rows[i].firstChild.textContent, left, rowY); context.textAlign = 'right'; context.fillStyle = '#c6534d'; context.font = '700 12px sans-serif'; context.fillText(rows[i].lastChild.textContent, right, rowY); context.textAlign = 'left'; context.fillStyle = '#2c3531'; context.font = '12px monospace'; rowY += 40; }
    context.strokeStyle = '#e4ece8'; context.beginPath(); context.moveTo(left, rowY - 18); context.lineTo(right, rowY - 18); context.stroke(); context.fillStyle = '#7a827e'; context.font = '12px monospace'; context.fillText('总计爱意', left, rowY + 20); context.textAlign = 'right'; context.fillStyle = '#c6534d'; context.font = '700 27px Georgia'; context.fillText($('#finalTotal').textContent, right, rowY + 25);
    
    var quote = getZodiacQuote(state.zodiac);
    context.textAlign = 'center'; context.fillStyle = '#8c9690'; context.font = 'italic 11px Georgia, serif';
    if (quote.length > 22) {
      var mid = Math.ceil(quote.length / 2);
      var line1 = quote.slice(0, mid);
      var line2 = quote.slice(mid);
      context.fillText(line1, x(contentRect) + contentRect.width / 2, y(contentRect) + contentRect.height - 44);
      context.fillText(line2, x(contentRect) + contentRect.width / 2, y(contentRect) + contentRect.height - 28);
    } else {
      context.fillText(quote, x(contentRect) + contentRect.width / 2, y(contentRect) + contentRect.height - 36);
    }
    return canvas.toDataURL('image/png');
  }

  function saveReceiptImage() {
    var data = buildReceiptDataUrl();
    $('#receiptCard').setAttribute('data-image', data);
    if (window.xhs && window.xhs.miniTool && window.xhs.miniTool.saveImageToPhotosAlbum) { window.xhs.miniTool.saveImageToPhotosAlbum({ filePath: data }).then(function () { window.alert('图片已保存'); }).catch(function () { window.alert('保存失败，请稍后重试'); }); } else { window.alert('当前环境暂不支持保存图片，请在小红书小工具容器中使用'); }
  }

  function shareReceipt() {
    var data = buildReceiptDataUrl();
    $('#receiptCard').setAttribute('data-image', data);
    if (window.xhs && window.xhs.miniTool && window.xhs.miniTool.postNote) { window.xhs.miniTool.postNote({ title: '今日点单', content: '今天这顿，值得记住。', pageType: 'photo_publish', mediaInfo: { image_resources: [{ url: data }] } }).catch(function () { window.alert('分享失败，请稍后重试'); }); } else { window.alert('分享功能需在小红书小工具容器中使用'); }
  }

  function getOrientation(file, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var view = new DataView(e.target.result);
      if (view.getUint16(0, false) !== 0xFFD8) {
        callback(1);
        return;
      }
      var length = view.byteLength;
      var offset = 2;
      while (offset < length) {
        if (view.getUint16(offset + 2, false) <= 8) {
          callback(1);
          return;
        }
        var marker = view.getUint16(offset, false);
        offset += 2;
        if (marker === 0xFFE1) {
          if (view.getUint32(offset += 2, false) !== 0x45786966) {
            callback(1);
            return;
          }
          var little = view.getUint16(offset += 6, false) === 0x4949;
          offset += view.getUint32(offset + 4, little);
          var tags = view.getUint16(offset, little);
          offset += 2;
          for (var i = 0; i < tags; i += 1) {
            if (view.getUint16(offset + (i * 12), little) === 0x0112) {
              callback(view.getUint16(offset + (i * 12) + 8, little));
              return;
            }
          }
        } else if ((marker & 0xFF00) !== 0xFF00) {
          break;
        } else {
          offset += view.getUint16(offset, false);
        }
      }
      callback(1);
    };
    reader.onerror = function () {
      callback(1);
    };
    reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
  }

  function compressWithImageBitmap(file, callback) {
    if (typeof window.createImageBitmap !== 'function') {
      return false;
    }
    try {
      window.createImageBitmap(file, { imageOrientation: 'from-image' }).then(function (bitmap) {
        var maxSide = 800;
        var width = bitmap.width;
        var height = bitmap.height;
        if (width > maxSide || height > maxSide) {
          if (width >= height) {
            height = Math.round((height * maxSide) / width);
            width = maxSide;
          } else {
            width = Math.round((width * maxSide) / height);
            height = maxSide;
          }
        }
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(bitmap, 0, 0, width, height);
        if (typeof bitmap.close === 'function') {
          bitmap.close();
        }
        callback(null, canvas.toDataURL('image/jpeg', 0.7));
      }).catch(function () {
        compressWithCanvasDirect(file, callback);
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  function compressWithCanvasDirect(file, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        var maxSide = 800;
        var width = img.naturalWidth || img.width;
        var height = img.naturalHeight || img.height;
        if (width > maxSide || height > maxSide) {
          if (width >= height) {
            height = Math.round((height * maxSide) / width);
            width = maxSide;
          } else {
            width = Math.round((width * maxSide) / height);
            height = maxSide;
          }
        }
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        callback(null, canvas.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = function () {
        callback(new Error('图片解析失败'));
      };
      img.src = e.target.result;
    };
    reader.onerror = function () {
      callback(new Error('读取图片文件失败'));
    };
    reader.readAsDataURL(file);
  }

  function compressImage(file, callback) {
    if (compressWithImageBitmap(file, callback)) {
      return;
    }
    compressWithCanvasDirect(file, callback);
  }

  function openCamera() {
    var cameraInput = $('#cameraInput');
    if (cameraInput) {
      cameraInput.value = '';
      cameraInput.click();
    }
  }

  function openAlbum() {
    var albumInput = $('#albumInput');
    if (albumInput) {
      albumInput.value = '';
      albumInput.click();
    }
  }

  function openCustomDishModal(imageData) {
    pendingCustomImage = imageData;
    var modal = $('#customDishModal');
    var preview = $('#customDishPreview');
    var nameInput = $('#customDishName');
    var priceInput = $('#customDishPrice');
    if (!modal || !preview || !nameInput || !priceInput) return;
    preview.src = imageData;
    nameInput.value = '';
    priceInput.value = '20';
    modal.classList.remove('hidden');
    window.setTimeout(function () {
      nameInput.focus();
    }, 100);
  }

  function closeCustomDishModal() {
    var modal = $('#customDishModal');
    if (modal) modal.classList.add('hidden');
    pendingCustomImage = '';
  }

  function handleImageSelected(file) {
    if (!file) return;
    compressImage(file, function (err, compressedData) {
      if (err || !compressedData) {
        window.alert('图片处理失败，请重试或从相册选择');
        return;
      }
      openCustomDishModal(compressedData);
    });
  }

  function saveCustomDish() {
    var nameInput = $('#customDishName');
    var priceInput = $('#customDishPrice');
    var name = nameInput ? nameInput.value.trim() : '';
    if (!name) {
      window.alert('请给这道菜起个名字');
      if (nameInput) nameInput.focus();
      return;
    }
    if (!pendingCustomImage) {
      window.alert('请先拍摄或选择菜品照片');
      return;
    }
    var priceNum = priceInput ? parseInt(priceInput.value, 10) : 20;
    if (isNaN(priceNum) || priceNum < 0) {
      priceNum = 20;
    }
    var targetCategory = state.category === '全部' ? '主食' : state.category;
    if (state.category !== targetCategory) {
      state.category = targetCategory;
      renderCategories();
    }
    var newDish = {
      id: 'custom_' + Date.now(),
      name: name,
      desc: 'TA的专属私房菜',
      price: priceNum,
      category: targetCategory,
      image: pendingCustomImage,
      isCustom: true
    };

    customDishes.push(newDish);
    var savedOk = saveCustomDishes();
    if (!savedOk) {
      customDishes.pop();
      return;
    }

    closeCustomDishModal();
    showToast('已添加到 ' + targetCategory);

    var items = getBookItems();
    var totalPages = Math.max(1, Math.ceil(items.length / 2));
    state.pageIndex = totalPages - 1;
    renderDishes();
  }

  function deleteCustomDish(dishId) {
    var dish = getDish(dishId);
    var dishName = dish ? dish.name : '该菜品';
    if (!window.confirm('确定要删除自定义菜品「' + dishName + '」吗？')) {
      return;
    }
    customDishes = customDishes.filter(function (item) {
      return item.id !== dishId;
    });
    saveCustomDishes();

    ['boy', 'girl'].forEach(function (role) {
      if (state.orders[role] && state.orders[role][dishId]) {
        delete state.orders[role][dishId];
      }
    });
    saveState();

    var items = getBookItems();
    var totalPages = Math.max(1, Math.ceil(items.length / 2));
    if (state.pageIndex >= totalPages) {
      state.pageIndex = totalPages - 1;
    }
    renderDishes();
    renderOrder();
    showToast('已删除菜品');
  }

  function bindBookInteraction() {
    dishScroller.addEventListener('pointerdown', function (event) { dragging = true; dragStartX = event.clientX; });
    dishScroller.addEventListener('pointerup', function (event) { if (!dragging) return; dragging = false; var distance = event.clientX - dragStartX; if (Math.abs(distance) > 45) { suppressBookClick = true; turnPage(distance < 0 ? 1 : -1); window.setTimeout(function () { suppressBookClick = false; }, 80); } });
    dishScroller.addEventListener('pointercancel', function () { dragging = false; });
    dishScroller.addEventListener('click', function (event) {
      if (suppressBookClick) return;

      var openCameraBtn = event.target.closest ? event.target.closest('[data-action="open-camera"]') : null;
      if (openCameraBtn) {
        openCamera();
        return;
      }

      var deleteBtn = event.target.closest ? event.target.closest('[data-action="delete-dish"]') : null;
      if (deleteBtn) {
        event.stopPropagation();
        var dishId = deleteBtn.getAttribute('data-id');
        if (dishId) deleteCustomDish(dishId);
        return;
      }

      var card = event.target.closest ? event.target.closest('.book-dish') : null;
      if (!card) return;
      if (card.classList.contains('book-add-card')) {
        openCamera();
        return;
      }
      var index = card.parentNode === bookPageLeft ? state.pageIndex * 2 : state.pageIndex * 2 + 1;
      var item = getBookItems()[index];
      if (!item || item.isAddCard) return;
      var dish = item;

      var actionBtn = event.target.closest ? event.target.closest('[data-action]') : null;
      if (actionBtn) {
        var action = actionBtn.getAttribute('data-action');
        if (action === 'minus') {
          removeDish(dish);
        } else if (action === 'plus') {
          addDish(dish);
        }
        return;
      }

      // 点击菜品卡片主体默认增加一份
      addDish(dish);
    });
    $('#bookPrev').addEventListener('click', function (event) { event.stopPropagation(); turnPage(-1); }); $('#bookNext').addEventListener('click', function (event) { event.stopPropagation(); turnPage(1); });
  }

  function bindCustomDishEvents() {
    var cameraInput = $('#cameraInput');
    var albumInput = $('#albumInput');
    if (cameraInput) {
      cameraInput.addEventListener('change', function (e) {
        var file = e.target.files && e.target.files[0];
        handleImageSelected(file);
      });
    }
    if (albumInput) {
      albumInput.addEventListener('change', function (e) {
        var file = e.target.files && e.target.files[0];
        handleImageSelected(file);
      });
    }

    var modal = $('#customDishModal');
    if (modal) {
      modal.addEventListener('click', function (e) {
        var actionEl = e.target.closest ? e.target.closest('[data-custom-action]') : null;
        if (!actionEl) return;
        var action = actionEl.getAttribute('data-custom-action');
        if (action === 'cancel') {
          closeCustomDishModal();
        } else if (action === 'retake') {
          openCamera();
        } else if (action === 'album') {
          openAlbum();
        }
      });
    }

    var confirmBtn = $('#confirmCustomDish');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', saveCustomDish);
    }
  }

  function init() {
    loadState();
    bindCustomDishEvents();
    document.querySelectorAll('[data-gender]').forEach(function (button) {
      button.addEventListener('click', function () {
        state.gender = button.getAttribute('data-gender');
        saveState();
        document.querySelectorAll('[data-gender]').forEach(function (option) { option.classList.toggle('active', option === button); });
        updateStartButton();
        $('#selectionHint').textContent = state.zodiac ? '已选择' + (state.gender === 'boy' ? '男生' : '女生') + '和' + state.zodiac + '，可以开始点单' : '已选择点单者，还需要选择星座';
      });
    });
    startOrderButton.addEventListener('click', function () { if (state.gender && state.zodiac) enterOrder(state.gender); });
    $('#backButton').addEventListener('click', showOnboarding); $('#finishButton').addEventListener('click', showComplete); $('#saveImageButton').addEventListener('click', saveReceiptImage); $('#shareButton').addEventListener('click', shareReceipt);
    $('#restartButton').addEventListener('click', function () { state.orders = { boy: {}, girl: {} }; saveState(); enterOrder(state.gender || 'boy'); });
    bindBookInteraction(); renderZodiac(); updateStartButton();
    document.querySelectorAll('[data-gender]').forEach(function (button) { button.classList.toggle('active', button.getAttribute('data-gender') === state.gender); });
    if (state.gender && state.zodiac) enterOrder(state.gender); else showOnboarding();
  }

  init();
}());
