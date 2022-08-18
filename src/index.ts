import { createDbWorker, WorkerHttpvfs } from "sql.js-httpvfs";

const archivedBase = "http://web.archive.org/web/20220412011008/https://murobbs.muropaketti.com/";
const workerUrl = new URL(
  "sql.js-httpvfs/dist/sqlite.worker.js",
  import.meta.url
);
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);
const postre = /(\d+)$/;
declare var DB_URL: string;

async function loadWorker(): Promise<WorkerHttpvfs> {
  return createDbWorker(
    [
      {
        from: "inline",
        config: {
          serverMode: "full",
          url: DB_URL,
          requestChunkSize: 1024,
        },
      },
    ],
    workerUrl.toString(),
    wasmUrl.toString()
  );
}

async function thread_from_postid(worker: Promise<WorkerHttpvfs>, postid: number): Promise<String> {
  const _worker = await worker
  const result = await _worker.db.query('select threadurl from muro where postid = ' + postid + ' limit 1') as unknown as Array<{[key: string]: string}>;  
  if (result.length == 0) { 
    return "";
  }
  else {
    return result[0]["threadurl"]
  }
}

function showResult(result: String): void {
  const resultElement = document.getElementById("results");
  const url = archiveUrl(result);
  if (resultElement) {
    resultElement.innerHTML = "<a href=\"" + url + "\">" + url + "</a>"
  }
}

function archiveUrl(threadurl: String): String {
  return archivedBase + threadurl;
}

let worker = loadWorker();
document.addEventListener("DOMContentLoaded", (event: Event) => {
  document.getElementById("searchButton")?.addEventListener("click", (event: Event) => {
    const searchfield = document.getElementById("search") as HTMLTextAreaElement;
    let post = postre.exec(searchfield.value)
    if (post) {
      thread_from_postid(worker, parseInt(post[0])).then((result) => {
        if (result.length > 0) showResult(result);
      });
    }
  });
});

