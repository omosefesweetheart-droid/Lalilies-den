alert("chat.js loaded");

const supabaseUrl =
"https://nsyhconcqsqueydhhheu.supabase.co";

const supabaseKey =
"sb_publishable_fFIEmCXZdk20izLCpWV7bg_ijCj0sHQ";

const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);

const chatArea =
document.getElementById("chatArea");

const messageInput =
document.getElementById("messageInput");

const sendBtn =
document.getElementById("sendBtn");

async function loadMessages() {

  const { data, error } = await client
    .from("community_messages")
    .select("*")
    .order("created_at", { ascending: true });

  if(error){
    console.log(error);
    return;
  }

  chatArea.innerHTML = "";

  data.forEach(msg => {

    chatArea.innerHTML += `
      <div class="message">
        <div class="name">
          ${msg.display_name}
        </div>
        ${msg.message}
      </div>
    `;
  });

  chatArea.scrollTop =
  chatArea.scrollHeight;
}

sendBtn.onclick = async () => {

  const text = messageInput.value.trim();

  if (!text) {
    alert("Type a message first");
    return;
  }

  const { error } = await client
    .from("community_messages")
    .insert([{
      user_id: "test-user",
      display_name: "Sweetheart 💖",
      country: "Nigeria",
      message: text
    }]);

  if (error) {
    alert("Error: " + error.message);
    return;
  }

  alert("Message sent!");

  messageInput.value = "";

  loadMessages();

};

loadMessages();

setInterval(loadMessages, 3000);
