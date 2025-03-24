const app = require("./service");
const { notifier } = require("./notifier");

const port = process.argv.length > 2 ? process.argv[2] : 3000;

const httpService = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

notifier(httpService);
