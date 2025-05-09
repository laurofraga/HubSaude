import { AppDataSource} from "./data-source";
import app from "./app";

AppDataSource.initialize()
    .then(() => {
        console.log("Conectado ao banco de dados");
        app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
        });
    })
    .catch((error) => {
        console.error("Erro ao conectar ao banco de dados:", error);
      });