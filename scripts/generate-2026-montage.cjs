#!/usr/bin/env node
/**
 * Auto-generates src/app/data/2026/montage.ts from public/img/2026/
 * Includes image dimensions, aspect ratios, videos, GIFs, and interspersed tactile birthday note cards.
 */

const fs = require('fs');
const path = require('path');
const { imageSize } = require('image-size');

const ROOT = process.cwd();
const DIR_2026 = path.join(ROOT, 'public', 'img', '2026');
const OUT_FILE = path.join(ROOT, 'src', 'app', 'data', '2026', 'montage.ts');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function parseDateFromFilename(name) {
  // Matches e.g. IMG_20260903_212732 or MVIMG_20260926_200614 or 20261025_140101
  const m = name.match(/2026(\d{2})(\d{2})_(\d{2})(\d{2})/);
  if (m) {
    const month = m[1];
    const day = m[2];
    const hour = m[3];
    const min = m[4];
    return {
      date: `${day}.${month}.2026`,
      time: `${hour}:${min}`,
      sortKey: `2026-${month}-${day}-${hour}-${min}`
    };
  }
  const mDateOnly = name.match(/2026(\d{2})(\d{2})/);
  if (mDateOnly) {
    return {
      date: `${mDateOnly[2]}.${mDateOnly[1]}.2026`,
      time: '12:00',
      sortKey: `2026-${mDateOnly[1]}-${mDateOnly[2]}-12-00`
    };
  }
  return {
    date: '25.10.2026',
    time: 'Mùa thu 2026',
    sortKey: '2026-10-25-00-00'
  };
}

const PHOTO_TITLES = [
  'Nắng thu dịu dàng',
  'Nụ cười trong trẻo',
  'Góc phố chiều êm',
  'Chút hương ngọt ngào',
  'Khoảnh khắc bình yên',
  'Ánh mắt rạng ngời',
  'Bầu trời tuổi mới',
  'Tách trà ấm áp',
  'Dáng hình thân thương',
  'Khúc ca mùa thu',
  'Nét cười tỏa nắng',
  'Mùa hoa dịu mát',
  'Những ngày thảnh thơi',
  'Kỷ niệm tinh khôi',
  'Chút thương mến',
  'Dạo bước ngày thu',
  'Góc nhỏ an yên',
  'Nắng vàng rực rỡ',
  'Khoảnh khắc ngọt ngào',
  'Những ngày an vui'
];

const PHOTO_CAPTIONS = [
  'Nụ cười trong veo giữa những ngày thu dịu dàng.',
  'Chút bình yên đọng lại sau những giờ phút bận rộn.',
  'Ánh mắt lấp lánh như gom cả bầu trời mùa thu.',
  'Khoảnh khắc nhỏ xinh nhưng đầy ắp niềm vui.',
  'Mong cậu luôn giữ được nét rạng ngời này nhé.',
  'Một ngày nắng đẹp và một người con gái thật đáng yêu.',
  'Từng khoảnh khắc trôi qua đều là những trang kỷ niệm đẹp.',
  'Dịu dàng như cơn gió đầu thu ghé qua ô cửa sổ.',
  'Cứ tự do, tự tại và mỉm cười thật tươi mỗi ngày.',
  'Kỷ niệm ngọt ngào được lưu giữ lại mãi cùng thời gian.'
];

const VIDEO_TITLES = [
  'Thước phim kỷ niệm',
  'Khoảnh khắc chuyển động',
  'Góc nhìn cuộc sống',
  'Giai điệu nụ cười'
];

const VIDEO_CAPTIONS = [
  'Một thước phim chuyển động ngập tràn niềm vui và tiếng cười của Pinkie.',
  'Chuyển động sống động ghi dấu những nụ cười rạng rỡ nhất.',
  'Từng khung hình chân thực lưu giữ khoảnh khắc đáng nhớ.',
  'Âm thanh và tiếng cười rộn rã của những ngày đẹp nhất.'
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function cleanTitle(name) {
  const ext = path.extname(name).toLowerCase();
  const h = hashString(name);
  if (ext === '.mp4') {
    return VIDEO_TITLES[h % VIDEO_TITLES.length];
  }
  return PHOTO_TITLES[h % PHOTO_TITLES.length];
}

function cleanCaption(name) {
  const ext = path.extname(name).toLowerCase();
  const h = hashString(name);
  if (ext === '.mp4') {
    return VIDEO_CAPTIONS[h % VIDEO_CAPTIONS.length];
  }
  return PHOTO_CAPTIONS[h % PHOTO_CAPTIONS.length];
}

function getAspectRatioCategory(width, height) {
  if (!width || !height) return 'portrait';
  const ratio = width / height;
  if (ratio > 1.35) return 'landscape';
  if (ratio < 0.75) return 'tall';
  if (ratio < 0.9) return 'portrait';
  if (ratio > 1.08) return 'wide';
  return 'square';
}

function main() {
  if (!fs.existsSync(DIR_2026)) {
    console.error('Directory does not exist:', DIR_2026);
    process.exit(1);
  }

  const files = fs.readdirSync(DIR_2026).filter(f => !f.startsWith('.') && !f.toLowerCase().includes('kuriyama-mirai'));
  const mediaList = [];

  for (const filename of files) {
    const ext = path.extname(filename).toLowerCase();
    const filePath = path.join(DIR_2026, filename);
    const dateInfo = parseDateFromFilename(filename);
    const title = cleanTitle(filename);

    const VIDEO_POSTERS = {
      '51d91429-1f49-4d4f-9d48-11eb2f146228_20261025_140240_707.mp4': '/img/2026/9c976d34-daf5-484c-9569-bdd29ca2b062_20261025_140240_707.jpg',
      'd606b6ff-3bf9-4c65-ac1d-9fe0a8a8fad4_20261025_140234_video.mp4': '/img/2026/2445e916-a850-42f2-954d-2ffb5b9620b1_20261025_140216_812_IMG_0017_20261025_140214_3600.JPG',
      'VID_20261007_223012.mp4': '/img/2026/IMG_20261007_230419.jpg',
      'VID_20261007_230339.mp4': '/img/2026/IMG_20261007_230411.jpg'
    };

    if (ext === '.mp4') {
      const isLandscape = filename.startsWith('51d91429');
      const isFeatured = filename.includes('VID_20261007_223012');
      const aspect = isLandscape ? 'landscape' : 'tall';
      const poster = VIDEO_POSTERS[filename] || '';

      mediaList.push({
        id: `media-${path.parse(filename).name}`,
        type: 'video',
        src: `/img/2026/${filename}`,
        poster,
        thumb: poster ? `/img/2026/thumbs/${path.parse(path.basename(poster)).name}.webp` : '',
        title,
        alt: `Video kỷ niệm 2026: ${title}`,
        caption: '',
        date: dateInfo.date,
        time: dateInfo.time,
        sortKey: dateInfo.sortKey,
        aspectRatio: aspect,
        span: isLandscape ? 'wide' : (isFeatured ? 'wide' : 'normal'),
        width: isLandscape ? 1080 : 1080,
        height: isLandscape ? 720 : 1920
      });
    } else if (ext === '.gif') {
      let w = 400;
      let h = 300;
      try {
        const buf = fs.readFileSync(filePath);
        const dim = imageSize(buf);
        w = dim.width;
        h = dim.height;
      } catch (e) {}

      mediaList.push({
        id: `media-${path.parse(filename).name}`,
        type: 'gif',
        src: `/img/2026/${filename}`,
        title,
        alt: `Ảnh động GIF: ${title}`,
        caption: '',
        date: dateInfo.date,
        time: dateInfo.time,
        sortKey: dateInfo.sortKey,
        aspectRatio: getAspectRatioCategory(w, h),
        span: 'normal',
        width: w,
        height: h
      });
    } else if (IMAGE_EXTS.has(ext)) {
      let w = 800;
      let h = 1000;
      try {
        const buf = fs.readFileSync(filePath);
        const dim = imageSize(buf);
        w = dim.width;
        h = dim.height;
        if ([5, 6, 7, 8].includes(dim.orientation)) {
          w = dim.height;
          h = dim.width;
        }
      } catch (e) {}

      const aspect = getAspectRatioCategory(w, h);
      const thumbFile = `${path.parse(filename).name}.webp`;
      const hasThumb = fs.existsSync(path.join(DIR_2026, 'thumbs', thumbFile));
      mediaList.push({
        id: `media-${path.parse(filename).name}`,
        type: 'image',
        src: `/img/2026/${filename}`,
        thumb: hasThumb ? `/img/2026/thumbs/${thumbFile}` : `/img/2026/${filename}`,
        title,
        alt: `Ảnh kỷ niệm 2026: ${title}`,
        caption: '',
        date: dateInfo.date,
        time: dateInfo.time,
        sortKey: dateInfo.sortKey,
        aspectRatio: aspect,
        span: aspect === 'landscape' ? 'wide' : (aspect === 'tall' ? 'tall' : 'normal'),
        width: w,
        height: h
      });
    }
  }

  // Sort chronologically by sortKey then filename
  mediaList.sort((a, b) => a.sortKey.localeCompare(b.sortKey) || a.src.localeCompare(b.src));

  // Define interspersed tactile birthday note cards (User custom letters)
  const noteCards = [
    {
      id: 'note-prologue',
      type: 'note',
      tag: 'CHƯƠNG 2026',
      title: '',
      content: 'Người ta yêu mùa thu vì nó cho phép trái tim được chậm lại một nhịp, để nhớ về một ánh nhìn, một cái ôm siết chặt giữa chiều lộng gió, và để biết rằng, có những người sinh ra là để sưởi ấm cho nhau qua những mùa heo may.',
      author: 'Gửi người đặc biệt',
      stamp: '24th AUTUMN',
      colorScheme: 'champagne',
      span: 'wide'
    },
    {
      id: 'note-wish-1',
      type: 'note',
      tag: 'LỜI CHÚC TỪ TRÁI TIM',
      title: 'Happy birthday',
      content: '“Chúc cậu tuổi mới luôn gặp gỡ những điều dịu dàng, ăn món mình thích, đi nơi mình mơ, và luôn được yêu thương thật nhiều.”',
      author: 'Happy Birthday',
      stamp: 'PINKIE ✨',
      colorScheme: 'rose',
      span: 'normal'
    },
    {
      id: 'note-memory-mid',
      type: 'note',
      tag: 'KHOẢNH KHẮC',
      title: 'Thương nhớ mười hai',
      content: '“... Thu đến đem theo những trận gió heo may lành lạnh, làm cho người ta thèm một cái ôm che chở, thèm được cùng người tình trăm năm ngồi bên một mâm cơm nóng, nhìn ra ngoài trời sương khói mông lung.',
      author: 'Memories & Film',
      stamp: 'KEEP SHINING',
      colorScheme: 'blush',
      span: 'tall'
    },
    {
      id: 'note-cine-quote',
      type: 'note',
      tag: 'GIAI ĐIỆU',
      title: 'Thư tình cuối mùa thu',
      content: 'Tình ta như hàng cây \nĐã qua mùa gió bão \nTình ta như dòng sông \nĐã yên ngày thác lũ \n...\nChỉ còn anh và em \nCùng tình yêu ở lại... \n- Kìa bao người yêu mới \nĐi qua cùng heo may',
      author: 'Dành tặng Pinkie',
      stamp: 'LOVE & LIGHT',
      colorScheme: 'champagne',
      span: 'wide'
    },
    {
      id: 'note-wish-epilogue',
      type: 'note',
      tag: 'HẸN ƯỚC',
      title: '',
      content: '“Dù ngoài kia thế giới có xoay vần thế nào, mong cậu luôn tìm thấy một góc bình yên trong tâm hồn và luôn là phép màu nhỏ của mình.”',
      author: 'With all my heart',
      stamp: 'FOREVER 24',
      colorScheme: 'rose',
      span: 'normal'
    }
  ];

  // Intertwine notes into the media list at balanced intervals
  const finalMontage = [];
  const interval = Math.floor(mediaList.length / (noteCards.length + 1));

  let noteIdx = 0;
  for (let i = 0; i < mediaList.length; i++) {
    if (noteIdx < noteCards.length && i > 0 && i % interval === 0) {
      finalMontage.push(noteCards[noteIdx]);
      noteIdx++;
    }
    finalMontage.push(mediaList[i]);
  }
  while (noteIdx < noteCards.length) {
    finalMontage.push(noteCards[noteIdx]);
    noteIdx++;
  }

  // Generate TypeScript code
  const code = `// AUTO-GENERATED by scripts/generate-2026-montage.cjs - do not edit directly
export type MediaType = 'image' | 'video' | 'gif';
export type AspectRatio = 'portrait' | 'landscape' | 'square' | 'wide' | 'tall';
export type BentoSpan = 'normal' | 'wide' | 'tall' | 'featured';

export interface BaseMediaItem {
  id: string;
  type: MediaType;
  src: string;
  thumb?: string;
  poster?: string;
  title: string;
  alt: string;
  caption?: string;
  date: string;
  time?: string;
  sortKey: string;
  aspectRatio: AspectRatio;
  span?: BentoSpan;
  width?: number;
  height?: number;
}

export interface NoteCardItem {
  id: string;
  type: 'note';
  tag: string;
  title: string;
  content: string;
  author: string;
  stamp: string;
  colorScheme: 'rose' | 'champagne' | 'blush' | 'ink';
  span?: BentoSpan;
}

export type MontageItem = BaseMediaItem | NoteCardItem;

export const MONTAGE_ITEMS_2026: MontageItem[] = ${JSON.stringify(finalMontage, null, 2)};

export const MONTAGE_STATS_2026 = {
  totalItems: ${finalMontage.length},
  totalPhotos: ${mediaList.filter(m => m.type === 'image').length},
  totalVideos: ${mediaList.filter(m => m.type === 'video').length},
  totalGifs: ${mediaList.filter(m => m.type === 'gif').length},
  totalNotes: ${noteCards.length}
};
`;

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, code, 'utf8');
  console.log(`Generated ${finalMontage.length} montage items in ${OUT_FILE}`);
}

main();
