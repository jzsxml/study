/**
 * 人教版 PEP 小学英语 3-6 年级 · 必会句型与语法知识点
 * 按册整理：每册 8 组必会句型 + 7 个语法点，共 8 册。
 * 字段：
 *   patterns = [{ en: 英文句型, cn: 中文意思, use: 使用场景, eg: [例句行], egCn: 例句中文 }]
 *   grammars = [{ t: 语法点, lines: [规则说明], eg: [英文例句], tip: 易错提示 }]
 */
window.ENGLISH_EXTRA = {
  books: [
    {
      id: '3a', title: '三年级上册',
      patterns: [
        { en: "What's your name?", cn: '你叫什么名字？', use: '询问姓名', eg: ['— What\'s your name?', '— My name is Sarah.'], egCn: '——你叫什么名字？——我叫萨拉。' },
        { en: 'How are you?', cn: '你好吗？', use: '问候与回答', eg: ['— How are you?', '— I\'m fine, thank you.'], egCn: '——你好吗？——我很好，谢谢。' },
        { en: 'What colour is it?', cn: '它是什么颜色的？', use: '询问颜色', eg: ['— What colour is it?', '— It\'s red.'], egCn: '——它是什么颜色的？——它是红色的。' },
        { en: 'This is my face.', cn: '这是我的脸。', use: '介绍身体部位', eg: ['This is my face.', 'Touch your nose.'], egCn: '这是我的脸。摸摸你的鼻子。' },
        { en: "What's this?", cn: '这是什么？', use: '询问物品', eg: ['— What\'s this?', '— It\'s a duck.'], egCn: '——这是什么？——它是一只鸭子。' },
        { en: "I'd like some juice, please.", cn: '我想要一些果汁。', use: '礼貌表达想要某物', eg: ['I\'d like some juice, please.', 'Here you are.'], egCn: '我想要一些果汁。给你。' },
        { en: 'Can I have some water, please?', cn: '请给我一些水好吗？', use: '礼貌请求', eg: ['— Can I have some water, please?', '— Here you are.'], egCn: '——请给我一些水好吗？——给你。' },
        { en: 'How old are you?', cn: '你几岁了？', use: '询问年龄', eg: ['— How old are you?', '— I\'m nine.'], egCn: '——你几岁了？——我九岁。' }
      ],
      grammars: [
        { t: 'be 动词 am / is / are', lines: ['I 用 am，you 用 are，is 连着他（he）、她（she）、它（it）。', '复数主语 we、they、you 都用 are。'], eg: ['I am a student.', 'She is my teacher.', 'They are my friends.'], tip: '不要说 I is / He are，主语和 be 动词要配对。' },
        { t: '人称代词 I / you / he / she / it', lines: ['I 我，you 你，he 他，she 她，it 它，都是主格，放在句子开头作主语。', '主格后面接 be 动词：I am…，you are…，he / she / it is…。'], eg: ['I am Lily.', 'He is my brother.', 'It is a cat.'], tip: '动物和物品用 it，不要用 he 或 she。' },
        { t: 'this 和 that', lines: ['this 指离说话人近的人或物：This is my book.', 'that 指离说话人远的人或物：That is your bag.'], eg: ['This is a pen.', 'That is a ruler.'], tip: '介绍别人时常用 This is…，课文更常说 This is my friend.。' },
        { t: 'a 和 an 的用法', lines: ['a 用在辅音音素开头的单词前：a book、a duck、a ruler。', 'an 用在元音音素开头的单词前：an apple、an egg、an orange。'], eg: ['This is a duck.', 'I have an apple.'], tip: '判断用 a 还是 an 看的是发音，不是字母。' },
        { t: '名词的复数（加 -s）', lines: ['多数可数名词加 s：book → books，pen → pens。', '复数名词常与 are、many 连用。'], eg: ['I have two pens.', 'These are books.'], tip: 'one book、two books，数量超过 1 时名词要加 s。' },
        { t: '形容词描述颜色和特征', lines: ['形容词放在名词前作定语：a red pen。', '放在 be 动词后作表语：It is red.。'], eg: ['It is a red pen.', 'The bag is black.'], tip: '中文说“红色的笔”，英文是 a red pen，形容词在前。' },
        { t: 'How many 询问数量', lines: ['How many + 可数名词复数 + 其他：How many books?', '回答用具体数字：Five.'], eg: ['How many pens do you have?', 'I have three pens.'], tip: 'how many 后面必须跟名词复数。' }
      ]
    },
    {
      id: '3b', title: '三年级下册',
      patterns: [
        { en: 'Where are you from?', cn: '你来自哪里？', use: '询问籍贯或国家', eg: ['— Where are you from?', '— I\'m from China.'], egCn: '——你来自哪里？——我来自中国。' },
        { en: "Who's that man?", cn: '那个男人是谁？', use: '询问人物身份', eg: ['— Who\'s that man?', '— He\'s my father.'], egCn: '——那个男人是谁？——他是我的爸爸。' },
        { en: 'It is so big!', cn: '它真大啊！', use: '描述人或物的特征', eg: ['Look at the elephant.', 'It is so big!'], egCn: '看那头大象。它真大啊！' },
        { en: 'It has a long nose.', cn: '它有长长的鼻子。', use: '描述动物的外形', eg: ['Look at the elephant.', 'It has a long nose and a short tail.'], egCn: '看那头大象。它有长鼻子和短尾巴。' },
        { en: 'Where is my car?', cn: '我的小汽车在哪里？', use: '询问位置', eg: ['— Where is my car?', '— It\'s under the chair.'], egCn: '——我的小汽车在哪里？——在椅子下面。' },
        { en: 'Do you like pears?', cn: '你喜欢梨吗？', use: '询问喜好', eg: ['— Do you like pears?', '— Yes, I do. / No, I don\'t.'], egCn: '——你喜欢梨吗？——是的，我喜欢。/不，我不喜欢。' },
        { en: 'Have some grapes.', cn: '吃些葡萄吧。', use: '请别人吃东西', eg: ['Have some grapes.', '— Sorry, I don\'t like grapes.'], egCn: '吃些葡萄吧。——对不起，我不喜欢葡萄。' },
        { en: 'How many kites do you see?', cn: '你看到多少只风筝？', use: '询问数量', eg: ['— How many kites do you see?', '— I see twelve.'], egCn: '——你看到多少只风筝？——我看到十二只。' }
      ],
      grammars: [
        { t: 'Where is / Where are + 方位介词', lines: ['单数用 Where is…，复数用 Where are…。', '常用方位介词：in（里面）、on（上面）、under（下面）。'], eg: ['Where is the cat? It is under the desk.', 'Where are the books? They are on the chair.'], tip: '回答时单数用 It is，复数用 They are。' },
        { t: 'It is 与 It has 的区别', lines: ['It is + 形容词，描述“它是什么样的”：It is big.', 'It has + 名词，描述“它有什么”：It has a long nose.'], eg: ['It is small and cute.', 'It has two big eyes.'], tip: 'is 后面跟形容词，has 后面跟名词，别写成 It is a long nose。' },
        { t: 'Do you like…? 一般疑问句', lines: ['一般现在时的一般疑问句用 Do 开头。', '肯定回答 Yes, I do.；否定回答 No, I don\'t.'], eg: ['Do you like oranges?', 'Yes, I do. / No, I don\'t.'], tip: '不要说 Yes, I like.，要用助动词 do 回答。' },
        { t: '名词复数的规则变化', lines: ['一般加 s：cat → cats。', '以 s、x、ch、sh 结尾加 es：box → boxes，watch → watches。', '以辅音字母 + y 结尾，变 y 为 i 加 es：baby → babies。'], eg: ['three boxes', 'two babies'], tip: '注意 boy → boys，因为 y 前是元音字母 o。' },
        { t: 'Can I…? 请求许可', lines: ['Can I + 动词原形，表示请求允许做某事。', '肯定回答 Sure. / Yes, you can.；否定 Sorry, you can\'t.'], eg: ['Can I have some water?', 'Sure, here you are.'], tip: 'can 后面永远跟动词原形，不加 s 或 ing。' },
        { t: 'He / She is… 第三人称单数', lines: ['谈论男性用 he，女性用 she，动物或物品用 it。', 'be 动词一律用 is。'], eg: ['He is my brother.', 'She is a teacher.'], tip: '中文的“他/她”读音相同，写英文时要注意区分 he 和 she。' },
        { t: 'some 表示“一些”', lines: ['some 修饰可数名词复数或不可数名词：some apples、some water。', '表示请求或邀请时，疑问句也用 some：Can I have some water? / Have some grapes.'], eg: ['I have some books.', 'Have some juice, please.'], tip: '否定句和一般疑问句通常用 any：I don\'t have any pens.' }
      ]
    },
    {
      id: '4a', title: '四年级上册',
      patterns: [
        { en: "What's in the classroom?", cn: '教室里有什么？', use: '询问某处有什么', eg: ['— What\'s in the classroom?', '— One blackboard, many desks and chairs.'], egCn: '——教室里有什么？——一块黑板，许多桌椅。' },
        { en: "Let's clean the classroom.", cn: '我们来打扫教室吧。', use: '提出建议', eg: ['Let\'s clean the classroom.', 'OK. Let me clean the windows.'], egCn: '我们来打扫教室吧。好，我来擦窗户。' },
        { en: "What's in your schoolbag?", cn: '你的书包里有什么？', use: '询问书包里的物品', eg: ['— What\'s in your schoolbag?', '— An English book and three storybooks.'], egCn: '——你的书包里有什么？——一本英语书和三本故事书。' },
        { en: "What's his name?", cn: '他叫什么名字？', use: '询问他人姓名', eg: ['— What\'s his name?', '— His name is Zhang Peng.'], egCn: '——他叫什么名字？——他叫张鹏。' },
        { en: 'He has short hair.', cn: '他留着短发。', use: '描述人物外貌', eg: ['He has short hair and big eyes.', 'She has long hair.'], egCn: '他留着短发，有一双大眼睛。她留着长发。' },
        { en: 'Where are the keys?', cn: '钥匙在哪里？', use: '询问物品位置（复数）', eg: ['— Where are the keys?', '— They\'re on the table.'], egCn: '——钥匙在哪里？——在桌子上。' },
        { en: 'What would you like?', cn: '你想要什么？', use: '询问想要的食物', eg: ['— What would you like?', '— I\'d like some soup.'], egCn: '——你想要什么？——我想要一些汤。' },
        { en: 'How many people are there in your family?', cn: '你家有多少人？', use: '询问家庭人数', eg: ['— How many people are there in your family?', '— Three.'], egCn: '——你家有多少人？——三口人。' }
      ],
      grammars: [
        { t: '物主代词 my / your / his / her', lines: ['my 我的，your 你的，his 他的，her 她的。', '后面必须接名词：his name、her bag。'], eg: ['This is my book.', 'Her name is Amy.'], tip: 'his 和 her 看“谁拥有”，不看说话人性别。' },
        { t: 'What\'s in…? 与 there be 初步', lines: ['What\'s in the box? 用来询问某处有什么。', '回答可用 There is / There are，或直接列举物品。'], eg: ['What\'s in your schoolbag?', 'There are three books and a pencil box.'], tip: '回答单个物品用 There is，多个用 There are。' },
        { t: "Let's + 动词原形", lines: ['Let\'s = Let us，表示建议一起做某事。', '后面跟动词原形：Let\'s go. / Let\'s clean the desks.'], eg: ['Let\'s go to school.', 'Let\'s help him.'], tip: 'Let\'s 后面不能加 to，也不能加 ing。' },
        { t: 'have / has 表示“有”', lines: ['I / you / we / they 用 have：I have a new book.', 'he / she / it 用 has：She has a red bag。'], eg: ['I have two pens.', 'He has glasses.'], tip: 'has 只跟第三人称单数，别写 He have。' },
        { t: 'How many + 可数名词复数', lines: ['How many 后接可数名词复数，问数量。', 'There be 句型中，How many 常与 are there 连用。'], eg: ['How many books are there?', 'There are five.'], tip: '不可数名词（water、juice）不能用 how many，要用 how much。' },
        { t: 'would like 表示“想要”', lines: ['would like = \'d like，后接名词或 to do。', '疑问句把 would 提前：What would you like? / Would you like some tea?'], eg: ['I\'d like some bread.', 'Would you like a knife and fork?'], tip: 'I\'d like 后面接名词时常用 some，不用 a。' },
        { t: '名词复数的特殊变化', lines: ['man → men，woman → women，child → children，foot → feet，tooth → teeth。', '这些词不加 s，需要单独记忆。'], eg: ['There are three men in the picture.', 'Two children are playing.'], tip: 'people 本身就是复数，不加 s。' }
      ]
    },
    {
      id: '4b', title: '四年级下册',
      patterns: [
        { en: 'Is this the library?', cn: '这是图书馆吗？', use: '确认地点', eg: ['— Is this the library?', '— Yes, it is. / No, it isn\'t.'], egCn: '——这是图书馆吗？——是的。/不是。' },
        { en: "Where is the teachers' office?", cn: '教师办公室在哪里？', use: '询问地点', eg: ['— Where is the teachers\' office?', '— It\'s on the second floor.'], egCn: '——教师办公室在哪里？——在二楼。' },
        { en: 'What time is it?', cn: '现在几点了？', use: '询问时间', eg: ['— What time is it?', '— It\'s nine o\'clock.'], egCn: '——现在几点了？——九点。' },
        { en: "It's time for English class.", cn: '该上英语课了。', use: '提醒到时间做某事', eg: ['It\'s time for English class.', 'Let\'s go!'], egCn: '该上英语课了。我们走吧！' },
        { en: "What's the weather like in Beijing?", cn: '北京的天气怎么样？', use: '询问天气', eg: ['— What\'s the weather like in Beijing?', '— It\'s sunny and warm.'], egCn: '——北京的天气怎么样？——晴朗温暖。' },
        { en: 'What are these?', cn: '这些是什么？', use: '询问近处的多个物品', eg: ['— What are these?', '— They\'re tomatoes.'], egCn: '——这些是什么？——它们是西红柿。' },
        { en: 'Whose skirt is this?', cn: '这是谁的裙子？', use: '询问物品归属', eg: ['— Whose skirt is this?', '— It\'s mine.'], egCn: '——这是谁的裙子？——是我的。' },
        { en: 'Can I help you?', cn: '您要买什么？', use: '购物时店员询问', eg: ['— Can I help you?', '— Yes, I want a pair of shoes.'], egCn: '——您要买什么？——我想要一双鞋。' }
      ],
      grammars: [
        { t: '时间的表达', lines: ['整点：It\'s nine o\'clock.', '非整点可直接读数字：It\'s nine thirty.', '在几点用介词 at：at six thirty。'], eg: ['It\'s seven o\'clock.', 'I get up at six thirty.'], tip: 'o\'clock 只能用于整点，不能说 nine thirty o\'clock。' },
        { t: "It's time for / to", lines: ['It\'s time for + 名词：It\'s time for lunch.', 'It\'s time to + 动词原形：It\'s time to go to bed.'], eg: ['It\'s time for music class.', 'It\'s time to get up.'], tip: 'for 后面接名词，to 后面接动词，别混用。' },
        { t: '天气句型 It\'s + 形容词', lines: ['描述天气：It\'s sunny / rainy / windy / cloudy / snowy.', '询问天气：What\'s the weather like? 或 How\'s the weather?'], eg: ['It\'s rainy today.', 'What\'s the weather like in Harbin?'], tip: '天气形容词多由名词加 y 变成：wind → windy，cloud → cloudy。' },
        { t: 'these / those 与 this / that', lines: ['this 这个（近处单数），these 这些（近处复数）。', 'that 那个（远处单数），those 那些（远处复数）。', 'these / those 后面的名词用复数，be 动词用 are。'], eg: ['These are my books.', 'Those are cows over there.'], tip: 'these 和 this 指“近”，those 和 that 指“远”。' },
        { t: 'Whose…? 与名词性物主代词', lines: ['Whose + 名词 + is this / are these? 询问归属。', '名词性物主代词：mine、yours、his、hers，后面不再接名词。'], eg: ['Whose coat is this? It\'s hers.', 'These gloves are mine.'], tip: 'my 后面要加名词，mine 后面不加：my book = mine。' },
        { t: 'How much 询问价格', lines: ['How much is it? 问单数物品价格。', 'How much are they? 问复数物品价格。'], eg: ['How much is this scarf?', 'It\'s eighty yuan.'], tip: 'how much 也用于问不可数名词的数量：How much water?。' },
        { t: '介词 in / on / at', lines: ['in 用于月份、年份、季节和较大的地方：in May、in 2020、in China。', 'on 用于具体某一天和星期：on Monday、on May 1st。', 'at 用于具体时刻：at seven o\'clock。'], eg: ['My birthday is in June.', 'We have music on Tuesday.', 'I get up at six.'], tip: '“在几点”用 at，“在星期几”用 on，别混用。' }
      ]
    },
    {
      id: '5a', title: '五年级上册',
      patterns: [
        { en: "What's he like?", cn: '他是什么样的人？', use: '询问性格或外貌', eg: ['— What\'s he like?', '— He\'s kind and hard-working.'], egCn: '——他是什么样的人？——他善良又勤奋。' },
        { en: 'Is she strict?', cn: '她严格吗？', use: '确认某人的特点', eg: ['— Is she strict?', '— Yes, sometimes.'], egCn: '——她严格吗？——是的，有时候。' },
        { en: 'What do you have on Mondays?', cn: '你星期一有什么课？', use: '询问课程安排', eg: ['— What do you have on Mondays?', '— I have Chinese and maths.'], egCn: '——你星期一有什么课？——语文和数学。' },
        { en: 'Do you often read books on the weekend?', cn: '你周末经常看书吗？', use: '询问是否经常做某事', eg: ['— Do you often read books on the weekend?', '— Yes, I do. / No, I don\'t.'], egCn: '——你周末经常看书吗？——是的。/不。' },
        { en: 'What would you like to eat?', cn: '你想吃什么？', use: '询问想吃的食物', eg: ['— What would you like to eat?', '— I\'d like a sandwich, please.'], egCn: '——你想吃什么？——我想要一个三明治。' },
        { en: 'What can you do?', cn: '你会做什么？', use: '询问能力', eg: ['— What can you do?', '— I can sing English songs.'], egCn: '——你会做什么？——我会唱英文歌。' },
        { en: 'There is a big bed.', cn: '有一张大床。', use: '描述某处存在某物', eg: ['There is a big bed in my room.', 'There are some photos on the wall.'], egCn: '我房间里有张大床。墙上有一些照片。' },
        { en: 'Are there any lakes in the park?', cn: '公园里有湖吗？', use: '询问是否存在某物', eg: ['— Are there any lakes in the park?', '— Yes, there are.'], egCn: '——公园里有湖吗？——是的，有。' }
      ],
      grammars: [
        { t: '一般现在时（第三人称单数）', lines: ['表示经常发生的动作或状态。', '主语是 he、she、it 或单数名词时，动词加 s / es：like → likes，watch → watches，study → studies。'], eg: ['She likes music.', 'He goes to school by bus.'], tip: '疑问句和否定句用 does 帮忙，动词回到原形：Does he like music? He doesn\'t like music.' },
        { t: '一般现在时的疑问句和否定句', lines: ['主语是 I / you / we / they 时，疑问句用 Do 开头，否定用 don\'t。', '主语是第三人称单数时，疑问句用 Does，否定用 doesn\'t，动词都用原形。'], eg: ['Do you often play sports? Yes, I do.', 'Does she like music? No, she doesn\'t.'], tip: 'Does 出现后动词回到原形：Does he like…? 不说 Does he likes。' },
        { t: 'There be 句型', lines: ['There is + 单数/不可数名词；There are + 复数名词。', '表示“某处有某物”，be 动词与后面第一个名词保持一致。'], eg: ['There is a clock on the wall.', 'There are two plants near the window.'], tip: '“有”不要用 have：不能说 There have a book。' },
        { t: '可数名词与不可数名词', lines: ['可数名词有单复数：an apple、two apples。', '不可数名词没有复数，不能用 a / an：water、juice、bread、rice。', '不可数名词用 how much 提问数量：How much water?'], eg: ['I\'d like some bread.', 'There is some milk in the glass.'], tip: 'water、juice 不能加 s，也不能说 a water。' },
        { t: '情态动词 can', lines: ['can 表示能力或许可，后面跟动词原形。', '否定 can\'t，疑问句把 can 提前。'], eg: ['I can swim.', 'Can you play the pipa? Yes, I can.'], tip: 'can 后面的动词不加 s、to 或 ing。' },
        { t: '频度副词', lines: ['always 总是 > usually 通常 > often 经常 > sometimes 有时 > never 从不。', '放在实义动词前，be 动词后。'], eg: ['I often play sports.', 'She is always late.'], tip: '位置规律：实义动词前，be 动词后。' },
        { t: '方位介词短语', lines: ['in front of 在……前面；behind 在……后面；between…and… 在……之间；beside 在……旁边。'], eg: ['The ball is in front of the dog.', 'The cat is between the two chairs.'], tip: 'between 后面要接两个对象，用 and 连接。' }
      ]
    },
    {
      id: '5b', title: '五年级下册',
      patterns: [
        { en: 'When do you get up?', cn: '你什么时候起床？', use: '询问做某事的时间', eg: ['— When do you get up?', '— I get up at 6:30.'], egCn: '——你什么时候起床？——六点半。' },
        { en: 'What do you do on the weekend?', cn: '你周末做什么？', use: '询问周末活动', eg: ['— What do you do on the weekend?', '— I often play ping-pong.'], egCn: '——你周末做什么？——我经常打乒乓球。' },
        { en: 'Which season do you like best?', cn: '你最喜欢哪个季节？', use: '询问最喜爱的事物', eg: ['— Which season do you like best?', '— I like autumn best.'], egCn: '——你最喜欢哪个季节？——我最喜欢秋天。' },
        { en: 'Why do you like it?', cn: '你为什么喜欢它？', use: '询问原因', eg: ['— Why do you like it?', '— Because it\'s cool.'], egCn: '——你为什么喜欢它？——因为天气凉爽。' },
        { en: 'When is the art show?', cn: '美术展是什么时候？', use: '询问日期', eg: ['— When is the art show?', '— It\'s on May 1st.'], egCn: '——美术展是什么时候？——在五月一日。' },
        { en: 'Whose dog is it?', cn: '这是谁的狗？', use: '询问归属', eg: ['— Whose dog is it?', '— It\'s mine.'], egCn: '——这是谁的狗？——是我的。' },
        { en: 'Is he drinking water?', cn: '他在喝水吗？', use: '确认正在进行的动作', eg: ['— Is he drinking water?', '— No, he isn\'t. He\'s eating.'], egCn: '——他在喝水吗？——不，他在吃东西。' },
        { en: 'What are you doing?', cn: '你在做什么？', use: '询问正在进行的动作', eg: ['— What are you doing?', '— I\'m reading a book.'], egCn: '——你在做什么？——我在看书。' }
      ],
      grammars: [
        { t: '现在进行时（be + 动词 ing）', lines: ['表示此刻正在发生的动作：am / is / are + doing。', '动词 ing 变化：run → running，make → making，play → playing。'], eg: ['She is reading a book.', 'They are playing football.'], tip: '别漏掉 be 动词：不能说 I reading a book。' },
        { t: '现在进行时的疑问句与否定句', lines: ['疑问句把 be 动词提前：Is she reading? / Are they playing?', '否定句在 be 动词后加 not：She isn\'t reading.'], eg: ['Is he sleeping? No, he isn\'t.', 'They aren\'t watching TV.'], tip: '答语要重复 be 动词：Yes, she is. / No, she isn\'t.' },
        { t: 'When 与 What time 提问时间', lines: ['When 可以问时间点，也可以问日期、时间段。', 'What time 只问具体的几点钟。'], eg: ['When is your birthday? It\'s in May.', 'What time is it? It\'s 7 o\'clock.'], tip: '问“几点”用 What time 更准确。' },
        { t: '序数词与日期表达', lines: ['基数词变序数词：one → first，two → second，three → third，five → fifth。', '日期读作“月份 + the + 序数词”：May 1st = May the first。'], eg: ['It\'s on May 1st.', 'My birthday is on June 3rd.'], tip: '在具体某一天用介词 on，在某月用 in。' },
        { t: 'because 引导原因', lines: ['because 表示“因为”，后面接完整的句子。', 'Why…? 问原因，Because… 回答。'], eg: ['Why do you like summer? Because I can swim.'], tip: 'because 不能和 so 连用在一个句子里。' },
        { t: '一般现在时与现在进行时的区别', lines: ['一般现在时表示经常性、习惯性的动作，常与 often、usually、every day 连用。', '现在进行时表示此刻正在做的动作，常与 now、look、listen 连用。'], eg: ['I often read books.', 'I am reading a book now.'], tip: '有 now、look 时优先用进行时，有 every day 时用一般现在时。' },
        { t: '名词性物主代词', lines: ['mine、yours、his、hers、ours、theirs 后面不接名词。', '形容词性物主代词（my 等）后面必须接名词。'], eg: ['This book is mine.', 'These are their books. = These books are theirs.'], tip: 'hers 不是 her\'s，没有撇号。' }
      ]
    },
    {
      id: '6a', title: '六年级上册',
      patterns: [
        { en: 'Where is the museum?', cn: '博物馆在哪里？', use: '询问地点', eg: ['— Where is the museum?', '— It\'s next to the hospital.'], egCn: '——博物馆在哪里？——在医院旁边。' },
        { en: 'How can I get there?', cn: '我怎么去那里？', use: '问路', eg: ['— How can I get there?', '— Turn left at the bookstore.'], egCn: '——我怎么去那里？——在书店左转。' },
        { en: 'How do you come to school?', cn: '你怎么来学校？', use: '询问交通方式', eg: ['— How do you come to school?', '— I come by bus.'], egCn: '——你怎么来学校？——我坐公交车。' },
        { en: 'What are you going to do this weekend?', cn: '这个周末你打算做什么？', use: '询问计划', eg: ['— What are you going to do this weekend?', '— I\'m going to visit my grandparents.'], egCn: '——这个周末你打算做什么？——我打算去看望祖父母。' },
        { en: 'What are your hobbies?', cn: '你的爱好是什么？', use: '询问爱好', eg: ['— What are your hobbies?', '— I like reading stories.'], egCn: '——你的爱好是什么？——我喜欢读故事。' },
        { en: 'Does he live in Sydney?', cn: '他住在悉尼吗？', use: '确认第三人称单数的信息', eg: ['— Does he live in Sydney?', '— No, he doesn\'t.'], egCn: '——他住在悉尼吗？——不，他不住在悉尼。' },
        { en: 'What does he do?', cn: '他是做什么工作的？', use: '询问职业', eg: ['— What does he do?', '— He\'s a businessman.'], egCn: '——他是做什么工作的？——他是商人。' },
        { en: 'How do you feel now?', cn: '你现在感觉怎么样？', use: '询问感受', eg: ['— How do you feel now?', '— I\'m happy.'], egCn: '——你现在感觉怎么样？——我很开心。' }
      ],
      grammars: [
        { t: 'be going to 表示将来计划', lines: ['be going to + 动词原形，表示打算、计划做某事。', 'be 动词随主语变化：I am / he is / they are going to…'], eg: ['I\'m going to see a film tonight.', 'She is going to take a trip.'], tip: 'going to 后面跟动词原形，不能写成 going to doing。' },
        { t: '第三人称单数的疑问句（does）', lines: ['主语是第三人称单数时，疑问句用 Does 开头，动词用原形。', '否定句用 doesn\'t + 动词原形。'], eg: ['Does he live in Sydney? Yes, he does.', 'He doesn\'t work in a school.'], tip: 'Does 出现后，后面的动词不再加 s。' },
        { t: 'by + 交通工具', lines: ['by bus / by bike / by subway / by train / by plane。', '步行用 on foot，不用 by foot。'], eg: ['I go to school by bike.', 'We go there on foot.'], tip: 'by 后面直接跟交通工具，不加 a 或 the。' },
        { t: '情态动词 must 和 should', lines: ['must 表示“必须”，语气强；should 表示“应该”，是建议。', '两者后面都跟动词原形。'], eg: ['You must pay attention to the traffic lights.', 'You should see a doctor.'], tip: 'must 的否定 mustn\'t 表示“禁止”，不是“不必”。' },
        { t: '形容词和副词', lines: ['形容词修饰名词：a happy girl。', '副词修饰动词，常由形容词加 ly：happy → happily，slow → slowly。'], eg: ['She sings happily.', 'He is a careful boy. He does his homework carefully.'], tip: 'good 的副词是 well，不是 goodly。' },
        { t: 'like + 动词 ing 表示爱好', lines: ['表示爱好时用 like + 动词 ing：I like reading stories.', '动词 ing 变化：read → reading，dance → dancing，run → running。'], eg: ['He likes playing football.', 'Do you like singing? Yes, I do.'], tip: '主语是第三人称单数时用 likes，后面的动词仍然用 ing 形式。' },
        { t: '特殊疑问词小结', lines: ['what 问什么，where 问哪里，who 问谁，when 问什么时候，how 问怎样。', 'how 还能组成 how many（数量）、how much（价格 / 不可数数量）、how old（年龄）。'], eg: ['Where is the post office?', 'How do you go to school?', 'Who is that woman?'], tip: '疑问词后面接一般疑问句语序：Where is he? 不说 Where he is?' }
      ]
    },
    {
      id: '6b', title: '六年级下册',
      patterns: [
        { en: 'How tall are you?', cn: '你有多高？', use: '询问身高', eg: ['— How tall are you?', '— I\'m 1.65 metres.'], egCn: '——你有多高？——我1.65米。' },
        { en: "I'm taller than you.", cn: '我比你高。', use: '比较两个人或物', eg: ['I\'m taller than you.', 'My hair is longer than yours.'], egCn: '我比你高。我的头发比你的长。' },
        { en: 'What did you do last weekend?', cn: '你上周末做了什么？', use: '询问过去发生的事', eg: ['— What did you do last weekend?', '— I stayed at home.'], egCn: '——你上周末做了什么？——我待在家里。' },
        { en: 'Did you do anything else?', cn: '你还做了别的什么吗？', use: '追问过去的事', eg: ['— Did you do anything else?', '— Yes, I cleaned my room.'], egCn: '——你还做了别的什么吗？——是的，我打扫了房间。' },
        { en: 'Where did you go over the winter holiday?', cn: '寒假你去了哪里？', use: '询问去过的地方', eg: ['— Where did you go over the winter holiday?', '— I went to Sanya.'], egCn: '——寒假你去了哪里？——我去了三亚。' },
        { en: 'How did you go there?', cn: '你们怎么去那里的？', use: '询问过去的交通方式', eg: ['— How did you go there?', '— We went there by plane.'], egCn: '——你们怎么去那里的？——我们坐飞机去的。' },
        { en: 'There was no gym before.', cn: '以前没有体育馆。', use: '描述过去存在的事物', eg: ['There was no gym before.', 'There were no computers in my school.'], egCn: '以前没有体育馆。我们学校以前没有电脑。' },
        { en: 'Before, I was quiet.', cn: '以前我很文静。', use: '描述过去与现在的变化', eg: ['Before, I was quiet.', 'Now, I am very active in class.'], egCn: '以前我很文静。现在我在课堂上很活跃。' }
      ],
      grammars: [
        { t: '一般过去时（规则动词）', lines: ['表示过去发生并结束的动作，常与 yesterday、last weekend、ago 连用。', '规则动词加 ed：play → played，clean → cleaned；以 e 结尾加 d：like → liked。'], eg: ['I cleaned my room yesterday.', 'We played football last Sunday.'], tip: '以辅音字母 + y 结尾变 y 为 i 加 ed：study → studied。' },
        { t: '不规则动词的过去式', lines: ['go → went，do → did，have → had，see → saw，eat → ate，take → took，buy → bought。', '不规则动词需要逐个记忆。'], eg: ['I went to Sanya.', 'We took many pictures.'], tip: '常见错误：goed、eated，都是错的。' },
        { t: '过去时的疑问句和否定句', lines: ['疑问句用 Did 开头，动词用原形：Did you go…?', '否定句用 didn\'t + 动词原形：I didn\'t go.'], eg: ['Did you see a film? Yes, I did.', 'I didn\'t stay at home.'], tip: 'Did 出现后动词一定要变回原形。' },
        { t: '一般过去时的时间状语', lines: ['常与 yesterday、last weekend、last year、two days ago、in 2020 连用。', '句中出现这些时间标志时，动词要用过去式。'], eg: ['I went to Beijing last summer.', 'She cleaned her room two days ago.'], tip: 'last weekend 表示过去，句子不能用一般现在时。' },
        { t: '形容词比较级', lines: ['比较两者用比较级 + than：taller than、longer than。', '单音节词加 er：tall → taller；以 e 结尾加 r：nice → nicer；重读闭音节双写末尾字母：big → bigger。', '多音节词前加 more：more beautiful。'], eg: ['I\'m taller than you.', 'This book is more interesting than that one.'], tip: 'good / well 的比较级是 better，bad 的是 worse。' },
        { t: '形容词最高级', lines: ['三者或以上比较用最高级，前面一般加 the：the tallest、the biggest。', '单音节词加 est；多音节词前加 most：the most beautiful。'], eg: ['He is the tallest in our class.', 'This is the most interesting book.'], tip: '最高级前一般要加 the；good / well 的最高级是 best。' },
        { t: 'There was / There were', lines: ['过去某处有某物，用 There was（单数）/ There were（复数）。', '否定用 There was no… / There weren\'t any…。'], eg: ['There was a small river here before.', 'There were no tall buildings.'], tip: '现在的“有”用 is / are，过去的“有”用 was / were。' }
      ]
    }
  ]
};
