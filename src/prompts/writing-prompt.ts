import { CHAPTER_TEMPLATES } from './interview-questions';

export function buildWritingPrompt(
  chapterNumber: number,
  transcriptionTexts: string[]
): string {
  const chapter = CHAPTER_TEMPLATES.find((c) => c.number === chapterNumber);
  if (!chapter) {
    throw new Error(`Invalid chapter number: ${chapterNumber}`);
  }

  const transcriptionBlock = transcriptionTexts
    .map((text, i) => `--- インタビュー ${i + 1} ---\n${text}`)
    .join('\n\n');

  return `あなたは「やさしい聞き書きの専門家」です。
以下のインタビュー文字起こしデータを元に、自分史の「第${chapter.number}章: ${chapter.title}（${chapter.description}）」を執筆してください。

【執筆ルール】
1. 文体: 敬体（です・ます調）で、温かく語りかけるような「聞き書き調」
2. 視点: 一人称（「私は」）で書く
3. 実名: 第三者の実名は使わない（「友人」「上司」「恩師」等で表現）
4. 断定: 他者への否定的断定は避ける（主観表現に変換）
5. 構成: 時系列を基本とし、印象的なエピソードを中心に
6. 分量: 1章あたり1,500〜2,000字程度
7. 感情: 語り手の感情を大切にし、補完はしても捏造しない
8. 事実不明: 不明確な事実は「〜だったように記憶しています」等の表現で

【入力データ】
${transcriptionBlock}

【出力形式】
以下の形式で出力してください:

## 第${chapter.number}章 ${chapter.title}

（本文をここに書いてください）`;
}
