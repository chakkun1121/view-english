import fsPromises from "fs/promises";
import matter from "gray-matter";
import { helpFileDataType } from "../../../../@types/helpFileDataType";

export async function getHelpFileData(
  filePath: string
): Promise<helpFileDataType> {
  const file = await fsPromises.readFile(filePath, "utf-8");
  const { data } = matter(file) as unknown as {
    data: {
      title: string;
      description: string;
    };
  };
  return { ...data, file };
}
