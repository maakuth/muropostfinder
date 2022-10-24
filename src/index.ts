import { createDbWorker, WorkerHttpvfs } from "sql.js-httpvfs";

const archivedBase = "http://web.archive.org/web/20220412011008/https://murobbs.muropaketti.com/";
const workerUrl = new URL(
  "sql.js-httpvfs/dist/sqlite.worker.js",
  import.meta.url
  );
  const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);
  const postre = /(\d+)/;
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
        if (result.length > 0) {
          resultElement.innerHTML = "Thread found:<br><a href=\"" + url + "\">" + url + "</a>";
        }
        else {
          resultElement.innerHTML = "No known thread with that id :("
        }
      }
    }
    
    function archiveUrl(threadurl: String): String {
      return archivedBase + threadurl;
    }
    
    function search(fromButton: boolean): void {      
      const searchfield = document.getElementById("search") as HTMLTextAreaElement;
      if (fromButton) document.location.hash = searchfield.value;
      else searchfield.value = document.location.hash;
      let post = postre.exec(document.location.hash)
      if (post) {
        thread_from_postid(worker, parseInt(post[0])).then((result) => {
          showResult(result);
        });
      }
    }

    let worker = loadWorker();
    document.addEventListener("DOMContentLoaded", (event: Event) => {
      document.getElementById("searchButton")?.addEventListener("click", (event: Event) => {
        search(true); 
      });
    });

    document.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        document.getElementById("searchButton")?.click();
      }
    });

    window.addEventListener("hashchange", function() {
      search(false);
    })