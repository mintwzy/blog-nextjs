import fs from 'fs'
import {globSync} from "glob";
import path, {ParsedPath, parse} from 'path'
import matter from 'gray-matter'

// current 'posts' directory
const postsDirectory = path.join(process.cwd(), 'posts');
const MDX_FILE_EXTENSION = '.mdx';

function getMdxFilesRecursively(): ParsedPath[] {
  const pattern = `${postsDirectory}/**/*${MDX_FILE_EXTENSION}`

  return globSync(pattern, {posix: true}).map(fileName => parse(fileName))
}

function generateID(parsedPath: ParsedPath): string {
  const splitDir = parsedPath.dir.split('/')
  const length = splitDir.length

  return `${splitDir[length - 1]}~${parsedPath.name}`
}

function getAllPostsPath() {
  const allMdxFiles: ParsedPath[] = getMdxFilesRecursively();

  return allMdxFiles.map((parsedFile: any) => {
    return {
      params: {
        id: generateID(parsedFile)
      }
    }
  })
}

export function getPostsMetaData() {
  const allMdxFiles: ParsedPath[] = getMdxFilesRecursively();

  return allMdxFiles.map((parsedPath: ParsedPath) => {
    const fullPath = path.join(parsedPath.dir, parsedPath.base);
    // get MDX metadata and content
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // get metadata, content
    const {data, content} = matter(fileContents);

    let metadata = data;
    metadata['id'] = generateID(parsedPath)
    return metadata;
  }).sort(metadata => metadata.id);
}

function getPostData(id: string) {
  const fileData = id.split('~')
  const dir = fileData[0]
  const name = fileData[1]
  const fullPath = path.join(postsDirectory, dir, `${name}${MDX_FILE_EXTENSION}`);

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
  getPostData,
}
