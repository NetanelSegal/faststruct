import fs from 'fs/promises';
import path from 'path';
import type { ContentKey, IContentMap, Language } from '@/types/content';

export async function getContent<K extends ContentKey>(
  page: K,
  lang: Language = 'en'
): Promise<IContentMap[K]> {
  const baseDir = path.join(process.cwd(), 'public', 'content');
  const localizedPath = path.join(baseDir, lang, `${page}.json`);
  const fallbackPath = path.join(baseDir, 'en', `${page}.json`);

  try {
    const file = await fs.readFile(localizedPath, 'utf8');
    return JSON.parse(file) as IContentMap[K];
  } catch {
    console.warn(
      `[getContent] Missing/invalid content for page="${page}" lang="${lang}". Falling back to "en".`
    );

    const fallback = await fs.readFile(fallbackPath, 'utf8');
    return JSON.parse(fallback) as IContentMap[K];
  }
}

import { IModule } from '@/types/modules';

export const getModules = async (lang: Language = 'en'): Promise<IModule[]> => {
  return (await getContent('modules', lang)).sort(
    (a, b) => b.specs.areaSqft - a.specs.areaSqft
  );
};
