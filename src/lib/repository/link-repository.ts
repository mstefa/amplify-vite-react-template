import type { CreateLinkInput } from "@/domain/link";
import { Result } from "@/lib/repository/repository-result";

export async function createLink(link: CreateLinkInput): Promise<Result<void>> {
  console.log(link)
  try {
    await fetch('https://i2znug8v47.execute-api.us-east-2.amazonaws.com/dev/linkify', {
      method: 'POST',
      body: JSON.stringify(link),
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
    });
    return Result.success<void>();
  } catch (error) {
    console.error('Error creating link:', error);
    return Result.fail("Failed to create link");
  }

}
