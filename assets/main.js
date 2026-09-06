(function () {
  'use strict';

  var STORAGE_KEY = 'couple-order-draft-v2';
  var zodiacData = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'];
  var categories = ['全部', '主食', '小吃', '饮品', '甜品', '沙拉', '汤品'];
  var dishes = [
    { id: 'pasta', category: '主食', name: '奶油意面', desc: '绵密奶油，香气刚刚好', price: 28, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20creamy%20Italian%20pasta%20with%20parmesan%20and%20parsley%20on%20a%20ceramic%20plate%2C%20warm%20restaurant%20lighting&image_size=square' },
    { id: 'pizza', category: '主食', name: '芝士披萨', desc: '拉丝芝士的快乐', price: 36, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20a%20cheesy%20pepperoni%20pizza%20with%20melted%20mozzarella%20on%20a%20wooden%20table&image_size=square' },
    { id: 'ramen', category: '主食', name: '番茄浓汤面', desc: '热乎乎的一大碗', price: 25, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20tomato%20broth%20noodles%20with%20egg%20and%20greens%20in%20a%20ceramic%20bowl&image_size=square' },
    { id: 'risotto', category: '主食', name: '蘑菇烩饭', desc: '浓郁菌香，软糯顺滑', price: 32, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20creamy%20mushroom%20risotto%20with%20parmesan%20on%20a%20white%20plate&image_size=square' },
    { id: 'beef-rice', category: '主食', name: '照烧牛肉饭', desc: '甜咸酱汁裹住嫩牛肉', price: 34, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20teriyaki%20beef%20rice%20bowl%20with%20sesame%20and%20scallions&image_size=square' },
    { id: 'curry', category: '主食', name: '日式咖喱饭', desc: '温暖浓郁的咖喱香', price: 29, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20Japanese%20curry%20rice%20with%20carrots%20and%20potatoes%20in%20a%20bowl&image_size=square' },
    { id: 'lasagna', category: '主食', name: '番茄千层面', desc: '层层芝士与番茄肉酱', price: 35, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20baked%20lasagna%20with%20tomato%20sauce%20and%20melted%20cheese&image_size=square' },
    { id: 'udon', category: '主食', name: '海鲜乌冬面', desc: '鲜甜汤底，口感弹润', price: 31, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20seafood%20udon%20noodle%20soup%20with%20shrimp%20and%20vegetables&image_size=square' },
    { id: 'chicken-rice', category: '主食', name: '香煎鸡排饭', desc: '外脆里嫩，满足感满分', price: 30, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20crispy%20pan-seared%20chicken%20with%20rice%20and%20vegetables&image_size=square' },
    { id: 'seafood-pasta', category: '主食', name: '蒜香海鲜意面', desc: '虾仁鱿鱼与蒜香交织', price: 38, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20garlic%20seafood%20spaghetti%20with%20shrimp%20and%20squid&image_size=square' },
    { id: 'fried-rice', category: '主食', name: '扬州炒饭', desc: '粒粒分明，鲜香爽口', price: 24, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20Yangzhou%20fried%20rice%20with%20egg%20peas%20and%20ham&image_size=square' },
    { id: 'fries', category: '小吃', name: '薯条', desc: '适合分享的小份快乐', price: 16, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20golden%20crispy%20French%20fries%20in%20a%20paper%20cone%20with%20ketchup&image_size=square' },
    { id: 'wings', category: '小吃', name: '香辣鸡翅', desc: '外酥里嫩，微微带辣', price: 26, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20spicy%20crispy%20chicken%20wings%20with%20sesame%20and%20scallions&image_size=square' },
    { id: 'onion-rings', category: '小吃', name: '洋葱圈', desc: '金黄酥脆，一口咔嚓', price: 18, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20golden%20crispy%20onion%20rings%20with%20dipping%20sauce&image_size=square' },
    { id: 'takoyaki', category: '小吃', name: '章鱼小丸子', desc: '软糯章鱼，酱香十足', price: 22, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20Japanese%20takoyaki%20octopus%20balls%20with%20bonito%20flakes&image_size=square' },
    { id: 'nachos', category: '小吃', name: '芝士玉米片', desc: '酥脆玉米片配浓郁芝士', price: 24, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20loaded%20cheese%20nachos%20with%20jalapeno%20and%20tomato%20salsa&image_size=square' },
    { id: 'croquette', category: '小吃', name: '土豆可乐饼', desc: '外酥内绵，暖呼呼', price: 20, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20Japanese%20potato%20croquettes%20with%20golden%20breadcrumbs&image_size=square' },
    { id: 'spring-roll', category: '小吃', name: '鲜虾春卷', desc: '薄脆外皮包裹鲜虾', price: 23, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20crispy%20shrimp%20spring%20rolls%20with%20sweet%20chili%20sauce&image_size=square' },
    { id: 'popcorn', category: '小吃', name: '焦糖爆米花', desc: '看电影的甜脆搭档', price: 15, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20caramel%20popcorn%20in%20a striped paper cup&image_size=square' },
    { id: 'edamame', category: '小吃', name: '盐烤毛豆', desc: '清爽咸香，越吃越上头', price: 14, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20salt%20grilled%20edamame%20soybean%20pods%20on%20a plate&image_size=square' },
    { id: 'cheese-sticks', category: '小吃', name: '芝士棒', desc: '拉丝芝士的酥脆口感', price: 21, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20golden%20fried%20mozzarella%20cheese%20sticks%20with%20marinara&image_size=square' },
    { id: 'mochi', category: '小吃', name: '烤年糕', desc: '软糯焦香，简单满足', price: 17, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20grilled%20Japanese%20rice%20cake%20mochi%20with%20soy%20sauce&image_size=square' },
    { id: 'tea', category: '饮品', name: '蜜桃乌龙', desc: '清甜茶香，碰杯吧', price: 18, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20peach%20oolong%20tea%20in%20a%20clear%20glass%20with%20peach%20slices&image_size=square' },
    { id: 'latte', category: '饮品', name: '燕麦拿铁', desc: '细腻奶泡，温柔醒脑', price: 22, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20oat%20milk%20latte%20with%20latte%20art%20in%20a%20ceramic%20cup&image_size=square' },
    { id: 'lemonade', category: '饮品', name: '蜂蜜柠檬水', desc: '酸甜清爽，补充元气', price: 16, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20honey%20lemonade%20with%20lemon%20slices%20and%20mint%20in%20a%20glass&image_size=square' },
    { id: 'strawberry-soda', category: '饮品', name: '草莓气泡水', desc: '粉粉的快乐气泡', price: 20, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20strawberry%20sparkling%20soda%20with%20fresh%20berries%20in%20a%20glass&image_size=square' },
    { id: 'matcha', category: '饮品', name: '抹茶拿铁', desc: '茶香与奶香的平衡', price: 23, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20green%20matcha%20latte%20with%20foam%20in%20a%20glass&image_size=square' },
    { id: 'cocoa', category: '饮品', name: '热可可', desc: '暖暖的巧克力拥抱', price: 21, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20hot%20chocolate%20with%20whipped%20cream%20and%20cocoa%20in%20a%20mug&image_size=square' },
    { id: 'grape-tea', category: '饮品', name: '葡萄果茶', desc: '果香清新，微甜不腻', price: 19, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20purple%20grape%20fruit%20tea%20with%20grape%20halves%20in%20a%20glass&image_size=square' },
    { id: 'iced-americano', category: '饮品', name: '冰美式', desc: '清醒利落的咖啡香', price: 17, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20iced%20Americano%20coffee%20with%20ice%20cubes%20in%20a%20clear%20glass&image_size=square' },
    { id: 'mango-smoothie', category: '饮品', name: '芒果冰沙', desc: '浓郁果香，冰凉顺滑', price: 24, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20bright%20mango%20smoothie%20with%20mango%20cubes%20in%20a%20glass&image_size=square' },
    { id: 'milk-tea', category: '饮品', name: '黑糖奶茶', desc: '醇厚奶香，黑糖回甘', price: 20, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20brown%20sugar%20bubble%20milk%20tea%20with%20tapioca%20pearls&image_size=square' },
    { id: 'rose-soda', category: '饮品', name: '玫瑰气泡饮', desc: '浪漫花香，轻盈起泡', price: 22, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20rose%20sparkling%20drink%20with%20edible%20rose%20petals%20in%20a%20glass&image_size=square' },
    { id: 'cake', category: '甜品', name: '云朵蛋糕', desc: '柔软的甜蜜收尾', price: 22, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20fluffy%20cloud%20cake%20with%20white%20cream%20and%20berries&image_size=square' },
    { id: 'tiramisu', category: '甜品', name: '提拉米苏', desc: '咖啡可可的浓郁甜蜜', price: 26, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20classic%20tiramisu%20with%20cocoa%20powder%20and%20mascarpone%20layers&image_size=square' },
    { id: 'panna-cotta', category: '甜品', name: '香草布丁', desc: '入口即化的奶香', price: 19, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20vanilla%20panna%20cotta%20with%20berry%20sauce%20on%20a%20plate&image_size=square' },
    { id: 'waffle', category: '甜品', name: '莓果华夫饼', desc: '酥香华夫饼配酸甜莓果', price: 25, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20Belgian%20waffle%20with%20berries%20and%20whipped%20cream&image_size=square' },
    { id: 'churros', category: '甜品', name: '肉桂吉事果', desc: '外脆内软的肉桂香', price: 18, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20cinnamon%20sugar%20churros%20with%20chocolate%20dip&image_size=square' },
    { id: 'fruit-tart', category: '甜品', name: '水果挞', desc: '新鲜水果铺满酥皮', price: 28, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20fresh%20fruit%20tart%20with%20custard%20and%20berries&image_size=square' },
    { id: 'pancake', category: '甜品', name: '蜂蜜松饼', desc: '松软热乎的蜂蜜甜香', price: 23, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20fluffy%20pancakes%20with%20honey%20and%20butter&image_size=square' },
    { id: 'chocolate-mousse', category: '甜品', name: '巧克力慕斯', desc: '丝滑浓醇的巧克力', price: 24, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20dark%20chocolate%20mousse%20with%20chocolate%20shavings%20in%20a%20glass&image_size=square' },
    { id: 'lemon-tart', category: '甜品', name: '柠檬塔', desc: '清新的酸甜收尾', price: 21, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20lemon%20meringue%20tart%20with%20toasted%20meringue&image_size=square' },
    { id: 'ice-cream', category: '甜品', name: '双球冰淇淋', desc: '冰凉绵密的快乐', price: 20, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20two scoops of vanilla and strawberry ice cream in a bowl&image_size=square' },
    { id: 'cheesecake', category: '甜品', name: '芝士蛋糕', desc: '浓郁奶酪的细腻口感', price: 26, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20New York cheesecake with berry sauce&image_size=square' },
    { id: 'caesar', category: '沙拉', name: '凯撒沙拉', desc: '脆爽生菜与帕玛森芝士', price: 24, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20Caesar%20salad%20with%20romaine%20lettuce%20croutons%20and%20parmesan&image_size=square' },
    { id: 'greek-salad', category: '沙拉', name: '希腊沙拉', desc: '番茄黄瓜与菲达芝士', price: 23, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20Greek%20salad%20with%20tomatoes%20cucumber%20olives%20and%20feta&image_size=square' },
    { id: 'tuna-salad', category: '沙拉', name: '金枪鱼沙拉', desc: '清爽蔬菜搭配鲜嫩鱼肉', price: 28, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20tuna%20salad%20with%20mixed%20greens%20and%20boiled%20egg&image_size=square' },
    { id: 'shrimp-salad', category: '沙拉', name: '鲜虾牛油果沙拉', desc: '鲜虾与牛油果的清新组合', price: 30, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20shrimp%20avocado%20salad%20with%20mixed%20greens&image_size=square' },
    { id: 'chicken-salad', category: '沙拉', name: '鸡肉藜麦沙拉', desc: '饱腹又轻盈的健康选择', price: 29, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20grilled%20chicken%20quinoa%20salad%20with%20vegetables&image_size=square' },
    { id: 'corn-salad', category: '沙拉', name: '玉米蔬菜沙拉', desc: '甜玉米与时蔬的清爽口感', price: 20, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20corn%20vegetable%20salad%20with%20lettuce%20and%20cherry%20tomatoes&image_size=square' },
    { id: 'fruit-salad', category: '沙拉', name: '缤纷水果沙拉', desc: '多种水果的自然甜味', price: 25, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20colorful%20fresh%20fruit%20salad%20in%20a glass bowl&image_size=square' },
    { id: 'caprese', category: '沙拉', name: '番茄芝士沙拉', desc: '番茄与芝士的经典搭配', price: 22, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20caprese%20salad%20with%20tomato%20mozzarella%20and basil&image_size=square' },
    { id: 'potato-salad', category: '沙拉', name: '土豆沙拉', desc: '绵密土豆与蔬菜蛋香', price: 21, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20creamy%20potato%20salad%20with%20egg%20and%20herbs&image_size=square' },
    { id: 'seaweed-salad', category: '沙拉', name: '芝麻海藻沙拉', desc: '爽脆海藻与芝麻香气', price: 19, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20Japanese%20seaweed%20salad%20with%20sesame%20seeds&image_size=square' },
    { id: 'miso-soup', category: '汤品', name: '日式味噌汤', desc: '豆腐海带的温暖鲜味', price: 15, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20Japanese%20miso%20soup%20with%20tofu%20seaweed%20and scallions&image_size=square' },
    { id: 'corn-soup', category: '汤品', name: '奶油玉米浓汤', desc: '细腻香甜，温暖入口', price: 18, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20creamy%20corn%20soup%20in a bowl with croutons&image_size=square' },
    { id: 'pumpkin-soup', category: '汤品', name: '南瓜浓汤', desc: '南瓜自然的香甜暖意', price: 19, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20smooth pumpkin soup with cream swirl and seeds&image_size=square' },
    { id: 'mushroom-soup', category: '汤品', name: '奶油蘑菇汤', desc: '浓郁菌香与奶油口感', price: 22, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20creamy mushroom soup with sliced mushrooms in a bowl&image_size=square' },
    { id: 'tomato-soup', category: '汤品', name: '罗宋汤', desc: '番茄与蔬菜的酸甜浓郁', price: 21, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20Russian borscht soup with beetroot cabbage and sour cream&image_size=square' },
    { id: 'seafood-soup', category: '汤品', name: '海鲜豆腐汤', desc: '鲜虾贝类与嫩豆腐', price: 27, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20seafood tofu soup with shrimp clams and vegetables&image_size=square' },
    { id: 'chicken-soup', category: '汤品', name: '香菇鸡汤', desc: '清鲜温润，慢慢喝完', price: 25, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20clear chicken mushroom soup with tender chicken pieces&image_size=square' },
    { id: 'clam-chowder', category: '汤品', name: '蛤蜊浓汤', desc: '奶香与海味的丰盈口感', price: 28, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20New England clam chowder with clams and potatoes&image_size=square' },
    { id: 'minestrone', category: '汤品', name: '意式蔬菜汤', desc: '番茄汤底与多种时蔬', price: 20, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20Italian minestrone vegetable soup with beans and pasta&image_size=square' },
    { id: 'seaweed-egg-soup', category: '汤品', name: '紫菜蛋花汤', desc: '清淡鲜美的家常味道', price: 16, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20Chinese seaweed egg drop soup with scallions&image_size=square' },
    { id: 'fish-soup', category: '汤品', name: '奶白鱼汤', desc: '鲜鱼慢炖，汤色浓白', price: 30, image: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=realistic%20food%20photography%20of%20milky white fish soup with tofu and ginger in a ceramic bowl&image_size=square' }
  ];
  var zodiacRecommend = { '白羊座': 'pizza', '金牛座': 'pasta', '双子座': 'tea', '巨蟹座': 'ramen', '狮子座': 'pizza', '处女座': 'pasta', '天秤座': 'cake', '天蝎座': 'ramen', '射手座': 'fries', '摩羯座': 'ramen', '水瓶座': 'tea', '双鱼座': 'cake' };
  var state = { gender: '', zodiac: '', category: '全部', pageIndex: 0, orders: { boy: {}, girl: {} } };
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

  function loadState() {
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
  function filteredDishes() { return state.category === '全部' ? dishes : dishes.filter(function (dish) { return dish.category === state.category; }); }
  function getDish(id) { return dishes.filter(function (dish) { return dish.id === id; })[0]; }

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

  function renderCategories() {
    categoryTabs.innerHTML = '';
    categories.forEach(function (category) {
      var button = document.createElement('button');
      button.type = 'button'; button.className = state.category === category ? 'active' : ''; button.textContent = category;
      button.addEventListener('click', function () { state.category = category; state.pageIndex = 0; renderCategories(); renderDishes(); });
      categoryTabs.appendChild(button);
    });
  }

  function renderBookPage(dish, side) {
    if (!dish) return '<div class="page-empty"><span>—</span><p>这一页暂时空着</p></div>';
    var count = state.orders[getActiveRole()][dish.id] || 0;
    var recommended = zodiacRecommend[state.zodiac] === dish.id;
    return '<div class="book-dish" data-dish-id="' + dish.id + '">' +
      (recommended ? '<span class="recommend-badge">今日推荐</span>' : '') +
      '<span class="dish-illustration illustration-' + dish.id + '">' + getDishArt(dish.id) + '</span>' +
      '<strong>' + dish.name + '</strong><small>' + dish.desc + '</small><em>❤️ ' + dish.price + ' 爱意值</em>' +
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
    var dish = getDish(zodiacRecommend[state.zodiac] || 'pasta');
    $('#recommendation').textContent = state.zodiac ? '★ ' + state.zodiac + '今日推荐：' + dish.name : '★ 今日推荐：' + dish.name;
  }

  function renderDishes() {
    var menu = filteredDishes();
    var totalPages = Math.max(1, Math.ceil(menu.length / 2));
    if (state.pageIndex >= totalPages) state.pageIndex = totalPages - 1;
    if (state.pageIndex < 0) state.pageIndex = 0;
    bookPageLeft.innerHTML = renderBookPage(menu[state.pageIndex * 2], 'left');
    bookPageRight.innerHTML = renderBookPage(menu[state.pageIndex * 2 + 1], 'right');
    $('#bookPageLabel').textContent = (state.pageIndex + 1) + ' / ' + totalPages;
    $('#bookPrev').disabled = state.pageIndex === 0;
    $('#bookNext').disabled = state.pageIndex === totalPages - 1;
    renderRecommendation();
  }

  function turnPage(direction) {
    var totalPages = Math.max(1, Math.ceil(filteredDishes().length / 2));
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
    if (!hasItems) { list.innerHTML = '<p class="empty-note" id="emptyNote">还没有选择菜品<br />从下方菜单开始添加</p>'; }
  }

  function renderOrder() {
    var totals = getTotals(); var roleName = getActiveRole() === 'boy' ? '男生' : '女生';
    $('#headerMeta').textContent = roleName + ' · ' + (state.zodiac || '未选择星座');
    $('#itemCount').textContent = totals.count + ' 道'; $('#totalPrice').textContent = '❤️ ' + totals.total;
    renderSelected();
  }

  function enterOrder(gender) {
    if (!state.zodiac) { window.alert('请先选择星座，再开始点单'); return; }
    state.gender = gender; state.category = '全部'; state.pageIndex = 0; saveState();
    onboardingView.classList.add('hidden'); completeView.classList.add('hidden'); orderView.classList.remove('hidden');
    renderCategories(); renderDishes(); renderOrder();
  }

  function showOnboarding() {
    orderView.classList.add('hidden'); completeView.classList.add('hidden'); onboardingView.classList.remove('hidden'); renderZodiac();
  }

  function clearOrders() { state.orders = { boy: {}, girl: {} }; saveState(); renderDishes(); renderOrder(); }

  function showComplete() {
    var totals = getTotals();
    if (!totals.count) { window.alert('请先选择一道菜'); return; }
    if (!window.confirm('确认生成这份订单吗？')) return;
    var receiptPhoto = receiptPhotoSources[Math.floor(Math.random() * receiptPhotoSources.length)];
    receiptPhotoBg.src = receiptPhoto;
    receiptPhotoBg.setAttribute('data-source', receiptPhoto);
    $('#finalDate').textContent = getDateText(); $('#finalZodiac').textContent = state.zodiac;
    var finalList = $('#finalOrderList'); finalList.innerHTML = '';
    Object.keys(state.orders[getActiveRole()]).forEach(function (id) { var dish = getDish(id); var amount = state.orders[getActiveRole()][id]; if (dish && amount) { var row = document.createElement('div'); row.innerHTML = '<span>' + dish.name + ' ×' + amount + '</span><strong>❤️ ' + (dish.price * amount) + '</strong>'; finalList.appendChild(row); } });
    $('#finalTotal').textContent = '❤️ ' + totals.total; orderView.classList.add('hidden'); completeView.classList.remove('hidden');
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
    var rowY = y(contentRect) + 126; context.textAlign = 'left'; context.fillStyle = '#2c3531'; context.font = '12px monospace'; var rows = $('#finalOrderList').children; for (var i = 0; i < rows.length; i += 1) { if (rowY > y(contentRect) + contentRect.height - 20) break; context.fillText(rows[i].firstChild.textContent, left, rowY); context.textAlign = 'right'; context.fillStyle = '#c6534d'; context.font = '700 12px sans-serif'; context.fillText(rows[i].lastChild.textContent, right, rowY); context.textAlign = 'left'; context.fillStyle = '#2c3531'; context.font = '12px monospace'; rowY += 40; }
    context.strokeStyle = '#e4ece8'; context.beginPath(); context.moveTo(left, rowY - 18); context.lineTo(right, rowY - 18); context.stroke(); context.fillStyle = '#7a827e'; context.font = '12px monospace'; context.fillText('总计爱意', left, rowY + 20); context.textAlign = 'right'; context.fillStyle = '#c6534d'; context.font = '700 27px Georgia'; context.fillText($('#finalTotal').textContent, right, rowY + 25);
    context.textAlign = 'center'; context.fillStyle = '#8c9690'; context.font = '13px Georgia'; context.fillText('今天这顿，值得记住。', x(contentRect) + contentRect.width / 2, y(contentRect) + contentRect.height - 42);
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

  function bindBookInteraction() {
    dishScroller.addEventListener('pointerdown', function (event) { dragging = true; dragStartX = event.clientX; });
    dishScroller.addEventListener('pointerup', function (event) { if (!dragging) return; dragging = false; var distance = event.clientX - dragStartX; if (Math.abs(distance) > 45) { suppressBookClick = true; turnPage(distance < 0 ? 1 : -1); window.setTimeout(function () { suppressBookClick = false; }, 80); } });
    dishScroller.addEventListener('pointercancel', function () { dragging = false; });
    dishScroller.addEventListener('click', function (event) {
      if (suppressBookClick) return;
      var card = event.target.closest ? event.target.closest('.book-dish') : null;
      if (!card) return;
      var index = card.parentNode === bookPageLeft ? state.pageIndex * 2 : state.pageIndex * 2 + 1;
      var dish = filteredDishes()[index];
      if (!dish) return;

      var actionBtn = event.target.closest ? event.target.closest('[data-action]') : null;
      if (actionBtn) {
        var action = actionBtn.getAttribute('data-action');
        if (action === 'minus') {
          removeDish(dish);
        } else {
          addDish(dish);
        }
        return;
      }

      // 点击菜品卡片主体默认增加一份
      addDish(dish);
    });
    $('#bookPrev').addEventListener('click', function (event) { event.stopPropagation(); turnPage(-1); }); $('#bookNext').addEventListener('click', function (event) { event.stopPropagation(); turnPage(1); });
  }

  function init() {
    loadState();
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
