const { remark } = require('remark');
const html = require('remark-html');

const content = `
\`\`\`bash
cp -Rf ~/.claude/skills/gstack .claude/skills/gstack && \\
  rm -rf .claude/skills/gstack/.git && \\
  cd .claude/skills/gstack && ./setup
\`\`\`
`;

async function test() {
  const processed = await remark()
    .use(html, { sanitize: false })
    .process(content);
  console.log('--- OUTPUT ---');
  console.log(processed.toString());
  console.log('--------------');
}

test();
