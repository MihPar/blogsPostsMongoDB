import { createApp } from "."
import { runDb } from "./db/db"

const app = createApp()

const PORT = process.env.PORT || 4000;

const starting = async()=>{
	await runDb();
	app.listen(PORT, function() {  
  console.log(`Server was started at port ${PORT}`);
});
}
starting()

