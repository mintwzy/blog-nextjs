import fs from 'fs'
import path, {ParsedPath} from 'path'
import matter from 'gray-matter'

// current 'posts' directory
const postsDirectory = path.join(process.cwd(), 'posts');
const mdx_file_extension = '.mdx';

/**
 * Get all files under posts directory
 *
 * TODO: support nexted folder with year-month, 2023-11.
 */
function getAllFilesInDirectory(): ParsedPath[]{
  const fileNames: string[] = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => path.parse(fileName))
}

/**
 * Return only .mdx files
 */
function getMdxFiles(): ParsedPath[]{
  const allFiles: ParsedPath[] = getAllFilesInDirectory();

  return allFiles.filter(parsedFile => parsedFile.ext === mdx_file_extension);
}

function getAllPostsPath() {
  const allMdxFiles: ParsedPath[] = getMdxFiles();

  return allMdxFiles.map((parsedFile: any) => {
    return {
      params: {
        id: parsedFile.name
      }
    }
  })
}

function getPostsMetaData() {
  const allMdxFiles: ParsedPath[] = getMdxFiles();

  return allMdxFiles.map((parsedFile: ParsedPath) => {
    const fullPath = path.join(postsDirectory, parsedFile.base);
    // get MDX metadata and content
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // get metadata, content
    const {data, content} = matter(fileContents);

    let metadata = data;
    metadata['id'] = parsedFile.name;
    return metadata;
  });
}

function getPostData(id: any) {
  const fullPath = path.join(postsDirectory, id + mdx_file_extension);

  // get MDX metadata and content
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  // get metadata, content
  const { data, content } = matter(fileContents);

  let metadata = data;
  metadata['id'] = id;

  return {'metadata': metadata, 'content': content};
}

export {
  getAllPostsPath,
  getPostsMetaData,
  getPostData,
}
