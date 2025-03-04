import ollama from "ollama";

const response = await ollama.chat({
  model: "llama2",
  messages: [{ role: "user", content: "Hello world!" }],
});
console.log(response.message.content);
