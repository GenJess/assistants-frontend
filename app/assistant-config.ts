export let assistantId = "asst_ghT6ETDlvv6uVlgml7aLrBbH"; // set your assistant ID here

if (assistantId === "") {
  assistantId = process.env.OPENAI_ASSISTANT_ID;
}
