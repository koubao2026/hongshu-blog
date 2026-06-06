#!/usr/bin/env node
// 构建后生成 feed.xml 静态文件
const fs = require('fs');
const path = require('path');

// 读取 sample-data.json 来生成 feed
const dataPath = path.join(__dirname, '..', 'src', 'data', 'sample-data.json');
const outputPath = path.join(__dirname, '..', 'out', 'feed.xml');

if (!fs.existsSync(dataPath)) {
  console.log('No sample-data.json found, skipping feed.xml generation');
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const articles = data.articles || [];

const items = articles
  .map(
    (a) => `    <entry>
      <title>${a.title}</title>
      <link href="https://hongshubgedu.com/blog/${a.slug}" />
      <id>https://hongshubgedu.com/blog/${a.slug}</id>
      <updated>${a.published_at || new Date().toISOString()}</updated>
      <summary>${a.excerpt}</summary>
    </entry>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>红薯品桌游</title>
  <link href="https://hongshubgedu.com" />
  <id>https://hongshubgedu.com</id>
  <updated>${new Date().toISOString()}</updated>
  <description>12年桌游教育经验，分享桌游评测、教育方法论与AI素养课程</description>
${items}
</feed>`;

// 确保 out 目录存在
if (!fs.existsSync(path.join(__dirname, '..', 'out'))) {
  console.log('out/ directory not found, skipping feed.xml generation');
  process.exit(0);
}

fs.writeFileSync(outputPath, xml, 'utf-8');
console.log('feed.xml generated successfully');
