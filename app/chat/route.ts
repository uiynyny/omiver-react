import { predict } from './api';

export async function POST(req: Request) {
  const { question } = await req.json();
  console.log(question);
  let r = await predict(question);
  return new Response(JSON.stringify(r), {
    headers: { "Content-Type": "text/plain" },
  });
}
