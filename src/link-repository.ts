import { Result } from "./lib/repository/repository-result";

export async function createLink(link: CreateLinkInput): Promise<Result<void>> {
  console.log(link)
  try {
    await fetch('https://i2znug8v47.execute-api.us-east-2.amazonaws.com/qa/linkify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token',
      },
      body: JSON.stringify(link),
      // mode: 'no-cors',
    }).then((res) => {
      if (!res.ok) {
        console.log(res);
        throw new Error('Network response was not ok');
      }
    });
    return Result.success<void>();
  } catch (error) {
    console.error('Error creating link:', error);
    return Result.fail("Failed to create link");
  }

}

export interface CreateLinkInput {
  id: string,
  destination: string,
  title: string,
}

// curl 'https://i2znug8v47.execute-api.us-east-2.amazonaws.com/dev/linkify' \
// -H 'accept: */*' \
// -H 'accept-language: es-US,es;q=0.9,en;q=0.8,fr;q=0.7,es-419;q=0.6' \
// -H 'content-type: text/plain;charset=UTF-8' \
// -H 'dnt: 1' \
// -H 'origin: http://localhost:5173' \
// -H 'priority: u=1, i' \
// -H 'referer: http://localhost:5173/' \
// -H 'sec-ch-ua: "Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"' \
// -H 'sec-ch-ua-mobile: ?0' \
// -H 'sec-ch-ua-platform: "macOS"' \
// -H 'sec-fetch-dest: empty' \
// -H 'sec-fetch-mode: no-cors' \
// -H 'sec-fetch-site: cross-site' \
// -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' \
// --data - raw '{"id":"abc1234","destination":"https://www.youtube.com","title":"youtube"}'
