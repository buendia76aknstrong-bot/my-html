import jsPDF from 'jspdf';
import { CHAPTER_TEMPLATES } from '@/prompts/interview-questions';

const DISCLAIMER_TEXT =
  '本書はご本人の語りをもとにAIが編集した記録です。\nプライバシー保護のため、一部表現を調整しています。';

interface PdfOptions {
  authorName: string;
  title?: string;
  chapters: { number: number; content: string }[];
}

// Character metrics for vertical text layout
const CHAR_WIDTH = 14;
const LINE_HEIGHT = 16;
const PAGE_TOP_MARGIN = 30;
const PAGE_BOTTOM_MARGIN = 30;
const PAGE_LEFT_MARGIN = 30;
const PAGE_RIGHT_MARGIN = 30;

function isFullWidthChar(char: string): boolean {
  const code = char.charCodeAt(0);
  return (
    (code >= 0x3000 && code <= 0x9fff) ||
    (code >= 0xf900 && code <= 0xfaff) ||
    (code >= 0xff00 && code <= 0xffef)
  );
}

function splitTextIntoLines(text: string, maxCharsPerLine: number): string[] {
  const lines: string[] = [];
  const paragraphs = text.split('\n');

  for (const paragraph of paragraphs) {
    if (paragraph.trim() === '') {
      lines.push('');
      continue;
    }

    let currentLine = '';
    let currentLen = 0;

    for (const char of paragraph) {
      const charLen = isFullWidthChar(char) ? 1 : 0.5;
      if (currentLen + charLen > maxCharsPerLine) {
        lines.push(currentLine);
        currentLine = char;
        currentLen = charLen;
      } else {
        currentLine += char;
        currentLen += charLen;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
  }

  return lines;
}

export async function generatePdf(options: PdfOptions): Promise<Buffer> {
  const { authorName, chapters } = options;
  const title = options.title || `${authorName}の自分史`;

  // A4: 210mm x 297mm - We use horizontal (landscape) for vertical text simulation
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const contentWidth = pageWidth - PAGE_LEFT_MARGIN - PAGE_RIGHT_MARGIN;
  const contentHeight = pageHeight - PAGE_TOP_MARGIN - PAGE_BOTTOM_MARGIN;
  const maxCharsPerColumn = Math.floor(contentHeight / CHAR_WIDTH);
  const maxColumnsPerPage = Math.floor(contentWidth / LINE_HEIGHT);

  // --- Cover Page ---
  doc.setFontSize(28);
  doc.text(title, pageWidth / 2, pageHeight / 2 - 30, { align: 'center' });

  doc.setFontSize(16);
  doc.text(authorName, pageWidth / 2, pageHeight / 2 + 10, { align: 'center' });

  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  doc.setFontSize(12);
  doc.text(dateStr, pageWidth / 2, pageHeight / 2 + 30, { align: 'center' });

  // --- Table of Contents ---
  doc.addPage();
  doc.setFontSize(20);
  doc.text('目次', pageWidth / 2, 40, { align: 'center' });

  doc.setFontSize(14);
  const tocChapters = chapters.map((ch) => {
    const template = CHAPTER_TEMPLATES.find((t) => t.number === ch.number);
    return template
      ? `第${template.number}章　${template.title}`
      : `第${ch.number}章`;
  });

  tocChapters.forEach((line, index) => {
    doc.text(line, 40, 70 + index * 15);
  });

  // --- Chapter Pages ---
  // For MVP, we render horizontal text (true vertical Japanese text requires
  // advanced font metrics not available in jsPDF). The content is formatted
  // in a clean, readable layout.
  for (const chapter of chapters) {
    const template = CHAPTER_TEMPLATES.find((t) => t.number === chapter.number);
    const chapterTitle = template
      ? `第${template.number}章　${template.title}`
      : `第${chapter.number}章`;

    doc.addPage();

    // Chapter title
    doc.setFontSize(18);
    doc.text(chapterTitle, pageWidth / 2, 35, { align: 'center' });

    // Chapter body
    doc.setFontSize(11);
    const bodyLines = splitTextIntoLines(chapter.content, 40);

    let y = 55;
    const lineSpacing = 7;
    const maxY = pageHeight - PAGE_BOTTOM_MARGIN;

    for (const line of bodyLines) {
      if (y + lineSpacing > maxY) {
        doc.addPage();
        y = PAGE_TOP_MARGIN;
      }

      if (line === '') {
        y += lineSpacing * 0.5;
      } else {
        doc.text(line, PAGE_LEFT_MARGIN, y);
        y += lineSpacing;
      }
    }
  }

  // --- Disclaimer Page ---
  doc.addPage();
  doc.setFontSize(10);
  const disclaimerLines = DISCLAIMER_TEXT.split('\n');
  disclaimerLines.forEach((line, index) => {
    doc.text(line, pageWidth / 2, pageHeight - 50 + index * 8, {
      align: 'center',
    });
  });

  // Return as buffer
  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}
