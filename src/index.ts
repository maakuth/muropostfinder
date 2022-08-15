import { createDbWorker, WorkerHttpvfs } from "sql.js-httpvfs";

const workerUrl = new URL(
  "sql.js-httpvfs/dist/sqlite.worker.js",
  import.meta.url
);
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);


async function loadWorker(): Promise<WorkerHttpvfs> {
  return createDbWorker(
    [
      {
        from: "inline",
        config: {
          serverMode: "full",
          url: "/dist/murolinks.sqlite3",
          //url: "https://archive.org/download/murolinks/murolinks.sqlite3",
          requestChunkSize: 1024,
        },
      },
    ],
    workerUrl.toString(),
    wasmUrl.toString()
  );
}

async function thread_from_postid(worker: Promise<WorkerHttpvfs>, postid: number) {
  const _worker = await worker
  const result = await _worker.db.query('select threadurl from muro where postid = ' + postid + ' limit 1');
  document.body.textContent = JSON.stringify(result);
}

function search(event: Event) {
  thread_from_postid(worker, 1706504535);
}

let worker = loadWorker();
document.getElementById("search")?.addEventListener("click", search);