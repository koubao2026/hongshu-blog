-- 博客网站 Supabase 建表脚本
-- 在 ai-boardgame-course 项目的 SQL Editor 中执行

-- ============================
-- 1. 分类表
-- ============================
CREATE TABLE IF NOT EXISTS blog_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================
-- 2. 标签表
-- ============================
CREATE TABLE IF NOT EXISTS blog_tags (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================
-- 3. 文章表
-- ============================
CREATE TABLE IF NOT EXISTS blog_articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL DEFAULT '',
  category_id INTEGER NOT NULL REFERENCES blog_categories(id),
  published BOOLEAN NOT NULL DEFAULT FALSE,
  reading_time INTEGER NOT NULL DEFAULT 5,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================
-- 4. 文章-标签关联表
-- ============================
CREATE TABLE IF NOT EXISTS blog_article_tags (
  article_id INTEGER NOT NULL REFERENCES blog_articles(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- ============================
-- 5. 桌游表
-- ============================
CREATE TABLE IF NOT EXISTS blog_games (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  cover_image TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  rules TEXT NOT NULL DEFAULT '',
  usage_guide TEXT NOT NULL DEFAULT '',
  min_players INTEGER NOT NULL DEFAULT 2,
  max_players INTEGER NOT NULL DEFAULT 6,
  min_age INTEGER NOT NULL DEFAULT 6,
  play_time INTEGER NOT NULL DEFAULT 30,
  game_types TEXT[] NOT NULL DEFAULT '{}',
  highlight TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================
-- 6. 关键词表（弹幕墙）
-- ============================
CREATE TABLE IF NOT EXISTS blog_keywords (
  id SERIAL PRIMARY KEY,
  word TEXT NOT NULL,
  weight INTEGER NOT NULL DEFAULT 1,
  link_url TEXT NOT NULL DEFAULT '',
  link_type TEXT NOT NULL DEFAULT 'article'
);

-- ============================
-- RLS 策略：公开读取
-- ============================
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_keywords ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog categories are publicly readable" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "Blog tags are publicly readable" ON blog_tags FOR SELECT USING (true);
CREATE POLICY "Blog articles are publicly readable" ON blog_articles FOR SELECT USING (true);
CREATE POLICY "Blog article tags are publicly readable" ON blog_article_tags FOR SELECT USING (true);
CREATE POLICY "Blog games are publicly readable" ON blog_games FOR SELECT USING (true);
CREATE POLICY "Blog keywords are publicly readable" ON blog_keywords FOR SELECT USING (true);

-- ============================
-- 初始数据：分类
-- ============================
INSERT INTO blog_categories (id, name, slug, description) VALUES
  (1, '教学思考', 'teaching', '桌游教育方法论与实践反思'),
  (2, '使用指南', 'guide', '桌游教育场景使用建议'),
  (3, '秒评', 'review', '快速桌游评测与推荐'),
  (4, '课程设计', 'course', '玩AI课程与桌游设计课')
ON CONFLICT (id) DO NOTHING;

-- ============================
-- 初始数据：标签
-- ============================
INSERT INTO blog_tags (id, name, slug) VALUES
  (1, '策略思维', 'strategy'),
  (2, '合作桌游', 'cooperative'),
  (3, '空间推理', 'spatial'),
  (4, '亲子桌游', 'family'),
  (5, '逻辑训练', 'logic'),
  (6, '创意表达', 'creativity'),
  (7, '5-8岁', 'age-5-8'),
  (8, '8-12岁', 'age-8-12'),
  (9, '12岁+', 'age-12-plus'),
  (10, '2人游戏', '2-players'),
  (11, '3-5人', '3-5-players'),
  (12, '6人+', '6-plus-players')
ON CONFLICT (id) DO NOTHING;

-- ============================
-- 初始数据：关键词
-- ============================
INSERT INTO blog_keywords (id, word, weight, link_url, link_type) VALUES
  (1, '桌游教育', 5, '/blog', 'page'),
  (2, '策略思维', 4, '/blog?tag=strategy', 'tag'),
  (3, '逻辑训练', 4, '/blog?tag=logic', 'tag'),
  (4, '亲子桌游', 3, '/blog?tag=family', 'tag'),
  (5, '卡坦岛', 3, '/games/catan', 'game'),
  (6, '璀璨宝石', 3, '/games/splendor', 'game'),
  (7, '骆驼大赛', 2, '/games/camel-up', 'game'),
  (8, '玩AI课程', 5, '/blog?category=course', 'category'),
  (9, '5-8岁', 2, '/blog?tag=age-5-8', 'tag'),
  (10, '8-12岁', 2, '/blog?tag=age-8-12', 'tag'),
  (11, '合作桌游', 3, '/blog?tag=cooperative', 'tag'),
  (12, '规则讲解', 3, '/games', 'page'),
  (13, 'AI素养', 4, '/blog?category=course', 'category'),
  (14, '空间推理', 3, '/blog?tag=spatial', 'tag'),
  (15, '教学反思', 2, '/blog?category=teaching', 'category'),
  (16, '创意表达', 2, '/blog?tag=creativity', 'tag'),
  (17, '家庭游戏', 3, '/blog?tag=family', 'tag'),
  (18, '6人+', 2, '/blog?tag=6-plus-players', 'tag'),
  (19, '12岁+', 2, '/blog?tag=age-12-plus', 'tag'),
  (20, '2人游戏', 2, '/blog?tag=2-players', 'tag')
ON CONFLICT (id) DO NOTHING;

-- ============================
-- 初始数据：文章
-- ============================
INSERT INTO blog_articles (id, title, slug, excerpt, content, cover_image, category_id, published, reading_time, published_at) VALUES
  (1, '为什么桌游是孩子最好的逻辑训练场？', 'why-board-games-logic-training',
   '很多家长问我，怎么培养孩子的逻辑思维？我的答案从来不是刷题，而是——让他们玩桌游。',
   '很多家长问我，怎么培养孩子的逻辑思维？我的答案从来不是刷题，而是——让他们玩桌游。\n\n在一局《璀璨宝石》里，孩子要做多少次因果判断？资源管理、优先级排序、条件推理……这些能力不是靠背诵获得的。\n\n我教了12年桌游课，见过太多孩子从"不知道怎么选"到"我有三个方案，我选第二个"。这个转变，不是因为他们变聪明了，而是因为桌游给了他们一个安全的决策训练场。\n\n## 桌游中的逻辑训练有多自然？\n\n策略桌游的核心就是**因果关系**：如果我拿这张牌，对手就能拿那张；如果我存资源，这一轮就没产出。孩子不需要知道什么叫"因果推理"，他们在游戏中反复经历，自然就内化了。\n\n## 三个实用的家庭玩法建议\n\n1. **复盘时问"为什么"**：每局结束，别急着收。问孩子"你那一步为什么这么选？"——这就是在训练论证构建。\n2. **允许犯错**：桌游的好处是犯错成本低。让孩子体验"选错了"的后果，比说教一百遍"你要想清楚"有用。\n3. **换位思考**：玩完后让孩子站在对手角度分析——这是最自然的批判性思维训练。',
   '/images/articles/logic-training.jpg', 1, true, 5, NOW() - INTERVAL '3 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO blog_articles (id, title, slug, excerpt, content, cover_image, category_id, published, reading_time, published_at) VALUES
  (2, '《卡坦岛》教学指南：从第一次交易到策略觉醒', 'catan-teaching-guide',
   '卡坦岛是很多孩子的"策略启蒙桌游"。但教的时候有个坑——别急着讲规则，先让他们自己发现交易的力量。',
   '卡坦岛是很多孩子的"策略启蒙桌游"。但教的时候有个坑——别急着讲规则，先让他们自己发现交易的力量。\n\n这篇文章分享我带了超过200场卡坦岛之后总结的教学节奏。\n\n## 第一步：先玩半局"简化版"\n\n去掉发展卡，只保留基础资源交易和建路建房。让孩子先感受到"我需要羊毛但你不需要砖"的交换动力。\n\n## 第二步：引入交易谈判\n\n当孩子开始主动说"我用两个羊毛换你一个砖"的时候，你的策略课就开始了。\n\n## 第三步：加入发展卡\n\n当基础循环跑通后，发展卡自然引入了"信息不对称"——你不知道对手手里有什么牌。',
   '/images/articles/catan-guide.jpg', 2, true, 6, NOW() - INTERVAL '2 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO blog_articles (id, title, slug, excerpt, content, cover_image, category_id, published, reading_time, published_at) VALUES
  (3, '秒评《骆驼大赛》：骰子带来的爆笑概率课', 'camel-up-review',
   '如果你想在笑声中让孩子理解概率和期望值，没有比骆驼大赛更好的选择。',
   '如果你想在笑声中让孩子理解概率和期望值，没有比骆驼大赛更好的选择。\n\n## 为什么骆驼大赛是概率入门神器？\n\n每次骰子掷出，骆驼前进的步数是随机的，但叠加在别的骆驼上面时，概率就变了。孩子不需要计算，他们会"感觉"到谁更有可能赢。\n\n## 三个教学切入点\n\n1. **下注时机**：什么时候下注最划算？这就是期望值。\n2. **概率直觉**：让孩子猜哪头骆驼会赢，然后验证。\n3. **风险与收益**：早早下注收益大但风险高，晚下注稳但赚得少。',
   '/images/articles/camel-up-review.jpg', 3, true, 4, NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;

INSERT INTO blog_articles (id, title, slug, excerpt, content, cover_image, category_id, published, reading_time, published_at) VALUES
  (4, '玩AI课程介绍：用桌游教会孩子与AI协作', 'play-ai-course-intro',
   '我们的"玩AI"课程不是编程课，而是用桌游场景让孩子理解AI的边界与可能。',
   '我们的"玩AI"课程不是编程课，而是用桌游场景让孩子理解AI的边界与可能。\n\n## 课程理念\n\nAI时代最重要的不是编程能力，而是**提问能力**和**判断能力**。桌游天然是训练这两项能力的最佳载体。\n\n## 5天集训安排\n\n- Day 1：什么是AI？用桌游理解"规则"与"判断"\n- Day 2：AI能做什么？玩"AI模仿人类"游戏\n- Day 3：AI不能做什么？边界与伦理讨论\n- Day 4：人机协作挑战赛\n- Day 5：设计你的AI桌游',
   '/images/articles/play-ai-course.jpg', 4, true, 7, NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================
-- 初始数据：文章-标签关联
-- ============================
INSERT INTO blog_article_tags (article_id, tag_id) VALUES
  (1, 5), (1, 4), (1, 7),
  (2, 1), (2, 11), (2, 8),
  (3, 1), (3, 2), (3, 11), (3, 8),
  (4, 6), (4, 5), (4, 8)
ON CONFLICT DO NOTHING;

-- ============================
-- 初始数据：桌游
-- ============================
INSERT INTO blog_games (id, name, slug, cover_image, description, rules, usage_guide, min_players, max_players, min_age, play_time, game_types, highlight) VALUES
  (1, '卡坦岛', 'catan', '/images/games/catan.jpg',
   '经典的资源管理与交易策略桌游，在随机生成的岛屿上建立定居点。',
   '1. 掷骰子生产资源\n2. 自由交易资源\n3. 建造道路、定居点或城市\n4. 最先获得10分者获胜',
   '教学节奏：先玩简化版（去掉发展卡），再逐步加入交易谈判和发展卡。',
   3, 4, 10, 60, ARRAY['策略', '交易', '资源管理'], '资源交易教学的最佳入门桌游'),
  (2, '璀璨宝石', 'splendor', '/images/games/splendor.jpg',
   '文艺复兴时期的宝石商人，通过精明的资源管理获取声望。',
   '1. 收集宝石筹码或购买矿脉卡\n2. 用宝石购买发展卡获得永久折扣\n3. 吸引贵族访问获得额外声望\n4. 最先获得15分者获胜',
   '低门槛高策略，适合逻辑思维训练初阶。复盘时引导孩子分析购买优先级。',
   2, 4, 10, 30, ARRAY['策略', '资源管理', '引擎构建'], '因果推理的最佳训练场'),
  (3, '骆驼大赛', 'camel-up', '/images/games/camel-up.jpg',
   '疯狂的赛骆驼下注游戏，骰子决定骆驼命运，叠骰带来意想不到的反转。',
   '1. 掷骰子移动骆驼\n2. 在回合中下注你预测的冠军\n3. 骆驼可以叠在其他骆驼上一起跑\n4. 赌对名次获得最多金币者获胜',
   '概率直觉训练神器。让孩子在笑声中理解期望值和风险评估。',
   3, 8, 8, 30, ARRAY['概率', '下注', '派对'], '笑声中的概率启蒙课')
ON CONFLICT (id) DO NOTHING;

-- ============================
-- 更新序列值
-- ============================
SELECT setval('blog_categories_id_seq', (SELECT MAX(id) FROM blog_categories));
SELECT setval('blog_tags_id_seq', (SELECT MAX(id) FROM blog_tags));
SELECT setval('blog_articles_id_seq', (SELECT MAX(id) FROM blog_articles));
SELECT setval('blog_games_id_seq', (SELECT MAX(id) FROM blog_games));
SELECT setval('blog_keywords_id_seq', (SELECT MAX(id) FROM blog_keywords));
